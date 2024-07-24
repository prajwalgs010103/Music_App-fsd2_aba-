import React from "react";
import musicImage from "../music.png"; // Adjust the path as needed

export default function Home() {
  return (
    <div className="container-fluid p-5" style={{ textAlign: "center" }}>
      <h2>Music App</h2>
      <p className="lead">Experience the joy of music</p>
      <img
        src={musicImage}
        alt="Music"
        style={{
          maxWidth: "100%",
          height: "auto",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      />
    </div>
  );
}
