import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavButton from "../components/FavButton";
import "../styles/favorites.css";
const serverurl = import.meta.env.VITE_BACKURL;

const Favorites = ({ userId, setUserId, token, setToken }) => {
  const navigate = useNavigate();
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);
  const [favoritesComics, setFavoritesComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [changed, setChanged] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchfavorites = async (req, res) => {
      try {
        let charactersId = [];
        let comicsId = [];
        if (token) {
          // console.log("chemin de cookies");
          //Dans le cas ou l'on est connecté on fait un requête pour récupérer les id des favoris que l'on stock dans deux tableaux charactersId et comicsId
          const response = await axios.get(
            `${serverurl}/user/favoritesid/${userId}`
          );
          // console.log("response", response);
          setFavorites(response.data);
          charactersId = response.data.characters;
          // console.log("charactersId", charactersId);
          comicsId = response.data.comics;
          // console.log("comicsId", comicsId);
          // On fait des requêtes en get/id pour obtenir des tableaux avec toutes les infos
          // console.log(charactersId.length);
        } else {
          // console.log("chemin de local storage");
          console.log(
            "test sur le local storage",
            localStorage.getItem("characters") ? "truthy" : "falsy"
          );
          charactersId = localStorage.getItem("characters")
            ? localStorage.getItem("characters").split(",")
            : [];
          comicsId = localStorage.getItem("comics")
            ? localStorage.getItem("comics").split(",")
            : [];
          console.log("charactersId", charactersId);
          console.log("comicsId", comicsId);
          // On fait des requêtes en get/id pour obtenir des tableaux avec toutes les infos
          // console.log(charactersId.length);
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

        const testfunction = async (funcId, array, category, res) => {
          try {
            const favcharatemp = await axios.get(
              `${serverurl}/${category}/${funcId}`
            );
            // console.log(favcharatemp.data);
            array.push(favcharatemp.data);
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
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
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };
    fetchfavorites();
  }, [token]);
  // console.log("testing", favoritesCharacters);
  // console.log("testing2", favoritesComics);
  // console.log([].length);
  // console.log("favorites", favorites);
  // console.log("testing2", favoritesComics);

  return (
    <>
      {isLoading ? (
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
          <h2 className="favoritespageh2">FAVORITES</h2>
          <h3 className="favoritespageh3"> CHARACTERS</h3>

          {favoritesCharacters.length === 0 ? (
            <div>No character has been added to the favorites.</div>
          ) : (
            <div className="favoritespagemap">
              {favoritesCharacters.map((elem) => {
                return (
                  <div
                    className="favoritespagecharacterdiv"
                    key={elem._id}
                    onClick={(e) => {
                      navigate(`/character/${elem._id}`);
                    }}
                  >
                    <p className="favoritespagecharactername">{elem.name}</p>
                    <div className="favoritepagepicturebox">
                      <img
                        src={`${elem.thumbnail.path}/portrait_uncanny.${elem.thumbnail.extension}`}
                        alt={elem.name}
                      />
                      <div className="favoritepagecharactersbuttonliner">
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
                    </div>

                    {/* <button>Favorite</button> */}
                  </div>
                );
              })}
            </div>
          )}

          <h3 className="favoritespageh3">COMICS</h3>

          {favoritesComics.length === 0 ? (
            <div>No comic has been added to the favorites.</div>
          ) : (
            <div className="favoritespagemap" style={{ marginBottom: 70 }}>
              {favoritesComics.map((elem) => {
                // console.log("parcourt comics :", elem);
                return (
                  <div
                    className="favoritespagecharacterdiv"
                    key={elem._id}
                    onClick={(e) => {
                      navigate(`/comic/${elem._id}`);
                    }}
                  >
                    <p className="favoritespagecomictitle">{elem.title}</p>
                    <div className="favoritepagepicturebox">
                      <img
                        src={`${elem.thumbnail.path}/portrait_uncanny.${elem.thumbnail.extension}`}
                        alt={elem.title}
                      />
                      <div className="favoritepagecharactersbuttonliner">
                        <FavButton
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
                    </div>

                    {/* <button>Favorite</button> */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Favorites;
