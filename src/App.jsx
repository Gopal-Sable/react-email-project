import { useEffect, useState } from "react";
import "./App.css";
import FilterButton from "./components/FilterButton";
import MailCard from "./components/MailCard";
import MailBody from "./components/MailBody";
import { EMAIL_URL } from "../util/constVariables";
import { updateMailState, filterMails } from "../util/mailUtils.js";

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
                const dataAdded = data.list.map(mail => ({ ...mail, favorite: false, read: false }));
                setMails(dataAdded);
                setFilterData(dataAdded);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const changeTofavorite = id => {
        setMails(prevMails => updateMailState(prevMails, id, "favorite"));
        setFilterData(prevFilterData => updateMailState(prevFilterData, id, "favorite"));
    };

    const openMailBody = data => {
        setMails(prevMails => updateMailState(prevMails, data.id, "read"));
        setFilterData(prevFilterData => updateMailState(prevFilterData, data.id, "read"));
        setMailBodyData(data);
    };

    const handleFilterClick = filterType => {
        setFilterBtn(filterType.toLowerCase());
        setFilterData(filterMails(mails, filterType));
    };

    const closeMailBody = () => {
        setMailBodyData(null);
    };

    return (
        <main>
            <header id="filter-container" className="flex items-center mx-6 my-2">
                <p>Filter By:</p>
                <div className="flex gap-2px items-center justify-center">
                    {["All", "Unread", "Read", "Favorites"].map(filter => (
                        <FilterButton
                            key={filter}
                            name={filter}
                            handleClick={handleFilterClick}
                            active={filterBtn === filter.toLowerCase()}
                        />
                    ))}
                </div>
            </header>

            <section
                id="main"
                className={`m-2 h-screen ${mailBodyData ? "grid lg:grid-cols-[30%_70%] md:grid-cols-[40%_60%] sm:grid-cols-1" : ""}`}
            >
                <aside id="email-list" className="flex m-2 flex-col bg-[var(--bg)] h-full overflow-auto">
                    {filterData.length > 0 ? (
                        filterData.map(mail => (
                            <MailCard
                                key={mail.id}
                                data={mail}
                                active={mailBodyData?.id === mail.id}
                                handleClick={openMailBody}
                            />
                        ))
                    ) : (
                        <p>No mail found</p>
                    )}
                </aside>

                {mailBodyData && (
                    <section>
                        <MailBody data={mailBodyData} handleFavorite={changeTofavorite} close={closeMailBody} />
                    </section>
                )}
            </section>
        </main>
    );
}

export default App;
