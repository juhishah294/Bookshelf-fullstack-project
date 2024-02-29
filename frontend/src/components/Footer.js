import React from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="mt-5">
        All Rights reserved &copy; {new Date().getFullYear()},{" "}
        <a href="https://github.com/juhidungrani">BookShelf</a>
        <ul className="social">
          <li className="mr-3 mt-1">
            <a href="https://github.com/juhidungrani">
              <AiFillGithub size={40} />
            </a>
          </li>
          <li className="mr-3 mt-1">
            <a href="https://www.linkedin.com/in/juhidungrani2990/">
              <AiFillLinkedin size={40} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
