import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Cookies from "js-cookie";

//Composants
import Header from "./components/Header";
import Signupmodal from "./components/Signupmodal";
import Loginmodal from "./components/Loginmodal";

//Pages
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
import Favorites from "./pages/Favorites";

function App() {
  const [displayLogin, setDisplayLogin] = useState(false);
  const [displaySignup, setDisplaySignup] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);
  // localStorage.setItem("characters", " ");
  // localStorage.setItem("comics", " ");
  return (
    <>
      <Router>
        {displaySignup && (
          <Signupmodal
            userId={userId}
            setUserId={setUserId}
            token={token}
            setToken={setToken}
            setDisplaySignup={setDisplaySignup}
            setDisplayLogin={setDisplayLogin}
          />
        )}
        {displayLogin && (
          <Loginmodal
            userId={userId}
            setUserId={setUserId}
            token={token}
            setToken={setToken}
            setDisplayLogin={setDisplayLogin}
            setDisplaySignup={setDisplaySignup}
          />
        )}
        <Header
          userId={userId}
          setUserId={setUserId}
          token={token}
          setToken={setToken}
          setDisplaySignup={setDisplaySignup}
          setDisplayLogin={setDisplayLogin}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Characters
                userId={userId}
                setUserId={setUserId}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
                userId={userId}
                setUserId={setUserId}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/character/:id"
            element={
              <Character
                userId={userId}
                setUserId={setUserId}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/comic/:id"
            element={
              <Comic
                userId={userId}
                setUserId={setUserId}
                token={token}
                setToken={setToken}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                userId={userId}
                setUserId={setUserId}
                token={token}
                setToken={setToken}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
