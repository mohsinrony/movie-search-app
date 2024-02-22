import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import imageUrl from "../assets/react.svg";
import { Link } from "react-router-dom";


const Footer: React.FC = () => {
  return (
    <footer>
      <div>
        <Link to={"/"}>
          <img src={imageUrl} height="60px;" width="60px;" alt="Logo" />
        </Link>

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
