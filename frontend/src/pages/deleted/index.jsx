import React from 'react';
import useDeletedLogic from './useDeletedLogic.js';


const Deleted = () => {
    const { recentlyDeleted, handleRestorePhoto, handleDeletePhoto } = useDeletedLogic();
    return (
        <div>
            {recentlyDeleted.map((photo, index) => (
                <div key={index} className="photo-item">
                    <img src={photo} alt={`Deleted ${index}`} className="photo" />
                    <button onClick={() => handleRestorePhoto(photo)}>Restore</button>
                    <button onClick={() => handleDeletePhoto(photo)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default Deleted;