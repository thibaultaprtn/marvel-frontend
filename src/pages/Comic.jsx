import { useParams } from "react-router-dom";
import axios from "axios";

const Comic = () => {
  const { id } = useParams();
  return (
    <div>
      Comic {id}
      <button>Favorite</button>
    </div>
  );
};

export default Comic;
