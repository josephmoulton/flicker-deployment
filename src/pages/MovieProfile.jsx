import React from "react";
import "./MovieProfile.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import placeholderImage from "../assets/DefaultPoster.png";
import Header from "../components/Header";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PaidIcon from "@mui/icons-material/Paid";
import SellIcon from "@mui/icons-material/Sell";
import IconWithTag from "../components/IconWithTag";
import Credit from "../components/Credit";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ColorThief from "colorthief/dist/color-thief.mjs";
import Footer from "../components/Footer";
import MovieCard from "../components/MovieCard";

function MovieProfile() {
  const { id } = useParams();
  const [genres, setGenres] = useState([]);
  const [film, setFilm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState([]);
  const [avgColor, setAvgColor] = useState([]);
  const [imgLoad, setImgLoad] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  async function fetchMovie() {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id.replace(
        ":",
        ""
      )}?api_key=72df3e39ae70f2a87b61200cd97ee96b`
    );
    setFilm(data);
    setGenres(data.genres);
    setLoading(false);
  }

  async function fetchCredits() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id.replace(
        ":",
        ""
      )}/credits?api_key=72df3e39ae70f2a87b61200cd97ee96b&language=en-US`
    );
    setCredits(data.cast);
  }

  async function fetchRecommendations() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id.replace(
        ":",
        ""
      )}/recommendations?api_key=72df3e39ae70f2a87b61200cd97ee96b&language=en-US&page=1`
    );
    setRecommendations(data.results);
  }

  async function fetchColor() {
    const colorThief = new ColorThief();
    const img = new Image();

    img.addEventListener("load", function () {
      const color = colorThief.getColor(img);
      setAvgColor(`rgba(${color[0]},${color[1]}, ${color[2]}, 0.8)`);
      setImgLoad(false);
    });

    let imageURL = `https://image.tmdb.org/t/p/w500${film?.poster_path}`;
    let googleProxyURL =
      "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";

    img.crossOrigin = "Anonymous";
    img.src = googleProxyURL + encodeURIComponent(imageURL);
  }

  async function fetchCredits() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id.replace(
        ":",
        ""
      )}/credits?api_key=72df3e39ae70f2a87b61200cd97ee96b&language=en-US`
    );
    setCredits(data.cast);
  }

  useEffect(() => {
    fetchMovie();
    fetchCredits();
    fetchRecommendations();
  }, [id]);

  if (loading === false) {
    fetchColor();
  }

  return (
    <>
      <Header></Header>
      <div className="film__header">
        <img
          src={
            imgLoad
              ? placeholderImage
              : film.backdrop_path
              ? `https://image.tmdb.org/t/p/original${film.backdrop_path}`
              : placeholderImage
          }
          alt="film backdrop"
          className="film__backdrop"
        />
        <div
          className="film__header--container"
          style={{ background: avgColor }}
        >
          <div className="film__data--container">
            <div className="film__poster--container">
              <img
                src={
                  film.poster_path
                    ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                    : placeholderImage
                }
                alt="Film Poster"
                className="film__poster"
              />
              {film.release_date ? (
                <div className="film__availability">Film Available</div>
              ) : (
                <div className="film__availability">Film Not Available</div>
              )}
            </div>
            <div className="film__info--container">
              <div className="film__title--conatiner">
                <h1 className="film__title">
                  {film.title}{" "}
                  <span className="film__year">
                    ({film?.release_date?.split("-")[0]})
                  </span>
                </h1>
                <div className="film__subtitle--container">
                  <div className="release">{film?.release_date}</div>
                  <div className="dot"> • </div>
                  {genres.map((genre) => (
                    <div key={genre.id} className="genres__container">
                      <Link to={`/genreResults:${genre.id}`}>{genre.name}</Link>
                      <div className="dot"> • </div>
                    </div>
                  ))}
                  <div className="runtime">
                    {Math.floor(film?.runtime / 60)}h {film?.runtime % 60}m
                  </div>
                </div>
                <div className="tagline">{film?.tagline}</div>
                <div className="stats__container">
                  <div className="user__container">
                    <div className="review__container">
                      <CircularProgressbarWithChildren
                        value={film?.vote_average?.toFixed(1)}
                        maxValue={10}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                          backgroundColor: "#242424",
                          textColor: "#fff",
                          pathColor: "#32cd32",
                          trailColor: "#006400",
                        })}
                      >
                        <div style={{ fontSize: 16 }}>{`${
                          film?.vote_average?.toFixed(1) * 10
                        }%`}</div>
                      </CircularProgressbarWithChildren>
                    </div>
                    <h4 className="user-score">User Score</h4>
                  </div>
                  <div className="budget">
                    <PaidIcon className="money__icon" />
                    <div className="money">
                      <p className="money__title">Budget:</p>
                      <p>${film?.budget?.toLocaleString()}.00</p>
                    </div>
                  </div>
                  <div className="revenue">
                    <SellIcon className="money__icon" />
                    <div className="money">
                      <p className="money__title">Revenue:</p>
                      <p>${film?.revenue?.toLocaleString()}.00</p>
                    </div>
                  </div>
                </div>
                <div className="film__info">
                  <h3 className="overview">Overview</h3>
                  <p className="overview__text">{film?.overview}</p>
                </div>
                <div className="production__container">
                  {film?.production_companies?.map((company) => (
                    <IconWithTag
                      key={company.id}
                      name={company.name}
                      logoPath={company.logo_path}
                      originCountry={company.origin_country}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="cast__header">Top Billed Cast</h3>
      <div className="cast__container">
        {credits?.slice(0, 9)?.map((actor) => (
          <Credit
            id={actor.id}
            key={actor.id}
            name={actor.name}
            character={actor.character}
            photo={actor.profile_path}
          />
        ))}
        {credits.length > 0 ? (
          <div className="view-more__container">
            <Link
              to={`/profile:${id.replace(":", "")}/credits:${avgColor}`}
              className="cast__link"
            >
              <p>View More</p>
              <ArrowForwardIosIcon />
            </Link>
          </div>
        ) : (
          <div>We don't have any cast added to this movie ¯\_(o_0)_/¯</div>
        )}
      </div>
      <div className="link__container">
        <Link
          to={`/profile:${id.replace(":", "")}/credits:${avgColor}`}
          className="cast__link"
        >
          Full cast & crew <ArrowOutwardIcon />
        </Link>
      </div>
      <h3 className="cast__header">Movie Recommendations</h3>
      <div className="reccomended__container">
        {recommendations.length > 0 ? (
          <div className="reccomended__container">
            {recommendations?.slice(0, 5)?.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                photo={movie.poster_path}
                title={movie.title}
                releaseDate={movie.release_date}
                description={movie.overview}
              />
            ))}
          </div>
        ) : (
          <div>
            We don't have any recommendations for this movie ¯\_(o_0)_/¯
          </div>
        )}
      </div>
      <Footer bg={avgColor} />
    </>
  );
}

export default MovieProfile;
