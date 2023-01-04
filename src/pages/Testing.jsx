import React from "react";
import "./Testing.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import placeholderImage from "../assets/DefaultPoster.png";
import { useNavigate } from "react-router-dom";

function Testing() {
  const { searchResult } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [maxPages, setMaxPages] = useState(0);

  function onSearch() {
    fetchMovies();
  }

  async function fetchMovies() {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=72df3e39ae70f2a87b61200cd97ee96b&language=en-US&query=${searchResult}&page=${pageNo}`
    );
    setMovies(data.results);
    setLoading(false);
    setMaxPages(data.total_pages);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="sub__header">
          <div className="post__search--container">
            <label className="post__search--label">
              Total Pages: {maxPages}{" "}
            </label>
            <input
              className="post__search--input"
              max={maxPages}
              min="1"
              type="number"
              value={pageNo}
              onChange={(e) => setPageNo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
            />
            <button onClick={() => onSearch()}>Enter</button>
          </div>
        </div>

        <div className="row">
          <div className="user-list">
            {movies.map((movie) => (
              <div className="user" key={movie.id}>
                <div className="user-card">
                  <div className="user-card__container">
                    <Link to={`/profile/:${movie.id}`}>
                      <h3>{movie.title}</h3>
                      <p>
                        <b>Popularity:</b> {movie.popularity}
                      </p>
                      <p>
                        <b>Release_date:</b> {movie.release_date}
                      </p>
                      <p>
                        <b>Image:</b>
                      </p>
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : placeholderImage
                        }
                        alt=""
                        className="movie__poster"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Testing;
