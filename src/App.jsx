import { useEffect, useState } from "react";
import "./App.css";
import FilterButton from "./components/FilterButton";
import MailCard from "./components/MailCard";
import { EMAIL_BY_ID_URL, EMAIL_URL } from "../util/constVariables";
import MailBody from "./components/MailBody";

function App() {
    const [mails, setMails] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(EMAIL_URL);
                const data = await res.json();
                setMails(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div id="filter-contianer" className="flex items-center">
                <p>Filter By:</p>
                <div className="flex gap-2px items-center justify-center ">
                    <FilterButton name="Unread" />
                    <FilterButton name="Read" />
                    <FilterButton name="Favorites" />
                </div>
            </div>
            <div id="main" className="grid grid-cols-[30%,70%] m-2 h-screen">
                <div id="email-list" className="flex flex-col bg-[var(--bg)]">
                    {mails?.list?.map((mail) => (
                        <MailCard key={mail.id} data={mail} />
                    ))}
                </div>
                <MailBody data={1} />
            </div>
        </>
    );
}

export default App;
