import { useEffect, useState } from "react";
import "./App.css";
import MailBody from "./components/MailBody";
import { EMAIL_URL } from "../util/constVariables";
import { updateMailState } from "../util/mailUtils.js";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
    const [mailBodyData, setMailBodyData] = useState(null);
    const [mails, setMails] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(EMAIL_URL);
                const data = await res.json();
                const dataAdded = data.list.map((mail) => ({
                    ...mail,
                    favorite: false,
                    read: false,
                }));
                setMails(dataAdded);
                setFilterData(dataAdded);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const changeTofavorite = (id) => {
        setMails((prevMails) => updateMailState(prevMails, id, "favorite"));
        setFilterData((prevFilterData) =>
            updateMailState(prevFilterData, id, "favorite")
        );
    };

    const openMailBody = (data) => {
        setMails((prevMails) => updateMailState(prevMails, data.id, "read"));
        setFilterData((prevFilterData) =>
            updateMailState(prevFilterData, data.id, "read")
        );
        setMailBodyData(data);
    };

    const closeMailBody = () => {
        setMailBodyData(null);
    };

    return (
        <main className="h-screen ">
            <Header
                setFilterData={setFilterData}
                closeMailBody={closeMailBody}
                mails={mails}
            />
            <section
                id="main"
                className={` ${
                    mailBodyData
                        ? "grid lg:grid-cols-[30%_70%] md:grid-cols-[40%_60%] sm:grid-cols-1"
                        : ""
                }`}
            >
                <Sidebar
                    filterData={filterData}
                    loading={loading}
                    mailBodyData={mailBodyData}
                    openMailBody={openMailBody}
                />

                {mailBodyData && (
                    <MailBody
                        data={mailBodyData}
                        handleFavorite={changeTofavorite}
                        close={closeMailBody}
                    />
                )}
            </section>
        </main>
    );
}

export default App;
