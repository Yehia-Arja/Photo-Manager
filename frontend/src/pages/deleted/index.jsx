import React from 'react';
import useDeletedLogic from './useDeletedLogic.js';


const Deleted = () => {
    const { recentlyDeleted, handleRestorePhoto, handleDeletePhoto } = useDeletedLogic();
    return (
        <div>
            {recentlyDeleted.map((photoPath, index) => (
                <div key={index} className="photo-item">
                    <img src={photoPath} alt={`Deleted ${index}`} className="photo" />
                    <button onClick={() => handleRestorePhoto(photoPath)}>Restore</button>
                    <button onClick={() => handleDeletePhoto(photoPath)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default Deleted;