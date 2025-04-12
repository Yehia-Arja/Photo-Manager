import React from "react";
import useRecentlyDeletedLogic from "./useRecentlyDeletedLogic";
import { Link } from "react-router-dom";    
import PhotoCard from "../../components/PhotoCard";
import PhotoContainer from "../../components/PhotoContainer";

const RecentlyDeleted = () => {
    const { recentlyDeleted, handleRestorePhoto, handleDeletePhoto } = useRecentlyDeletedLogic();
    return (
        <div>
            <PhotoContainer>
                {recentlyDeleted.map((photoPath, index) => (
                    <PhotoCard
                        key={index}
                        photoPath={photoPath}
                        actions={[
                            {
                                label: "Delete",
                                onClick: () => handleDeletePhoto(photoPath),
                            },
                            {
                                label: "Restore",
                                onClick: () => handleRestorePhoto(photoPath),
                            }
                        ]}
                    />
                ))}
            </ PhotoContainer>
            <Link to="/">Back to Home</Link>
        </div>     
    )
}

export default RecentlyDeleted;