import React, { useEffect, useState } from "react";
import { EMAIL_BY_ID_URL } from "../../util/constVariables";
import ProfileName from "./ProfileName";

const MailBody = ({ data, handleFavorite }) => {
    const { id, from, date, subject, favorite } = data;
    const [mail, setMail] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(EMAIL_BY_ID_URL + id);
                const data = await res.json();
                setMail(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [data]);
    return (
        <div
            id="message-body"
            className="flex m-4 p-4 bg-white rounded-xl border border-[var(--border)] h-fit"
        >
            <div className="m-2">
                <ProfileName name={from?.name} />
            </div>
            <div className="mr-8">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <h1 className="font-bold text-3xl my-2">{subject}</h1>
                        <span className="my-2">
                            {new Date(date).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </span>
                    </div>
                    <button
                        disabled={favorite}
                        onClick={() => {
                            handleFavorite(mail.id);
                        }}
                        className="cursor-pointer bg-[var(--accent)] h-fit m-4 px-2 py-1 rounded-full font-medium text-white"
                    >
                        {favorite ? "Favorite" : "Mark as favorite"}
                    </button>
                </div>
                <div
                    className="text-justify my-2"
                    dangerouslySetInnerHTML={{
                        __html: mail?.body?.replace(/<\/p>/g, "</p><br />"),
                    }}
                />
            </div>
        </div>
    );
};

export default MailBody;
