import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";

//Composants

//Pages
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
import Favorites from "./pages/Favorites";

function App() {
  // localStorage.setItem("characters", " ");
  // localStorage.setItem("comics", " ");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="/comic/:id" element={<Comic />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
