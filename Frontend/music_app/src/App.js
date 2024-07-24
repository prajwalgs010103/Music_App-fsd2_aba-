import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Music from "./components/Music"; // This line is giving a warning
import InsertTrack from "./components/InsertTrack";
import UpdateSong from "./components/UpdateSong";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar title="Music App" about="About" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />{" "}
          {/* Ensure this route is correct */}
          <Route path="/inserttrack" element={<InsertTrack />} />
          <Route path="/updatesong/:id" element={<UpdateSong />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
