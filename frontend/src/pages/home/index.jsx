import useHomeLogic from "./useHomeLogic"
const Home = () => {
    const { photos, handleAddPhoto, handleDeletePhoto } = useHomeLogic()

    return (
        <div>
           {photos.map((photo, index) => (
                <div key={index} className="photo-item">
                    <img src={photo} alt={`Photo ${index}`} className="photo" />
                    <button onClick={() => handleDeletePhoto(photo)}>Delete</button>
                </div>
           ))}
        
            <button onClick={handleAddPhoto}>Add Photo</button>
            
        </div>
    )
}
export default Home