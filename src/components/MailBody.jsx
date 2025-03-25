import React, { useEffect, useState } from "react";
import { EMAIL_BY_ID_URL } from "../../util/constVariables";
import ProfileName from "./ProfileName";
import Loader from "./Loading";

const MailBody = ({ data, handleFavorite, close }) => {
    const { id, from, date, subject, favorite } = data;
    const [mail, setMail] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(EMAIL_BY_ID_URL + id);
                const data = await res.json();
                setMail({ ...data, favorite });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    return loading ? (
        <Loader type="mailBody" />
    ) : (
        <section className="flex mx-6 mt-2 p-4 overflow-auto bg-white rounded-xl border border-[var(--border)] h-[calc(100vh-150px)] ">
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
                            setMail({ ...mail, favorite: !mail.favorite });
                            handleFavorite(mail.id);
                        }}
                        className="cursor-pointer bg-[var(--accent)] h-fit m-4 px-2 py-1 rounded-full font-medium text-white"
                    >
                        {mail.favorite
                            ? "Remove from favorite"
                            : "Mark as favorite"}
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
                        __html: mail?.body?.replace(/<\/p>/g, "</p><br />"),
                    }}
                />
            </div>
        </section>
    );
};

export default MailBody;
