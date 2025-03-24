import React from "react";

const MailCard = ({ data }) => {
    const { id, from, date, subject, short_description } = data;
    return (
        <div
            className="flex m-2 border rounded-xl border-[var(--accent)] p-2"
            id={id}
        >
            <div className="bg-[var(--accent)] flex items-center justify-center px-4 py-2 m-2 h-[40px] border rounded-full">
                {from.name.slice(0, 1).toUpperCase()}
            </div>
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
                <li>{short_description}</li>
                <li>
                    {new Date(date).toDateString()}
                    <span className=" text-[var(--accent)] font-bold">
                        Foverite
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default MailCard;
