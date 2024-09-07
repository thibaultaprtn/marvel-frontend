import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
const serverurl = import.meta.env.VITE_BACKURL;

//Import des composants utiles
import FavButton from "../components/FavButton";

const Character = ({ token, setToken, userId, setUserId }) => {
  const { id } = useParams();
  // console.log(id);
  const [favorites, setFavorites] = useState([]);
  const [changed, setChanged] = useState(false);

  // localStorage.setItem("favcharacters", ["a", "b", "c"]);
  useEffect(() => {
    console.log(token);
    const fetchfavorites = async () => {
      if (token) {
        console.log("chemin de cookie");
        const response = await axios.get(
          `${serverurl}/user/favoritesid/${userId}`
        );
        console.log("response for favorites", response);
        setFavorites(response.data.characters);
        // Il faut changer l'adresse de manière à faire la requête pour obtenir les favoris
      } else {
        console.log("chemin de local storage");
        setFavorites(
          localStorage.getItem("characters")
            ? localStorage.getItem("characters").split(",")
            : []
        );
      }
    };
    fetchfavorites();
  }, [changed, token, userId]);
  console.log("favorites before return", favorites);
  return (
    <>
      <div>
        Character
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
    </>
  );
};

export default Character;
