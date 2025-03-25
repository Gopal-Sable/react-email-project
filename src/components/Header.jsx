import React, { useState } from "react";
import { filterMails } from "../../util/mailUtils";
import FilterButton from "./FilterButton";

const Header = ({ setFilterData, mails, closeMailBody }) => {
    const [filterBtn, setFilterBtn] = useState("all");

    const handleFilterClick = (filterType) => {
        closeMailBody();
        setFilterBtn(filterType.toLowerCase());
        setFilterData(filterMails(mails, filterType));
    };
    return (
        <header id="filter-container" className="flex items-center p-6 mx-6">
            <p>Filter By:</p>
            <div className="flex gap-2px items-center justify-center">
                {["All", "Unread", "Read", "Favorites"].map((filter) => (
                    <FilterButton
                        key={filter}
                        name={filter}
                        handleClick={handleFilterClick}
                        active={filterBtn === filter.toLowerCase()}
                    />
                ))}
            </div>
        </header>
    );
};

export default Header;
