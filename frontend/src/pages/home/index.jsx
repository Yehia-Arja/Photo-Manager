import PhotoContainer from "../../components/PhotoContainer";
import PhotoCard from "../../components/PhotoCard";
import useHomeLogic from "./useHomeLogic";
import Button from "../../components/Button";
import "./style.css";

const Home = () => {
    const { photos, handleAddPhoto, handleSoftDelete } = useHomeLogic();

    return (
        <div className="page-wrapper">
            <h1 className="header">Local. Secure. Yours</h1>
            <div className="main-content">
                <div className="button-wrapper">
                    <Button text="➕ Add Photo" onClick={handleAddPhoto} className="add-btn" />
                </div>
                <PhotoContainer>
                    {photos.map((photoPath) => (
                        <PhotoCard
                            key={photoPath}
                            photoPath={photoPath}
                            actions={[
                                { label: "Delete", onClick: () => handleSoftDelete(photoPath) },
                                { label: "Edit", onClick: () => handleSoftDelete(photoPath) },
                            ]}
                        />
                    ))}
                </PhotoContainer>
            </div>
        </div>
    );
};

export default Home;
