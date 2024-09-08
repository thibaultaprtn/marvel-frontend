import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavButton from "../components/FavButton";
const serverurl = import.meta.env.VITE_BACKURL;

const Favorites = ({ userId, setUserId, token, setToken }) => {
  const navigate = useNavigate();
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);
  const [favoritesComics, setFavoritesComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [changed, setChanged] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchfavorites = async () => {
      let charactersId = [];
      let comicsId = [];
      if (token) {
        console.log("chemin de cookies");
        //Dans le cas ou l'on est connecté on fait un requête pour récupérer les id des favoris que l'on stock dans deux tableaux charactersId et comicsId
        const response = await axios.get(
          `${serverurl}/user/favoritesid/${userId}`
        );
        // console.log("response", response);
        setFavorites(response.data);
        charactersId = response.data.characters;
        console.log("charactersId", charactersId);
        comicsId = response.data.comics;
        console.log("comicsId", comicsId);
        // On fait des requêtes en get/id pour obtenir des tableaux avec toutes les infos
        console.log(charactersId.length);
      } else {
        console.log("chemin de local storage");
        charactersId = localStorage.getItem("characters").split(",");
        console.log("charactersId", charactersId);
        comicsId = localStorage.getItem("comics").split(",");
        console.log("comicsId", comicsId);
        // On fait des requêtes en get/id pour obtenir des tableaux avec toutes les infos
        console.log(charactersId.length);
        const tab = { characters: charactersId, comics: comicsId };
        setFavorites(tab);
      }

      // testfunction rajoute le retour de la requête dans le tableau
      const tab = [];
      const tab2 = [];

      const testfunctiongen = async (charactertab, array, category) => {
        for (let i = 0; i < charactertab.length; i++) {
          await testfunction(charactertab[i], array, category);
        }
      };

      const testfunction = async (funcId, array, category) => {
        const favcharatemp = await axios.get(
          `${serverurl}/${category}/${funcId}`
        );
        console.log(favcharatemp.data);
        array.push(favcharatemp.data);
      };

      await testfunctiongen(charactersId, tab, "character");
      await testfunctiongen(comicsId, tab2, "comic");

      setFavoritesCharacters(tab);
      setFavoritesComics(tab2);

      // const favoritesCharactersTab = await charactersId.map(
      //   async (elem, index) => {
      //     console.log("elem", elem);
      //     const response = await axios.get(`${serverurl}/character/${elem}`);
      //     console.log("response.data", response.data);
      //     return response.data;
      //   }
      // );

      // setFavoritesCharacter(response.data.characters);
      // Il faut changer l'adresse de manière à faire la requête pour obtenir les favoris
      setIsLoading(false);
    };
    fetchfavorites();
  }, [token]);
  console.log("testing", favoritesCharacters);
  console.log("testing2", favoritesComics);
  console.log("favorites", favorites);
  // console.log("testing2", favoritesComics);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Chargement</p>
        </div>
      ) : (
        <div>
          Favorites
          <div>
            {favoritesCharacters.map((elem) => {
              return (
                <div key={elem._id}>
                  <p
                    onClick={(e) => {
                      navigate(`/character/${elem._id}`);
                    }}
                  >
                    {elem.name}
                  </p>
                  {/* <button>Favorite</button> */}
                  <FavButton
                    token={token}
                    setToken={setToken}
                    userId={userId}
                    setUserId={setUserId}
                    category="characters"
                    tab={favorites.characters}
                    id={elem._id}
                    setChanged={setChanged}
                    changed={changed}
                  />
                </div>
              );
            })}
          </div>
          <div>
            {favoritesComics.map((elem) => {
              return (
                <div key={elem._id}>
                  <p
                    onClick={(e) => {
                      navigate(`/comic/${elem._id}`);
                    }}
                  >
                    {elem.title}
                  </p>
                  {/* <button>Favorite</button> */}
                  <FavButton
                    onclick="return confirm('are you sure?')"
                    token={token}
                    setToken={setToken}
                    userId={userId}
                    setUserId={setUserId}
                    category="comics"
                    tab={favorites.comics}
                    id={elem._id}
                    setChanged={setChanged}
                    changed={changed}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Favorites;
