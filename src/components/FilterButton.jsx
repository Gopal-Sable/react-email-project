import React from "react";

const FilterButton = ({ name }) => {
    return (
        <button className="hover:bg-[var(--filter-btn)] hover:border rounded-3xl px-2 py-1 m-2 border border-[--var(background)] ">
            {name}
        </button>
    );
};

export default FilterButton;
