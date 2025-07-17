import { useState, useRef, useCallback } from "react";
import {
	X,
	Upload,
	Loader2,
	FileIcon,
	ImageIcon,
	VideoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function FileUploader({
	onFileUpload,
	onFileDelete,
	uploadedFiles = [],
	accept = "image/*,video/*",
	multiple = false,
	maxFiles = 10,
	className,
	label = "Upload Files",
}) {
	const [isDragging, setIsDragging] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState({});
	const fileInputRef = useRef(null);

	const handleDragOver = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	}, []);

	const uploadFile = useCallback(
		async (file) => {
			if (uploadedFiles.length >= maxFiles && multiple) {
				alert(`You can only upload up to ${maxFiles} files`);
				return;
			}

			const fileId = `${Date.now()}-${file.name}`;
			setUploadProgress((prev) => ({ ...prev, [fileId]: 0 }));
			setUploading(true);

			try {
				const formData = new FormData();
				formData.append("image", file);
				const xhr = new XMLHttpRequest();
				xhr.open(
					"POST",
					"https://ultratec-admin-backend.onrender.com/api/v1/helper/image/upload",
				);

				xhr.upload.addEventListener("progress", (event) => {
					if (event.lengthComputable) {
						const progress = Math.round((event.loaded * 100) / event.total);
						setUploadProgress((prev) => ({ ...prev, [fileId]: progress }));
					}
				});

				xhr.onload = () => {
					if (xhr.status === 200) {
						const response = JSON.parse(xhr.responseText);
						if (!response.error) {
							onFileUpload(response.payload.full_url);
						} else {
							console.error("Upload error:", response.message);
							alert(`Upload failed: ${response.message}`);
						}
					} else {
						console.error("Upload failed with status:", xhr.status);
						alert("Upload failed. Please try again.");
					}
					setUploadProgress((prev) => {
						const newProg = { ...prev };
						delete newProg[fileId];
						return newProg;
					});
					if (Object.keys(uploadProgress).length === 0) setUploading(false);
				};

				xhr.onerror = () => {
					console.error("Upload error");
					alert("Upload failed. Please check your connection and try again.");
					setUploadProgress((prev) => {
						const newProg = { ...prev };
						delete newProg[fileId];
						return newProg;
					});
					if (Object.keys(uploadProgress).length === 0) setUploading(false);
				};

				xhr.send(formData);
			} catch (err) {
				console.error("Upload error:", err);
				alert("Upload failed. Please try again.");
				setUploading(false);
			}
		},
		[maxFiles, multiple, onFileUpload, uploadedFiles.length, uploadProgress],
	);

	const handleDrop = useCallback(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(false);
			const files = Array.from(e.dataTransfer.files || []);
			if (!multiple && files.length > 1)
				return alert("You can only upload one file at a time");
			if (multiple && files.length + uploadedFiles.length > maxFiles)
				return alert(`You can only upload up to ${maxFiles} files in total`);
			files.forEach(uploadFile);
		},
		[maxFiles, multiple, uploadedFiles.length, uploadFile],
	);

	const handleFileChange = useCallback(
		(e) => {
			const files = Array.from(e.target.files || []);
			if (!multiple && files.length > 1)
				return alert("You can only upload one file at a time");
			if (multiple && files.length + uploadedFiles.length > maxFiles)
				return alert(`You can only upload up to ${maxFiles} files in total`);
			files.forEach(uploadFile);
		},
		[maxFiles, multiple, uploadedFiles.length, uploadFile],
	);

	const handleButtonClick = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const getFileIcon = (url) => {
		if (url.match(/\.(jpeg|jpg|gif|png|webp)$/i))
			return <ImageIcon className="h-5 w-5" />;
		if (url.match(/\.(mp4|webm|ogg|mov)$/i))
			return <VideoIcon className="h-5 w-5" />;
		return <FileIcon className="h-5 w-5" />;
	};

	const getFileName = (url) => url.split("/").pop();

	return (
		<div className={cn("space-y-4", className)}>
			<div
				className={cn(
					"border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer text-center",
					isDragging
						? "border-primary bg-primary/5"
						: "border-muted-foreground/25",
				)}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleButtonClick}
			>
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					accept={accept}
					multiple={multiple}
					className="hidden"
				/>
				<div className="flex flex-col items-center gap-2">
					<Upload className="h-10 w-10 text-muted-foreground" />
					<p className="text-sm font-medium">{label}</p>
					<p className="text-xs text-muted-foreground">
						Drag and drop files here or click to browse
					</p>
					{multiple && (
						<p className="text-xs text-muted-foreground">
							Up to {maxFiles} files
						</p>
					)}
				</div>
			</div>

			{Object.keys(uploadProgress).length > 0 && (
				<div className="space-y-2">
					{Object.entries(uploadProgress).map(([fileId, progress]) => (
						<div key={fileId} className="space-y-1">
							<div className="flex items-center justify-between text-xs">
								<span className="truncate">
									{fileId.split("-").slice(1).join("-")}
								</span>
								<span>{progress}%</span>
							</div>
							<Progress value={progress} className="h-2" />
						</div>
					))}
				</div>
			)}

			{uploadedFiles.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
					{uploadedFiles.map((fileUrl) => (
						<div
							key={fileUrl}
							className="relative group border rounded-lg overflow-hidden"
						>
							{fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
								<img
									src={fileUrl}
									alt="Uploaded file"
									className="w-full h-40 object-cover"
								/>
							) : fileUrl.match(/\.(mp4|webm|ogg|mov)$/i) ? (
								<video
									src={fileUrl}
									controls
									className="w-full h-40 object-cover"
								/>
							) : (
								<div className="w-full h-40 flex items-center justify-center bg-muted">
									<FileIcon className="h-16 w-16 text-muted-foreground" />
								</div>
							)}
							<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
								<Button
									variant="destructive"
									size="icon"
									onClick={(e) => {
										e.stopPropagation();
										onFileDelete(fileUrl);
									}}
								>
									<X className="h-4 w-4" />
								</Button>
							</div>
							<div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs truncate">
								<div className="flex items-center gap-1">
									{getFileIcon(fileUrl)}
									<span className="truncate">{getFileName(fileUrl)}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			{uploading && Object.keys(uploadProgress).length === 0 && (
				<div className="flex justify-center">
					<Loader2 className="h-6 w-6 animate-spin text-primary" />
				</div>
			)}
		</div>
	);
}
