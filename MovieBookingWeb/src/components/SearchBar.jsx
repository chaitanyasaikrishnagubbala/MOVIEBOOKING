import { useState } from "react";

function SearchBar({ onSearch }) {

  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="search-section">

      <div className="search-container">

        <input
          type="text"
          placeholder="Search movies by title..."
          className="search-input"
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />

        <button
          className="search-button"
          onClick={handleSearch}
        >
          Search
        </button>

      </div>

    </section>
  );
}

export default SearchBar;