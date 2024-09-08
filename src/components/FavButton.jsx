import axios from "axios";
import "../styles/favbutton.css";
import Cookies from "js-cookie";
import { useEffect } from "react";
const serverurl = import.meta.env.VITE_BACKURL;
import { FaRegHeart } from "react-icons/fa"; //<FaRegHeart />
import { FaHeart } from "react-icons/fa"; //<FaHeart />

const FavButton = (props) => {
  // Il faut rajouter le traitement du cas de figure ou l'utilisateur est authentifié
  const {
    category,
    tab,
    id,
    setChanged,
    changed,
    token,
    setToken,
    userId,
    setUserId,
  } = props;
  // console.log(tab);
  const isConnected = token ? true : false;

  return (
    <>
      {tab.includes(id) ? (
        <button
          className="favbutton"
          onClick={async (e) => {
            e.stopPropagation();
            let index = tab.indexOf(id);
            let tabtemp = tab;
            tabtemp.splice(index, 1);

            if (isConnected) {
              await axios.put(`${serverurl}/user/update/${token}}`, {
                id: userId,
                tabtemp: tabtemp,
                category: category,
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              });
            } else {
              localStorage.setItem(`${category}`, tab);
            }
            setChanged(!changed);
          }}
        >
          <FaHeart />
        </button>
      ) : (
        <button
          className="favbutton"
          onClick={async (e) => {
            e.stopPropagation();
            let tabtemp = tab;
            tabtemp.push(id);

            if (isConnected) {
              await axios.put(`${serverurl}/user/update/${token}}`, {
                id: userId,
                tabtemp: tabtemp,
                category: category,
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              });
            } else {
              localStorage.setItem(`${category}`, tab);
            }
            setChanged(!changed);
          }}
        >
          <FaRegHeart />
        </button>
      )}
    </>
  );
};

export default FavButton;
