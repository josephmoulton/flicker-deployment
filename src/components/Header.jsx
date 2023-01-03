import React from "react";
import "./Header.css";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Header({ search }) {
  const [searchInput, setSearchInput] = useState("");
  const goHome = () => navigate("/");
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="container">
        <div className="header__container">
          <div className="logo__container" onClick={goHome}>
            <h3>Flicker</h3>
            <div className="logo__icon">
              <MovieIcon />
            </div>
          </div>
          <div className="header__links">
            <Link to="/" className="header__link">
              Home
            </Link>
            <a className="header__link" href="#">
              Find your movie
            </a>
            <a href="/contact">
              <button className="header__link header__link--button">
                Contact
              </button>
            </a>
          </div>
        </div>
        {search && (
          <div className="search__container">
            <span className="search__title">Browse Our Films</span>
            <div className="searchBox">
              <input
                value={searchInput}
                className="search__input"
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <SearchIcon className="search__icon" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
