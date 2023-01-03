import React, { useState } from "react";
import "./SearchBox.css";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

function SearchBox({ result }) {
  const placeholder = result.replace(":", "");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const goToSearch = () => navigate(`/results:${searchInput}`);

  return (
    <div className="container">
      <div className="search">
        <SearchIcon
          onClick={() => {
            goToSearch();
          }}
        />
        <input
          value={searchInput}
          className="search__input"
          type="text"
          placeholder={placeholder}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && goToSearch()}
        />
      </div>
    </div>
  );
}

export default SearchBox;
