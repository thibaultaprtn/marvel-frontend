import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const serverurl = import.meta.env.VITE_BACKURL;

//import des composants
import Pagination from "../components/Pagination";
import FavButton from "../components/FavButton";

const Comics = ({ token, setToken, userId, setUserId }) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [pagemax, setPagemax] = useState(null);

  const [favorites, setFavorites] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const searchfilter = search;
    const pagefilter = page;
    const limitfilter = limit;
    const fetchdata = async () => {
      const { data } = await axios.get(`${serverurl}/comics`, {
        params: { title: searchfilter, page: pagefilter, limit: limitfilter },
      });
      console.log("data", data);
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
        console.log("chemin de cookie");
        console.log("token", token);
        console.log("userId", userId);
        const response = await axios.get(
          `${serverurl}/user/favoritesid/${userId}`
        );
        console.log("response for favorites", response);
        setFavorites(response.data.comics);
        // Il faut changer l'adresse de manière à faire la requête pour obtenir les favoris
      } else {
        console.log("chemin de local storage");
        setFavorites(
          localStorage.getItem("comics")
            ? localStorage.getItem("comics").split(",")
            : []
        );
      }
    };
    fetchfavorites();
  }, [changed, token, userId]);

  return (
    <>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <label htmlFor="comicssearchbar">Rechercher par titre</label>
          <input
            id="comicssearchbar"
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />

          <Pagination
            page={page}
            setPage={setPage}
            pagemax={pagemax}
            limit={limit}
            setLimit={setLimit}
            datacount={data.count}
          />

          <div>
            {data.results.map((elem) => {
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
                    token={token}
                    setToken={setToken}
                    userId={userId}
                    setUserId={setUserId}
                    category="comics"
                    tab={favorites}
                    id={elem._id}
                    setChanged={setChanged}
                    changed={changed}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Comics;
