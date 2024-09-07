import * as React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
      <div>
        {/* <Link to="/">
          <img
            src="https://lereacteur-vinted.netlify.app/assets/logo-a7c93c98.png"
            alt="logo-vinted"
          />
        </Link> */}

        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Characters
        </button>
        <button
          onClick={() => {
            navigate("/comics");
          }}
        >
          Comics
        </button>
        <button
          onClick={() => {
            navigate("/favorites");
          }}
        >
          Favorites
        </button>
        <>
          {token ? (
            <button
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("userId");
                setToken(null);
                setUserId(null);
                // navigate("/");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <div>
              <button
                onClick={() => {
                  setDisplaySignup(true);
                }}
              >
                S'inscrire
              </button>
              <button
                onClick={() => {
                  setDisplayLogin(true);
                }}
              >
                Se connecter
              </button>
            </div>
          )}
        </>
      </div>
    </header>
  );
};

export default Header;
