import React, { useEffect, useState } from "react";

const MailBody = ({ data }) => {
    const [mail, setMail] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(EMAIL_BY_ID_URL + "1");
                const data = await res.json();
                setMail(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div id="message-body" className="min-h-[300px]">
            <p>{mail?.id}</p>
            <p>{mail?.body}</p>
        </div>
    );
};

export default MailBody;
