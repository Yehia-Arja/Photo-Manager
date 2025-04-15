import { useRef, useState, useEffect } from "react";

const useEditLogic = (initialSrc ,onSave ) => {
	const [previewUrl, setPreviewUrl] = useState(initialSrc);
	const imageRef = useRef(null);

    const handleSave = async () => {
		onSave(previewUrl);
	};

	useEffect(() => {
		setPreviewUrl(initialSrc);
	}, [initialSrc]);

	return {
		previewUrl,
		setPreviewUrl,
        imageRef,
        handleSave
	};
};

export default useEditLogic; 