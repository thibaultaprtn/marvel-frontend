import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const backurl = import.meta.env.VITE_BACKURL;

import Cookies from "js-cookie";
import { IoClose } from "react-icons/io5";

const Signupmodal = ({
  setDisplaySignup,
  setDisplayLogin,
  token,
  setToken,
  userId,
  setUserId,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <div> </div>
      <form
        action=""
        onSubmit={async (event) => {
          setErrorMessage("");
          event.preventDefault();
          try {
            const req = {
              username: username,
              email: email,
              password: pwd,
              // newsletter: newsletter,
            };
            const response = await axios.post(`${backurl}/user/signup`, req);
            // console.log("test");
            // console.log("response.data.token", response.data.token);
            console.log(response.data);
            setToken(response.data.token);
            setUserId(response.data._id);
            Cookies.set("token", response.data.token, { expires: 7 });
            Cookies.set("userId", response.data._id, { expires: 7 });
            setDisplaySignup(false);
            // navigate("/");
          } catch (error) {
            console.log(error.response.data);
            setErrorMessage(error.response.data.message);
            // return alert(error.response.data.message);
          }
        }}
      >
        <p style={{ alignSelf: "flex-end", fontSize: 20 }}>
          <IoClose
            onClick={() => {
              setDisplaySignup(false);
            }}
          />
        </p>
        <h2>S'inscrire</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={pwd}
          onChange={(event) => {
            setPwd(event.target.value);
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 15,
            marginTop: 20,
            marginBottom: 20,
          }}
        ></div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button id="signupsubmitbutton" type="submit">
          S'inscrire
        </button>
        <p
          style={{ textAlign: "center" }}
          onClick={() => {
            setDisplayLogin(true), setDisplaySignup(false);
          }}
        >
          Tu as déjà un compte ? Connecte-toi !
        </p>
      </form>
    </>
  );
};

export default Signupmodal;
