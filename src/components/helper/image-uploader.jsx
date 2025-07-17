// components/ImageUploader.js
"use client";

import { useState } from "react";
import FileUploader from "./file-uploader";

export default function ImageUploader({
	initialImages = [],
	onChange,
	maxFiles = 10,
	accept = "image/*",
	label = "Upload Images",
}) {
	const [uploadedImages, setUploadedImages] = useState(initialImages);

	const handleFileUpload = (fileUrl) => {
		const newImages = [...uploadedImages, fileUrl];
		setUploadedImages(newImages);
		onChange(newImages);
	};

	const handleFileDelete = (fileUrlToDelete) => {
		const newImages = uploadedImages.filter((url) => url !== fileUrlToDelete);
		setUploadedImages(newImages);
		onChange(newImages);
	};

	return (
		<FileUploader
			onFileUpload={handleFileUpload}
			onFileDelete={handleFileDelete}
			uploadedFiles={uploadedImages}
			multiple={true}
			maxFiles={maxFiles}
			accept={accept}
			label={label}
		/>
	);
}
