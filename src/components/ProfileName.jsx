import React from "react";

const ProfileName = ({name}) => {
    return (
        <span className="bg-[var(--accent)] font-bold flex items-center justify-center px-4 py-2 m-2 h-[40px] text-white rounded-full">
            {name.slice(0, 1).toUpperCase()}
        </span>
    );
};

export default ProfileName;
