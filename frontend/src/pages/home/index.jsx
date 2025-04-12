import PhotoContainer from "../../components/PhotoContainer";
import PhotoCard from "../../components/PhotoCard";
import useHomeLogic from "./useHomeLogic";
import { Link } from "react-router-dom";

const Home = () => {
  const { photos, handleAddPhoto, handleSoftDelete } = useHomeLogic();

  return (
      <div>
          <PhotoContainer>
                {photos.map((photoPath) => (
                    <PhotoCard
                        key={photoPath}
                        photoPath={photoPath}
                        actions={[
                            {
                                label: "Delete",
                                onClick: () => handleSoftDelete(photoPath),
                            },
                            {
                                label: "Restore",
                                onClick: () => handleSoftDelete(photoPath),
                            }
                        ]}
                    />
                ))}
           </ PhotoContainer>

      <button onClick={handleAddPhoto}>Add Photo</button>
      <Link to="/deleted">Recently Deleted</Link>
    </div>
  );
};

export default Home;
