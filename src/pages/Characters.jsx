import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Packages pour l'autocomplete qui n'a pas abbouti

// import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import "react-autocomplete-input/dist/bundle.css";

//Import des composants
import Pagination from "../components/Pagination";

const serverurl = import.meta.env.VITE_BACKURL;

const Characters = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoading2, setIsLoading2] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [pagemax, setPagemax] = useState(null);
  // const [autcompleteoptions, setAutocompleteOptions] = useState([]);

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

  // console.log("pagemax", pagemax, "limit", limit, typeof limit);
  // console.log("autocompleteoptions", autcompleteoptions);
  return (
    <>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <label htmlFor="characterssearchbar">Rechercher par nom</label>
          <input
            // options={["abc", "bcd", "def"]}
            id="characterssearchbar"
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
                    navigate(`/character/${elem._id}`);
                  }}
                >
                  <p>{elem.name}</p>
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

export default Characters;
