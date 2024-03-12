import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import imageUrl from "../assets/logo.png";
import { Link } from "react-router-dom";

const currentYear = new Date().getFullYear();


const Footer: React.FC = () => {
  return (
    <footer>

        <div className="copyRight">
          <p>&copy; {currentYear} <a href="/">T3MDB</a></p>
        </div>

        <Link to={"/"}>
          {/* <img src={imageUrl} height="60px" alt="T3MDB" /> */}
          <h1>T3 Movies</h1>
        </Link>

        <div>
        <a href="https://twitter.com">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://facebook.com">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://instagram.com">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
