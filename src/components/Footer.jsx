import React from "react";
import "./Footer.css";
import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate } from "react-router-dom";

function Footer({ bg }) {
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  return (
    <div className="footer" style={{ background: bg }}>
      <div className="container">
        <div className="links__container">
          <div className="footer__logo--container">
            <div className="logo__container" onClick={goHome}>
              <h3>Flicker</h3>
              <div className="logo__icon">
                <MovieIcon />
              </div>
            </div>
          </div>
          <div className="link__container">
            <h4 className="link__title">Legal</h4>
            <p className="footer__link">Lorem</p>
            <p className="footer__link">Lorem</p>
            <p className="footer__link">Lorem</p>
            <p className="footer__link">Lorem</p>
          </div>
          <div className="link__container">
            <h4 className="link__title">Social</h4>
            <p className="footer__link">Lorem</p>
            <p className="footer__link">Lorem</p>
            <p className="footer__link">Lorem</p>
            <p className="footer__link">Lorem</p>
          </div>
          <div className="link__container">
            <h4 className="link__title">FAQs</h4>
            <p className="footer__link">Lorem</p>
            <p className="footer__link">Lorem</p>
            <p className="footer__link">Lorem</p>
            <p className="footer__link">Lorem</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
