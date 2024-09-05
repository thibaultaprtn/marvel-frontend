import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const serverurl = import.meta.env.VITE_BACKURL;

const Characters = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [pagemax, setPagemax] = useState(null);

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

  console.log("pagemax", pagemax, "limit", limit, typeof limit);
  return (
    <>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <label htmlFor="characterssearchbar">Rechercher par nom</label>
          <input
            id="characterssearchbar"
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          {/* TODO Gérer les conditions d'affichage de l'input page */}
          {/* TODO Plutot qu'un input il vaudrait mieux faire des boutons */}
          <label htmlFor="characterspage"> Quelle page </label>
          <span>1...</span>
          <input
            id="characterspage"
            type="number"
            value={page || ""}
            min="1"
            max={`${pagemax}`}
            required
            onChange={(event) => {
              // console.log("event.target.max", Number(event.target.max));
              let { value, min, max } = event.target;
              if (value === "") {
                setPage(null);
              } else {
                value = Math.max(
                  Number(min),
                  Math.min(Number(max), Number(value))
                );
                setPage(value);
              }
            }}
          />
          <span>...{pagemax}</span>
          <label htmlFor="characterslimit"> Combien d'élément par pages </label>
          <input
            id="characterslimit"
            type="number"
            value={limit}
            onChange={(event) => {
              setLimit(event.target.value);
            }}
          />
          <div>
            {data.results.map((elem) => {
              return (
                <p
                  key={elem._id}
                  onClick={(e) => {
                    navigate(`/character/${elem._id}`);
                  }}
                >
                  {elem.name}
                </p>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Characters;
