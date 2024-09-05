import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Character = () => {
  const { id } = useParams();
  // console.log(id);
  const [a, setA] = useState([]);
  const [changed, setChanged] = useState(false);

  // localStorage.setItem("favcharacters", ["a", "b", "c"]);
  useEffect(() => {
    setA(
      localStorage.getItem("characters")
        ? localStorage.getItem("characters").split(",")
        : []
    );
  }, [changed]);

  return (
    <>
      <div>
        Character
        {a.includes(id) && (
          <button
            onClick={(e) => {
              let index = a.indexOf(id);
              let tabtemp = a;
              tabtemp.splice(index, 1);
              setChanged(!changed);
              localStorage.setItem("characters", a);
            }}
          >
            Supprimer des favoris
          </button>
        )}
        {!a.includes(id) && (
          <button
            onClick={(e) => {
              let tabtemp = a;
              tabtemp.push(id);
              setChanged(!changed);
              localStorage.setItem("characters", a);
            }}
          >
            {" "}
            Ajouter aux favoris
          </button>
        )}
      </div>
    </>
  );
};

export default Character;
