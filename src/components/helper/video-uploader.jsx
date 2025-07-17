import { useState } from "react";
import FileUploader from "./file-uploader";

export default function VideoUploader({
	initialVideos = [],
	onChange,
	maxFiles = 5,
	accept = "video/*",
	label = "Upload Videos",
}) {
	const [uploadedVideos, setUploadedVideos] = useState(initialVideos);

	const handleFileUpload = (fileUrl) => {
		const newVideos = [...uploadedVideos, fileUrl];
		setUploadedVideos(newVideos);
		onChange(newVideos);
	};

	const handleFileDelete = (fileUrlToDelete) => {
		const newVideos = uploadedVideos.filter((url) => url !== fileUrlToDelete);
		setUploadedVideos(newVideos);
		onChange(newVideos);
	};

	return (
		<FileUploader
			onFileUpload={handleFileUpload}
			onFileDelete={handleFileDelete}
			uploadedFiles={uploadedVideos}
			multiple
			maxFiles={maxFiles}
			accept={accept}
			label={label}
		/>
	);
}
