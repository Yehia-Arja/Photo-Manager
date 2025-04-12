import "./style.css";

const PhotoContainer = ({ children }) => {
    return (
        <div className="photo-container">
            {children}
        </div>
    )
   
}

export default PhotoContainer;