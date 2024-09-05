import axios from "axios";
import { useState, useEffect } from "react";
const serverurl = import.meta.env.VITE_BACKURL;

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
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
          <button
            onClick={(event) => {
              if (page > 5) {
                setPage(page - 5);
              } else {
                setPage(1);
              }
            }}
          >
            &lt;&lt;
          </button>
          <button
            onClick={(event) => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            &lt;
          </button>
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
          <button
            onClick={(event) => {
              if (page < pagemax) {
                setPage(page + 1);
              }
            }}
          >
            &gt;
          </button>
          <button
            onClick={(event) => {
              if (page < pagemax - 5) {
                setPage(page + 5);
              } else {
                setPage(pagemax);
              }
            }}
          >
            &gt;&gt;
          </button>

          <label for="limit">Nombre de comics par page :</label>
          <select
            style={{ borderColor: "#757575", borderRadius: 3 }}
            name="limit"
            onChange={(event) => {
              // console.log("event.target.value ==>", event.target.value);
              setLimit(event.target.value);
            }}
          >
            <option value={20}> 20 </option>
            <option value={50}> 50 </option>
            <option value={100}> 100 </option>
          </select>
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
