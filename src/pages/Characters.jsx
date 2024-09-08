import axios from "axios";
import "../styles/characters.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

//Packages pour l'autocomplete qui n'a pas abbouti

// import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import "react-autocomplete-input/dist/bundle.css";

//Import des composants
import Pagination from "../components/Pagination";
import FavButton from "../components/FavButton";

const serverurl = import.meta.env.VITE_BACKURL;

const Characters = ({ token, setToken, userId, setUserId }) => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoading2, setIsLoading2] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [pagemax, setPagemax] = useState(null);
  // const [autcompleteoptions, setAutocompleteOptions] = useState([]);

  const [favorites, setFavorites] = useState([]);
  const [changed, setChanged] = useState(false);

  // useEffect(() => {
  //   const tab = ["A.I.M", "3-D Man", "Aaron Stack"];
  //   setAutocompleteOptions(tab);
  //   setIsLoading2(false);
  // }, []);

  // TODO destructuring de data dans la réponse d'axios

  useEffect(() => {
    const searchfilter = search;
    const pagefilter = page;
    const limitfilter = limit;
    const fetchdata = async () => {
      const { data } = await axios.get(`${serverurl}/characters`, {
        params: { name: searchfilter, page: pagefilter, limit: limitfilter },
      });
      // console.log("data", data);
      setData(data);
      setPagemax(
        isFinite(Math.ceil(data.count / limitfilter))
          ? Math.ceil(data.count / limitfilter)
          : Math.ceil(data.count / 100)
      );
      setIsLoading(false);

      //   console.log(data.data.results);
    };
    const timer = setTimeout(() => {
      fetchdata();
    }, 350);
    return () => clearTimeout(timer);
  }, [search, page, limit]);

  useEffect(() => {
    if (page > pagemax) {
      setPage(pagemax);
    }
  }, [limit]);

  useEffect(() => {
    // console.log(Cookies.get("token"));
    const fetchfavorites = async () => {
      if (token) {
        // console.log("chemin de cookie");
        // console.log("token", token);
        // console.log("userId", userId);
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
    };
    fetchfavorites();
  }, [changed, token, userId]);

  // console.log("pagemax", pagemax, "limit", limit, typeof limit);
  // console.log("autocompleteoptions", autcompleteoptions);
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
        <>
          <div className="container">
            {/* <label className="" htmlFor="characterssearchbar">
              Rechercher par nom
            </label> */}
            <div className="charactersearchbardiv">
              <input
                className="charactersearchbar"
                // options={["abc", "bcd", "def"]}
                placeholder="SEARCH BY NAME..."
                // id="characterssearchbar"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </div>

            <Pagination
              page={page}
              setPage={setPage}
              pagemax={pagemax}
              limit={limit}
              setLimit={setLimit}
              datacount={data.count}
            />

            <div className="charactersdiv">
              {data.results.map((elem) => {
                // console.log(elem);
                const url = `${elem.thumbnail.path}/portrait_uncanny.${elem.thumbnail.extension}`;
                //fantastic 168*252px
                //uncanny 300*450px
                return (
                  <div
                    className="characterbox"
                    key={elem._id}
                    onClick={(e) => {
                      navigate(`/character/${elem._id}`);
                    }}
                  >
                    <div className="characterpicbox">
                      <img className="characterpic" src={url} alt={elem.name} />{" "}
                      <div className="buttonliner">
                        <FavButton
                          token={token}
                          setToken={setToken}
                          userId={userId}
                          setUserId={setUserId}
                          category="characters"
                          tab={favorites}
                          id={elem._id}
                          setChanged={setChanged}
                          changed={changed}
                        />
                      </div>
                    </div>
                    <div className="characterdescriptionbox">
                      <h2>{elem.name}</h2>
                      <p className="characterdescriptionparagraph">
                        {elem.description}
                      </p>
                    </div>

                    {/* <button>Favorite</button> */}
                  </div>
                );
              })}
            </div>
            <Pagination
              page={page}
              setPage={setPage}
              pagemax={pagemax}
              limit={limit}
              setLimit={setLimit}
              datacount={data.count}
            />
            {/* TODORajouter une marge */}
          </div>
          <div style={{ marginBottom: 50 }}></div>
        </>
      )}
    </>
  );
};

export default Characters;
