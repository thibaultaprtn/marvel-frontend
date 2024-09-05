import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const serverurl = import.meta.env.VITE_BACKURL;

//import des composants
import Pagination from "../components/Pagination";

const Comics = () => {
  const navigate = useNavigate();
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
                <div
                  key={elem._id}
                  onClick={(e) => {
                    navigate(`/comic/${elem._id}`);
                  }}
                >
                  <p>{elem.title}</p>
                  <button>Favorite</button>
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
