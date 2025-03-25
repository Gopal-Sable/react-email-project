import { useEffect, useState } from "react";
import "./App.css";
import FilterButton from "./components/FilterButton";
import MailCard from "./components/MailCard";
import { EMAIL_URL } from "../util/constVariables";
import MailBody from "./components/MailBody";

function App() {
    const [mailBodyData, setMailBodyData] = useState(null);
    const [mails, setMails] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [filterBtn, setFilterBtn] = useState("all");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(EMAIL_URL);
                const data = await res.json();
                const dataAdded = data.list.map((mail, i) => {
                    return { ...mail, favorite: false, read: false };
                });

                setMails({ list: [...dataAdded] });
                setFilterData({ list: [...dataAdded] });
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const changeTofavorite = (id) => {
        let newMails = mails.list.map((mail) => {
            if (mail.id == id) {
                return { ...mail, favorite: true };
            } else {
                return { ...mail };
            }
        });
        let newfilterData = filterData.list.map((mail) => {
            if (mail.id === id) {
                return { ...mail, favorite: !mail.favorite };
            }
            return { ...mail };
        });
        setFilterData({ list: [...newfilterData] });
        setMails({ list: [...newMails] });
    };
    function openMailBody(data) {
        let newMails = mails.list.map((mail) => {
            if (data.id === mail.id) {
                return { ...mail, read: true };
            }
            return { ...mail };
        });
        let newfilterData = filterData.list.map((mail) => {
            if (data.id === mail.id) {
                return { ...mail, read: true };
            }
            return { ...mail };
        });
        setMails({ list: [...newMails] });
        setFilterData({ list: [...newfilterData] });
        setMailBodyData(data);
    }
    const handleFilterClick = (filterType) => {
        if (filterType === "Read") {
            let newMails = mails.list.filter((mail) => mail.read);
            setFilterData({ list: [...newMails] });
            setFilterBtn("read");
        } else if (filterType === "Favorites") {
            let newMails = mails.list.filter((mail) => mail.favorite);
            setFilterData({ list: [...newMails] });
            setFilterBtn("favorite");
        } else if (filterType === "Unread") {
            let newMails = mails.list.filter((mail) => !mail.read);
            setFilterData({ list: [...newMails] });
            setFilterBtn("unread");
        } else {
            let newMails = { ...mails };
            setFilterData(newMails);
            setFilterBtn("all");
        }
    };

    const close = () => {
        setMailBodyData(null);
    };
    return (
        <>
            <div id="filter-container" className="flex items-center mx-6 my-2">
                <p>Filter By:</p>
                <div className="flex gap-2px items-center justify-center">
                    <FilterButton
                        name="All"
                        handleClick={handleFilterClick}
                        active={filterBtn === "all"}
                    />
                    <FilterButton
                        name="Unread"
                        handleClick={handleFilterClick}
                        active={filterBtn === "unread"}
                    />
                    <FilterButton
                        name="Read"
                        handleClick={handleFilterClick}
                        active={filterBtn === "read"}
                    />
                    <FilterButton
                        name="Favorites"
                        handleClick={handleFilterClick}
                        active={filterBtn === "favorite"}
                    />
                </div>
            </div>

            <div
                id="main"
                className={`m-2 h-screen ${
                    mailBodyData
                        ? "grid lg:grid-cols-[30%_70%] md:grid-cols-[40%_60%] sm:grid-cols-1"
                        : ""
                }`}
            >
                {/* Email List (Scrollable) */}
                <div
                    id="email-list"
                    className="flex m-2 flex-col bg-[var(--bg)] h-full overflow-auto"
                >
                    {filterData?.list?.length > 0 ? (
                        filterData?.list?.map((mail) => (
                            <MailCard
                                key={mail.id}
                                data={mail}
                                active={mailBodyData?.id === mail.id}
                                handleClick={openMailBody}
                            />
                        ))
                    ) : (
                        <>No mail found</>
                    )}
                </div>

                {/* Mail Body */}
                {mailBodyData && (
                    <MailBody
                        data={mailBodyData}
                        handleFavorite={changeTofavorite}
                        close={close}
                    />
                )}
            </div>
        </>
    );
}

export default App;
