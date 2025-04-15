import useImageEditLogic from "./useImageEditLogic";
import useCropLogic from "./useCropLogic";
import useColorLogic from "./useColorLogic";
import ReactCrop from "react-image-crop";
import "./style.css";

const ImageEditor = ({ initialSrc, onSave, onCancel }) => {
	const {
		setPreviewUrl,
		previewUrl,
        imageRef,
        handleSave
	} = useImageEditLogic(initialSrc, onSave);

	const {
		crop,
		setCrop,
		setCompletedCrop,
		isCropping,
		setIsCropping,
		handleConfirmCrop
	} = useCropLogic(imageRef, setPreviewUrl);

	const {handleBW} = useColorLogic(previewUrl, setPreviewUrl);
	
	return (
		<div className="modal">
			<div className="editor-content">
				<h2>Edit Photo</h2>
				{isCropping ? (
					<div className="crop-container">
						<ReactCrop
							src={initialSrc}
							crop={crop}
							onChange={setCrop}
							onComplete={setCompletedCrop}
							style={{ maxWidth: "600px", margin: "0 auto" }}
						>
							<img ref={imageRef} src={initialSrc} alt="" className="crop-image" />
						</ReactCrop>
						<div className="crop-buttons">
							<button onClick={handleConfirmCrop}>Confirm Crop</button>
							<button onClick={() => setIsCropping(false)}>Cancel Crop</button>
						</div>
					</div>
				) : (
					<>
						{previewUrl && <img src={previewUrl} alt="" className="editor-image" />}
						<div className="editor-buttons">
							<button onClick={() => setIsCropping(true)}>Crop</button>
							<button onClick={handleBW}>Black & White</button>
							<button onClick={handleSave}>Final Save</button>
							<button onClick={onCancel}>Cancel</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ImageEditor;
