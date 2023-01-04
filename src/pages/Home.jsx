import React from "react";
import Header from "../components/Header";
import "./Home.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import movieImage from "../assets/undraw_horror_movie_3988.svg";
import { Navigate, useNavigate } from "react-router-dom";


function Home() {

  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const goToSearch = () => navigate(`/results/:${searchInput}`);
  return (
    <>
      <div className="home">
        <Header />
        <div className="home__container">
          <h1 className="home__title">
            England's most awarded Movie database platform
          </h1>
          <h3 className="home__sub-title">
            {"Find your perfect film with".toUpperCase()}
            <span className="accent__color"> FLICKER</span>
          </h3>
          <div className="home__search--container">
            <input
              value={searchInput}
              type="text"
              className="home__search--input"
              placeholder="Search for your perfect film..."
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goToSearch()}

            />
            <div className="home__search--icon" onClick={goToSearch}>
              <SearchIcon className="icon" />
            </div>
          </div>
          <img
            className="home__img"
            src={movieImage}
            alt="image of two people watching a film"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
