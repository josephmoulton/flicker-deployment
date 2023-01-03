import React from "react";
import "./Credits.css";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import placeholderImage from "../assets/DefaultPoster.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MovieCard from "../components/MovieCard";
import CreditCard from "../components/CreditCard";

function Credits() {
  const { id, color } = useParams();
  const [film, setFilm] = useState([]);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMovie() {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id.replace(
        ":",
        ""
      )}?api_key=72df3e39ae70f2a87b61200cd97ee96b`
    );
    setFilm(data);
    setLoading(false);
  }

  async function fetchCredits() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id.replace(
        ":",
        ""
      )}/credits?api_key=72df3e39ae70f2a87b61200cd97ee96b&language=en-US`
    );
    setCredits(data);
  }

  useEffect(() => {
    fetchMovie();
    fetchCredits();
  }, []);

  return (
    <>
      <Header />
      <div className="movie__banner" style={{ background: color.replace(":", "") }}>
        <div className="banner__container">
          <img
            src={
              film?.poster_path
                ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                : placeholderImage
            }
            alt="Film Poster"
            className="movie__icon"
          />
          <div className="banner__title">
            <div className="title__container">
              <h2 className="title">
                {film?.title}
                <span className="date">
                  {" "}
                  ({film?.release_date?.split("-")[0]})
                </span>
              </h2>
            </div>
            <h3 className="return">
              <Link to={`/profile:${id.replace(":", "")}`} className="link">
                <ArrowBackIcon fontSize="small" /> Back to main
              </Link>
            </h3>
          </div>
        </div>
      </div>

      <section id="content">
        <div className="container">
          <div className="row">
            <div className="content">
              <div className="crew__container">
                <div className="crew__title">
                  Cast <span className="length">{credits?.cast?.length}</span>
                </div>
                {credits?.cast?.map((credit) => (
                  <CreditCard
                    key={credit.id}
                    id={credit.id}
                    photo={credit.profile_path}
                    name={credit.name}
                    role={credit.character}
                  />
                ))}
              </div>
              <div className="crew__container">
                <div className="crew__title">
                  Crew <span className="length">{credits?.crew?.length}</span>
                </div>
                {credits?.crew?.map((credit) => (     
                  <CreditCard
                    key={credit.id}
                    id={credit.id}
                    photo={credit.profile_path}
                    name={credit.name}
                    role={credit.department}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Credits;
