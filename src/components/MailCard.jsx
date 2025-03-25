import React from "react";
import ProfileName from "./ProfileName";

const MailCard = ({ data, handleClick, active }) => {
    const { id, from, date, subject, short_description, read, favorite } = data;
    return (
        <aside
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
                    <label>From: </label>
                    <strong>
                        {from.name} &lt;{from.email}&gt;
                    </strong>
                </li>
                <li>
                    <label>Subject: </label>
                    <strong>{subject}</strong>
                </li>
                <li className="line-clamp-1">{short_description}</li>
                <li className="flex">
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
                    <span className="text-[var(--accent)] font-bold ml-5">
                        {favorite && "Favorite"}
                    </span>
                </li>
            </ul>
        </aside>
    );
};

export default MailCard;
