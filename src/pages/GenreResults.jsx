import React from "react";
import "./GenreResults.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import placeholderImage from "../assets/DefaultPoster.png";
import MovieCard from "../components/MovieCard";
import SearchBox from "../components/SearchBox";
import { Pagination } from "@mui/material";

function GenreResults() {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [genreName, setGenreName] = useState("");
  const [genreList, setGenreList] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [genreObj, setGenreObj] = useState([]);

  async function fetchData() {
    const movieApi = `https://api.themoviedb.org/3/discover/movie?api_key=72df3e39ae70f2a87b61200cd97ee96b&with_genres=${genreId.replace(
      ":",
      ""
    )}&page=${pageNo}`;
    const genreApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=72df3e39ae70f2a87b61200cd97ee96b&language=en-US`;
    const getMovies = axios.get(movieApi);
    const getGenres = axios.get(genreApi);
    axios.all([getMovies, getGenres]).then(
      axios.spread((...allData) => {
        const moviesData = allData[0];
        const genresData = allData[1];
        setMovies(moviesData.data.results);
        setMaxPages(moviesData.data.total_pages);
        setGenreList(genresData.data);
      })
    );
  }

  useEffect(() => {
    fetchData();
  }, [pageNo]);

  return (
    <>
      <Header />
      <h1 className="genre__title">
        {
          genreList?.genres?.find(
            (obj) => obj.id === parseInt(genreId.replace(":", ""))
          ).name
        }
      </h1>
      <div className="pagination__container">
        {maxPages > 10 ? (
          <Pagination
            count={maxPages}
            size="large"
            variant="outlined"
            showFirstButton
            showLastButton
            page={pageNo}
            onChange={(e, value) => setPageNo(value)}
          />
        ) : (
          <Pagination
            count={maxPages}
            size="large"
            variant="outlined"
            page={pageNo}
            onChange={(e, value) => setPageNo(value)}
          />
        )}
      </div>
      <div className="container">
        <div className="row">
          <div className="result__list">
            {movies.map((movie) => (
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
        </div>
      </div>
      <Footer bg={`#e76f51`} />
    </>
  );
}
export default GenreResults;
