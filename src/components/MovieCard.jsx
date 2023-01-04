import React from "react";
import "./MovieCard.css";
import placeholderImage from "../assets/DefaultPoster.png";
import { Navigate, useNavigate } from "react-router-dom";

function MovieCard({ photo, title, releaseDate, description , id}) {
const navigate = useNavigate();
  return (
    <div className="movie__card" onClick={() => navigate(`/profile/:${id}`)}>
      <img
        src={
          photo ? `https://image.tmdb.org/t/p/w500${photo}` : placeholderImage
        }
        alt=""
        className="movie__poster"
      />
      <div className="movie__info">
        <div className="title">
          <h2 className="movie__title">{title} <span className="release-date">{releaseDate}</span></h2>
          
        </div>
        <p className="description">{description}</p>
      </div>
    </div>
  );
}

export default MovieCard;
