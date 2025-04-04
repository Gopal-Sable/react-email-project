import React from "react";
import Loader from "./Loader";
import MailCard from "./MailCard";

const Sidebar = ({ loading, filterData, mailBodyData, openMailBody }) => {
    return (
        <aside
            id="email-list"
            className="flex mx-4 flex-col bg-[var(--bg)] h-[calc(100vh-100px)] overflow-auto"
        >
            {loading ? (
                <>
                    <Loader type={"mailCard"} />
                    <Loader type={"mailCard"} />
                    <Loader type={"mailCard"} />
                    <Loader type={"mailCard"} />
                </>
            ) : filterData.length > 0 ? (
                filterData.map((mail) => (
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
    );
};

export default Sidebar;
