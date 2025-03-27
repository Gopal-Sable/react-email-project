import { useState } from "react";
import ProfileName from "./ProfileName";

const MailBody = ({ data, handleFavorite, close }) => {
    const { id, from, date, subject, body, favorite } = data;

    return (
        <section
            id="mail-body"
            className="mx-6 mt-2 p-4 overflow-auto bg-white rounded-xl border border-[var(--border)] flex lg:h-[calc(100vh-150px)] lg:static md:h-[calc(100vh-150px)] md:static sm:h-fit sm:absolute"
        >
            <ProfileName name={from?.name} />
            <div className="mr-8">
                <header className="flex justify-between">
                    <div>
                        <h1 className="font-bold text-3xl my-2">{subject}</h1>
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
                    </div>
                    <button
                        onClick={() => {
                            handleFavorite(id);
                        }}
                        className="cursor-pointer bg-[var(--accent)] h-fit m-4 px-2 py-1 rounded-full font-medium text-white"
                    >
                        {favorite ? "Remove from favorite" : "Mark as favorite"}
                    </button>
                    <button
                        className="lg:hidden md:hidden xl:hidden sm:block h-fit"
                        onClick={close}
                    >
                        X
                    </button>
                </header>
                <article
                    className="text-justify my-2"
                    dangerouslySetInnerHTML={{
                        __html: body?.replace(/<\/p>/g, "</p><br />"),
                    }}
                />
            </div>
        </section>
    );
};

export default MailBody;
