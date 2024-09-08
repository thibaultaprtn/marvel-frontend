import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const serverurl = import.meta.env.VITE_BACKURL;

//Import des composants utiles
import FavButton from "../components/FavButton";

const Comic = ({ token, setToken, userId, setUserId }) => {
  const [favorites, setFavorites] = useState([]);
  const [changed, setChanged] = useState(false);

  //TODO Rajouter un isLoading
  useEffect(() => {
    // console.log(token);
    const fetchfavorites = async () => {
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
    };
    fetchfavorites();
  }, [changed, token, userId]);

  const { id } = useParams();
  return (
    <div>
      Comic {id}
      {/* <button>Favorite</button> */}
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
  );
};

export default Comic;
