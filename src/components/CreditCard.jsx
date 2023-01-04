import React from "react";
import "./CreditCard.css";
import avatar from "../assets/default-avatar.png";
import { useNavigate } from "react-router-dom";

function CreditCard({ photo, name, releaseDate, role, id }) {
  const navigate = useNavigate()
  return (
    <div className="credit__card">
      <img
        src={
          photo ? `https://image.tmdb.org/t/p/w500${photo}` : avatar
        }
        alt=""
        className="credit__profile"
        onClick={() => (navigate(`/crewprofile/:${id}`))}
      />
      <div className="credit__info">
        <h2 className="credit__name">{name}</h2>
        <span className="role">{role}</span>
      </div>
    </div>
  );
}

export default CreditCard;
