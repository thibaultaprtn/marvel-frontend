import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/comics.css";

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
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>Chargement</p>
        </div>
      ) : (
        <>
          <div className="container">
            <div className="comicssearchbardiv">
              <input
                className="comicssearchbar"
                // id="comicssearchbar"
                placeholder="SEARCH BY TITLE"
                type="text"
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

            <div className="comicsdiv">
              {data.results.map((elem) => {
                console.log("element comics", elem);
                const url = `${elem.thumbnail.path}/portrait_uncanny.${elem.thumbnail.extension}`;
                return (
                  <div
                    className="comicbox"
                    key={elem._id}
                    onClick={(e) => {
                      navigate(`/comic/${elem._id}`);
                    }}
                  >
                    <div className="comicpicbox">
                      <img className="comicpic" src={url} alt={elem.title} />
                      <div className="buttonliner">
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
                    </div>
                    <div className="comicdescriptionbox">
                      <h2>{elem.title}</h2>
                      <p className="comicdescriptionparagraph">
                        {elem.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Comics;
