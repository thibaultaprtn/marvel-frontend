import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/comic.css";
import axios from "axios";
const serverurl = import.meta.env.VITE_BACKURL;

//Import des composants utiles
import FavButton from "../components/FavButton";

const Comic = ({ token, setToken, userId, setUserId }) => {
  const { id } = useParams();

  const [favorites, setFavorites] = useState([]);
  const [changed, setChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [comic, setComic] = useState(null);

  //TODO Rajouter un isLoading
  useEffect(() => {
    // console.log(token);
    const fetchfavorites = async (req, res) => {
      try {
        if (token) {
          // console.log("chemin de cookie");
          const response = await axios.get(
            `${serverurl}/user/favoritesid/${userId}`
          );
          // console.log("response for favorites", response);
          setFavorites(response.data.comics);
          // Il faut changer l'adresse de manière à faire la requête pour obtenir les favoris
        } else {
          // console.log("chemin de local storage");
          setFavorites(
            localStorage.getItem("comics")
              ? localStorage.getItem("comics").split(",")
              : []
          );
        }
        setIsLoading(false);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };
    fetchfavorites();
  }, [changed, token, userId]);

  useEffect(() => {
    const fetchcomic = async (req, res) => {
      try {
        const fetchedcomic = await axios.get(`${serverurl}/comic/${id}`);
        setComic(fetchedcomic.data);
        setIsLoading2(false);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };
    fetchcomic();
  }, []);

  console.log("fetchedcomic", comic);
  return (
    <>
      {isLoading || isLoading2 ? (
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
          <div className="comicpageglobaldiv">
            <div className="comicpagepicbox">
              <img
                src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <div className="comicpagebuttonliner">
                <FavButton
                  token={token}
                  setToken={setToken}
                  userId={userId}
                  setUserId={setUserId}
                  category="comics"
                  tab={favorites}
                  id={id}
                  setChanged={setChanged}
                  changed={changed}
                />
              </div>
            </div>
            <div className="comicpagerightdiv">
              <h2>{comic.title}</h2>
              <p>{comic.description || "No description provided"}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Comic;
