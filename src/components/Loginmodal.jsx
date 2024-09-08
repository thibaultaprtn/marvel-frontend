import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const backurl = import.meta.env.VITE_BACKURL;
import Cookies from "js-cookie";
import { IoClose } from "react-icons/io5";
import "../styles/loginmodal.css";

const Loginmodal = ({
  setDisplayLogin,
  setDisplaySignup,
  token,
  setToken,
  userId,
  setUserId,
}) => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="backgroundmodal"></div>
      <form
        className="form"
        action=""
        onSubmit={async (event) => {
          setErrorMessage("");
          event.preventDefault();
          try {
            const req = {
              email: email,
              password: pwd,
            };
            const response = await axios.post(`${backurl}/user/login`, req);
            console.log(response);
            Cookies.set("token", response.data.token, { expires: 7 });
            Cookies.set("userId", response.data._id, { expires: 7 });
            setToken(response.data.token);
            setUserId(response.data._id);
            // navigate("/");
            // TODO Est ce qu'il vaut mieux aller sur Publish ou sur Home à ce moment la ?
            // navigate("/");
            setDisplayLogin(false);
            console.log("identification réussie");
          } catch (error) {
            console.log(error.response.data);
            setErrorMessage(error.response.data.message);
          }
        }}
      >
        <IoClose
          id="logincloseicon"
          onClick={() => {
            setDisplayLogin(false);
          }}
        />
        <h2>LOGIN</h2>
        <input
          className="logininput"
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="logininput"
          type="password"
          placeholder="PASSWORD"
          value={pwd}
          onChange={(event) => {
            setPwd(event.target.value);
          }}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button className="loginbutton" type="submit">
          LOGIN
        </button>
        <p
          className="logincomment"
          style={{ textAlign: "center" }}
          onClick={() => {
            setDisplaySignup(true);
            setDisplayLogin(false);
          }}
        >
          YOU DO NOT HAVE AN ACCOUNT YET ? SIGN IN !
        </p>
      </form>
    </>
  );
};

export default Loginmodal;
