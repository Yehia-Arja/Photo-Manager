import PhotoContainer from "../../components/PhotoContainer";
import PhotoCard from "../../components/PhotoCard";
import useHomeLogic from "./useHomeLogic";
import Button from "../../components/Button";
import ImageEditor from "../../components/ImageEditor";
import useEditLogic from "./useEditLogic";
import "./style.css";


const Home = () => {
    const { photos, handleAddPhoto, handleSoftDelete } = useHomeLogic();
    const { editingPath, setEditingPath, handleEdit, handleSaveEdit } = useEditLogic();

    return (
        <div className="page-wrapper">
            <h1 className="header">Local. Secure. Yours</h1>
            <div className="main-content">
                <div className="button-wrapper">
                    <Button text="➕ Add Photo" onClick={handleAddPhoto} className="add-btn" />
                </div>
                <PhotoContainer>
                    {photos.map((p) => (
                        <PhotoCard
                            key={p}
                            photoPath={p}
                            actions={[
                                { label: "Delete", onClick: () => handleSoftDelete(p) },
                                { label: "Edit", onClick: () => handleEdit(p) }
                            ]}
                        />
                    ))}
                </PhotoContainer>
            </div>
            {editingPath && (
                <ImageEditor
                    initialSrc={editingPath}
                    onSave={handleSaveEdit}
                    onCancel={() => setEditingPath(null)}
                />
            )}
        </div>
    );
};

export default Home;
