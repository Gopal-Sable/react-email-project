import React from "react";
import ProfileName from "./ProfileName";

const MailCard = ({ data, handleClick, active }) => {
    const { id, from, date, subject, short_description, read, favorite } = data;
    return (
        <div
            className={`cursor-pointer flex m-2 border ${
                read ? "bg-[var(--read-bg)]" : "bg-white"
            } rounded-xl ${
                active ? "border-[var(--accent)]" : "border-[var(--border)]"
            } p-4`}
            id={id}
            onClick={() => handleClick(data)}
        >
            <ProfileName name={from.name} />
            <ul>
                <li>
                    <label htmlFor="">From: </label>
                    <strong>
                        {from.name} &lt;{from.email}&gt;
                    </strong>
                </li>
                <li>
                    <label htmlFor="">Subject: </label>
                    <strong>{subject}</strong>
                </li>
                <li>{short_description.slice(0, 45) + "..."}</li>
                <li className="flex justify-between">
                    <span>
                        {new Date(date).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </span>
                    <span className="text-[var(--accent)] font-bold">
                        {favorite && "Favorite"}
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default MailCard;
