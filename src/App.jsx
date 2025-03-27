import { useEffect, useState } from "react";
import "./App.css";
import MailBody from "./components/MailBody";
import { EMAIL_BY_ID_URL, EMAIL_URL } from "../util/constVariables";
import { filterMails, updateMailState } from "../util/mailUtils.js";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { fetchData } from "../util/fetchMailData.js";
import Loader from "./components/Loader.jsx";

function App() {
    const [mails, setMails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mailBodyLoading, setMailBodyLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [mailBodyData, setMailBodyData] = useState(null);

    let filterData = filterMails(mails, filter, mailBodyData);

    useEffect(() => {
        fetchData(EMAIL_URL)
            .then((data) => {
                const dataAdded = data.list.map((mail) => ({
                    ...mail,
                    favorite: false,
                    read: false,
                }));
                setMails(dataAdded);
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const changeTofavorite = (id) => {
        setMails((prevMails) => updateMailState(prevMails, id, "favorite"));
        setMailBodyData({ ...mailBodyData, favorite: !mailBodyData.favorite });
    };

    const openMailBody = (data) => {
        setMails((prevMails) => updateMailState(prevMails, data.id, "read"));
        if (mailBodyData?.id !== data.id) {
            setMailBodyLoading(true);
            fetchData(EMAIL_BY_ID_URL + data.id)
                .then((res) => {
                    setMailBodyData({ ...data, ...res });
                })
                .catch(console.log)
                .finally(() => setMailBodyLoading(false));
        }
    };

    const closeMailBody = () => {
        setMailBodyData(null);
    };

    return (
        <main className="h-screen ">
            <Header
                closeMailBody={closeMailBody}
                setFilter={setFilter}
                activeFilter={filter}
            />
            <section
                id="main"
                className={`w-full ${
                    mailBodyData
                        ? "grid lg:grid-cols-[30%_70%] md:grid-cols-[40%_60%]"
                        : ""
                }`}
            >
                <Sidebar
                    filterData={filterData}
                    loading={loading}
                    mailBodyData={mailBodyData}
                    openMailBody={openMailBody}
                />

                {mailBodyData &&
                    (mailBodyLoading ? (
                        <Loader type={"mailBody"} />
                    ) : (
                        <MailBody
                            data={mailBodyData}
                            handleFavorite={changeTofavorite}
                            close={closeMailBody}
                        />
                    ))}
            </section>
        </main>
    );
}

export default App;
