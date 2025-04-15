import { useState } from "react";

const useCropLogic = (imageRef, setPreviewUrl) => {
	const [crop, setCrop] = useState({ unit: "%", x: 10, y: 10, width: 80, height: 80 });
	const [completedCrop, setCompletedCrop] = useState(null);
	const [isCropping, setIsCropping] = useState(false);

	const handleConfirmCrop = () => {
		if (!imageRef.current || !completedCrop?.width) return;
		
		const { naturalWidth, naturalHeight, width, height } = imageRef.current;
		const scaleX = naturalWidth / width;
		const scaleY = naturalHeight / height;

		const canvas = document.createElement("canvas");
		canvas.width = completedCrop.width * scaleX;
		canvas.height = completedCrop.height * scaleY;

		const ctx = canvas.getContext("2d");
		ctx.drawImage(
			imageRef.current,
			completedCrop.x * scaleX,
			completedCrop.y * scaleY,
			completedCrop.width * scaleX,
			completedCrop.height * scaleY,
			0,
			0,
			canvas.width,
			canvas.height
		);

		setPreviewUrl(canvas.toDataURL("image/jpeg"));
		setIsCropping(false);
	};

	return {
		crop,
		setCrop,
		completedCrop,
		setCompletedCrop,
		isCropping,
		setIsCropping,
		handleConfirmCrop
	};
};

export default useCropLogic;
