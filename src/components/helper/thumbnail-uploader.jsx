import { useState } from "react";
import FileUploader from "./file-uploader";

export default function ThumbnailUploader({
	initialThumbnail,
	onChange,
	accept = "image/*",
	label = "Upload Thumbnail",
}) {
	const [uploadedThumbnail, setUploadedThumbnail] = useState(
		initialThumbnail || null,
	);

	const handleFileUpload = (fileUrl) => {
		setUploadedThumbnail(fileUrl);
		onChange(fileUrl);
	};

	const handleFileDelete = () => {
		setUploadedThumbnail(null);
		onChange(null);
	};

	return (
		<FileUploader
			onFileUpload={handleFileUpload}
			onFileDelete={handleFileDelete}
			uploadedFiles={uploadedThumbnail ? [uploadedThumbnail] : []}
			multiple={false}
			maxFiles={1}
			accept={accept}
			label={label}
		/>
	);
}
