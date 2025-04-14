import { useState } from "react";
import PhotoService from "../../services/photoService";


const useEditLogic = () => {
    const [editingPath, setEditingPath] = useState(null);

    const handleEdit = (p) => setEditingPath(p);

    const handleSaveEdit = async (dataUrl) => {
        try {
            await PhotoService.saveEditedImage(editingPath, dataUrl);
            setEditingPath(null);
        } catch (err) {
            alert("Save failed: " + err.message);
        }
    };
    return {
        editingPath,
        setEditingPath,
        handleEdit,
        handleSaveEdit,
    };
}

export default useEditLogic;