import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
const serverurl = import.meta.env.VITE_BACKURL;

const FavButton = (props) => {
  // Il faut rajouter le traitement du cas de figure ou l'utilisateur est authentifié
  const { category, tab, id, setChanged, changed } = props;
  console.log(tab);
  const isConnected = Cookies.get("token") ? true : false;

  return (
    <>
      {tab.includes(id) ? (
        <button
          onClick={async () => {
            let index = tab.indexOf(id);
            let tabtemp = tab;
            tabtemp.splice(index, 1);

            if (isConnected) {
              await axios.put(
                `${serverurl}/user/update/${Cookies.get("id")}}`,
                {
                  id: Cookies.get("id"),
                  tabtemp: tabtemp,
                  category: category,
                  headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
            } else {
              localStorage.setItem("characters", tab);
            }
            setChanged(!changed);
          }}
        >
          Supprimer des favoris
        </button>
      ) : (
        <button
          onClick={async () => {
            let tabtemp = tab;
            tabtemp.push(id);

            if (isConnected) {
              await axios.put(
                `${serverurl}/user/update/${Cookies.get("id")}}`,
                {
                  id: Cookies.get("id"),
                  tabtemp: tabtemp,
                  category: category,
                  headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
            } else {
              localStorage.setItem("characters", tab);
            }
            setChanged(!changed);
          }}
        >
          Ajouter aux favoris
        </button>
      )}
    </>
  );
};

export default FavButton;
