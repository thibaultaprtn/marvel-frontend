import { useParams } from "react-router-dom";
import axios from "axios";

const Character = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Character</div>;
};

export default Character;
