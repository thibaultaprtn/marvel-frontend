import * as React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../assets/marvel_logo.svg";

const Header = ({
  setDisplaySignup,
  setDisplayLogin,
  token,
  setToken,
  userId,
  setUserId,
}) => {
  const [displayMessage, setDisplayMessage] = useState("");

  const navigate = useNavigate();

  return (
    <header>
      <div className="container headerdiv">
        {/* <Link to="/">
          <img
            src="https://lereacteur-vinted.netlify.app/assets/logo-a7c93c98.png"
            alt="logo-vinted"
          />
        </Link> */}

        <button
          className="headerbutton"
          onClick={() => {
            navigate("/");
          }}
        >
          CHARACTERS
        </button>
        <button
          className="headerbutton"
          onClick={() => {
            navigate("/comics");
          }}
        >
          COMICS
        </button>
        <img className="headerlogo" src={logo} alt="logo" />
        <button
          className="headerbutton"
          onClick={() => {
            navigate("/favorites");
          }}
        >
          FAVORITES
        </button>
        <>
          {token ? (
            <button
              className="headerbutton"
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("userId");
                setToken(null);
                setUserId(null);
                // navigate("/");
              }}
            >
              LOG OUT
            </button>
          ) : (
            <div className="loginlogoutdiv">
              <button
                className="headerbutton"
                onClick={() => {
                  setDisplaySignup(true);
                }}
              >
                SIGN IN
              </button>
              <button
                className="headerbutton"
                onClick={() => {
                  setDisplayLogin(true);
                }}
              >
                LOGIN
              </button>
            </div>
          )}
        </>
      </div>
    </header>
  );
};

export default Header;
