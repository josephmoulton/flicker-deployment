import React from "react";
import "./Credit.css";
import avatar from "../assets/DefaultPoster.png";
import { useNavigate } from "react-router-dom";

function Credit({ name, character, photo , id }) {
  const navigate = useNavigate();

  return (
    <div className="credit__container" onClick={() => navigate(`/crewprofile/:${id}`)}>
      <img
        className="photo"
        src={photo ? `https://image.tmdb.org/t/p/w500${photo}` : avatar}
        alt="Actors headshot"
      />
      <div className="text__container">
        <div className="name">{name}</div>
        <div className="character">{character}</div>
      </div>
    </div>
  );
}

export default Credit;
