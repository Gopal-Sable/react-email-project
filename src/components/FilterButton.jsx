import React from "react";

const FilterButton = ({ name, handleClick,active }) => {
    return (
        <button
            onClick={() => {
                handleClick(name);
            }}
            className={`cursor-pointer hover:bg-[var(--filter-btn)] hover:text-[var(--text)] hover:border rounded-3xl px-2 py-1 m-2 border ${active?"bg-[var(--filter-btn)] border-[var(--border)]":"border-[var(--background)]"} hover:border-[var(--border)]`}
        >
            {name}
        </button>
    );
};

export default FilterButton;
