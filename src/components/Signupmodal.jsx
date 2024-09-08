import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const backurl = import.meta.env.VITE_BACKURL;
import "../styles/signin.css";

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
      <div className="backgroundmodal"> </div>
      <form
        className="form"
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
        <IoClose
          id="signupcloseicon"
          onClick={() => {
            setDisplaySignup(false);
          }}
        />

        <h2>SIGNIN</h2>
        <input
          className="signupinput"
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          className="signupinput"
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="signupinput"
          type="password"
          placeholder="PASSWORD"
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
            marginTop: 0,
            marginBottom: 0,
          }}
        ></div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button className="signupbutton" type="submit">
          SIGN IN
        </button>
        <p
          className="signupcomment"
          style={{ textAlign: "center" }}
          onClick={() => {
            setDisplayLogin(true), setDisplaySignup(false);
          }}
        >
          YOU ALREADY HAVE AN ACCOUNT ? LOG IN !
        </p>
      </form>
    </>
  );
};

export default Signupmodal;
