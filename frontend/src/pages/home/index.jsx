import useHomeLogic from "./useHomeLogic"
import { Link } from "react-router-dom"

const Home = () => {
    const { photos, handleAddPhoto, handleSoftDelete } = useHomeLogic()

    return (
        <div>
            {console.log("Photos:", photos)}
           {photos.map((photoPath, index) => (
                <div key={index} className="photo-item">
                    <img src={photoPath} alt={`Photo ${index}`} className="photo" />
                    <button onClick={() => handleSoftDelete(photoPath)}>Delete</button>
                </div>
           ))}
        
            <button onClick={handleAddPhoto}>Add Photo</button>
            <Link to="/deleted">Recently Deleted</Link>
        </div>
    )
}
export default Home