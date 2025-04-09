import React from 'react';
import useRecentlyDeletedLogic from './useRecentlyDeletedLogic';
import { Link } from 'react-router-dom';    

const RecentlyDeleted = () => {
    const { recentlyDeleted, handleRestorePhoto, handleDeletePhoto } = useRecentlyDeletedLogic();
    return (
        <div>
            {recentlyDeleted.map((photoPath, index) => (
                <div key={index} className="photo-item">
                    <img src={photoPath} alt={`Deleted ${index}`} className="photo" />
                    <button onClick={() => handleRestorePhoto(photoPath)}>Restore</button>
                    <button onClick={() => handleDeletePhoto(photoPath)}>Delete</button>
                </div>
            ))}
            <Link to="/">Back to Home</Link>
        </div>     
    )
}

export default RecentlyDeleted;