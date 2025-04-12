import "./style.css";
import Button from "../Button";

const PhotoCard = ({ photoPath, actions = [] }) => {
  return (
    <div className="photo-card">
        <img src={photoPath} alt="Photo" className="photo" />
          
      <div className="overlay">
        {actions.map((action, index) => (
            <Button key={index} text={action.label} onClick={action.onClick} />   
        ))}
              
      </div>
    </div>
  );
};

export default PhotoCard;
