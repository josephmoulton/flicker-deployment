import React from "react";
import "./CrewProfile.css";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import defaultAvatar from "../assets/default-avatar.png";
import placeholderImage from "../assets/DefaultPoster.png";
import { Navigate, useNavigate } from "react-router-dom";

function CrewProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const crewId = id.replace(":", "");
  const [personalDetails, setPersonalDetails] = useState([]);
  const [work, setWork] = useState([]);

  async function fetchData() {
    const DetailAPI = `https://api.themoviedb.org/3/person/${crewId}?api_key=72df3e39ae70f2a87b61200cd97ee96b&language=en-US`;
    const MovieAPI = `https://api.themoviedb.org/3/person/${crewId}/combined_credits?api_key=72df3e39ae70f2a87b61200cd97ee96b`;
    const getDetails = axios.get(DetailAPI);
    const getMovies = axios.get(MovieAPI);
    axios.all([getDetails, getMovies]).then(
      axios.spread((...allData) => {
        const detailsData = allData[0];
        const moviesData = allData[1];
        setPersonalDetails(detailsData.data);
        setWork(moviesData.data.cast?.concat(moviesData.data.crew)).sort(
          function (a, b) {
            return a - b;
          }
        );
      })
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="content">
          <div className="personal">
            <img
              src={
                personalDetails.profile_path
                  ? `https://image.tmdb.org/t/p/w500${personalDetails.profile_path}`
                  : defaultAvatar
              }
              alt=""
              className="cast__img"
            />
            <div className="personal__info">
              <h3 className="personal__title">Personal Info</h3>
              <h4 className="personal__sub">Known For:</h4>
              <p className="personal__p">
                {personalDetails.known_for_department}
              </p>
              <h4 className="personal__sub">Gender:</h4>
              <p className="personal__p">
                {personalDetails.gender === 2 ? "Male" : "Female"}
              </p>
              <h4 className="personal__sub">Birth Date:</h4>
              <p className="personal__p">{personalDetails.birthday}</p>
              <h4 className="personal__sub">Place of birth:</h4>
              <p className="personal__p">{personalDetails.place_of_birth}</p>
              <h4 className="personal__sub">Also Known As:</h4>
              {personalDetails?.also_known_as?.map((aka, index) => (
                <p key={index} className="personal__p">
                  {aka}
                </p>
              ))}
            </div>
          </div>
          <div className="info">
            <h1 className="cast__name">{personalDetails.name}</h1>
            <h3 className="cast__bio--title">Biography</h3>
            <p className="cast__bio">
              {personalDetails.biography ? (
                personalDetails.biography
              ) : (
                <>We have no recorded biography for this person.</>
              )}
            </p>
            <div className="known__container">
              {work
                .sort((a, b) => parseFloat(a.order) - parseFloat(b.order))
                .sort(
                  (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)
                )
                .slice(0, 10)
                .map((movie) => (
                  <img
                    key={movie.id}
                    onClick={() => navigate(`/profile/:${movie.id}`)}
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : placeholderImage
                    }
                    alt=""
                    className="work__poster"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CrewProfile;
