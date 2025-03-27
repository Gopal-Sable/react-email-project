
import FilterButton from "./FilterButton";

const Header = ({ setFilter, closeMailBody,activeFilter }) => {

    const handleFilterClick = (filterType) => {
        closeMailBody();
        setFilter(filterType);
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
                        active={filter===activeFilter}
                    />
                ))}
            </div>
        </header>
    );
};

export default Header;
