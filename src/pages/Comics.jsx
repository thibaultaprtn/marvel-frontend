import axios from "axios";
import { useState, useEffect } from "react";
const serverurl = import.meta.env.VITE_BACKURL;

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [pagemax, setPagemax] = useState(null);

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
          {/* TODO Gérer les conditions d'affichage de l'input page */}
          {/* TODO Plutot qu'un input il vaudrait mieux faire des boutons */}
          <label htmlFor="comicspage"> Quelle page </label>
          <span>1...</span>
          <input
            id="comicspage"
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
          <label htmlFor="comicslimit"> Combien d'élément par pages </label>
          <input
            id="comicsslimit"
            type="number"
            value={limit}
            onChange={(event) => {
              setLimit(event.target.value);
            }}
          />
          <div>
            {data.results.map((elem) => {
              return <p key={elem._id}>{elem.title}</p>;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Comics;
