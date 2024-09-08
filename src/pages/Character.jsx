import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/character.css";
import Cookies from "js-cookie";
import axios from "axios";
const serverurl = import.meta.env.VITE_BACKURL;

//Import des composants utiles
import FavButton from "../components/FavButton";

const Character = ({ token, setToken, userId, setUserId }) => {
  const navigate = useNavigate();
  //TODO Rajouter un isLoading ?
  const { id } = useParams();
  // console.log(id);
  const [favorites, setFavorites] = useState([]);
  const [favoritesComics, setFavoritesComics] = useState([]);
  const [changed, setChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [character, setCharacter] = useState([]);

  // localStorage.setItem("favcharacters", ["a", "b", "c"]);
  useEffect(() => {
    // console.log(token);
    const fetchfavorites = async () => {
      if (token) {
        // console.log("chemin de cookie");
        const response = await axios.get(
          `${serverurl}/user/favoritesid/${userId}`
        );
        // console.log("response for favorites", response);
        setFavorites(response.data.characters);
        // Il faut changer l'adresse de manière à faire la requête pour obtenir les favoris
      } else {
        // console.log("chemin de local storage");
        setFavorites(
          localStorage.getItem("characters")
            ? localStorage.getItem("characters").split(",")
            : []
        );
      }
      setIsLoading(false);
    };
    fetchfavorites();
  }, [changed, token, userId]);

  useEffect(() => {
    // console.log(token);
    const fetchfavoritescomics = async () => {
      if (token) {
        // console.log("chemin de cookie");
        const response = await axios.get(
          `${serverurl}/user/favoritesid/${userId}`
        );
        // console.log("response for favorites", response);
        setFavoritesComics(response.data.comics);
        // Il faut changer l'adresse de manière à faire la requête pour obtenir les favoris
      } else {
        // console.log("chemin de local storage");
        setFavoritesComics(
          localStorage.getItem("comics")
            ? localStorage.getItem("comics").split(",")
            : []
        );
      }
      setIsLoading3(false);
    };
    fetchfavoritescomics();
  }, [changed, token, userId]);

  useEffect(() => {
    const fetchcharacter = async (req, res) => {
      try {
        const characterfetched = await axios.get(`${serverurl}/comics/${id}`);

        setCharacter(characterfetched.data);
        // console.log("infos obtenues sur le character", characterfetched.data);
        setIsLoading2(false);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
    fetchcharacter();
  }, []);

  // console.log("favorites before return", favorites);
  return (
    <>
      {isLoading || isLoading2 || isLoading3 ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>LOADING</p>
        </div>
      ) : (
        <div className="container">
          {/* Les infos sont dans character */}
          <h2 className="characterpagetitle">{character.name}</h2>
          <div className="characterpagepicanddescriptiondiv">
            <div className="characterpagepicdiv">
              <img
                className="characterpagepic"
                src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                alt={character.name}
              />
              <div className="characterpagebuttonliner1">
                <FavButton
                  token={token}
                  setToken={setToken}
                  userId={userId}
                  setUserId={setUserId}
                  category="characters"
                  tab={favorites}
                  id={id}
                  setChanged={setChanged}
                  changed={changed}
                />
              </div>
            </div>
            <div>
              <h3>Description :</h3>
              <p className="characterpagedescription">
                {character.description || "No description provided"}
              </p>
            </div>
          </div>
          {character.comics.length ? (
            <h3 className="characterpageappearance">
              {character.name} appears in the {character.comics.length}{" "}
              following comics :
            </h3>
          ) : (
            <h3 className="characterpageappearance">
              {character.name} does not appear in any comic of the library.
            </h3>
          )}

          <div className="characterpagecomic">
            {character.comics.map((elem, index) => {
              // console.log("element to probe", elem._id);
              return (
                <div
                  className="characterpagecomicdiv"
                  key={index}
                  onClick={(e) => {
                    navigate("/comic/:id");
                  }}
                >
                  <img
                    src={`${elem.thumbnail.path}/standard_fantastic.${elem.thumbnail.extension}`}
                    alt={elem.title}
                  />
                  <div className="characterpaccomicbuttonliner">
                    <FavButton
                      token={token}
                      setToken={setToken}
                      userId={userId}
                      setUserId={setUserId}
                      category="comics"
                      tab={favoritesComics}
                      id={elem._id}
                      setChanged={setChanged}
                      changed={changed}
                    />
                  </div>

                  <p>{elem.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Character;
