import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function InsertTrack() {
  const [trackName, setTrackName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const setName = (e) => {
    setTrackName(e.target.value);
  };

  const setArtist = (e) => {
    setArtistName(e.target.value);
  };

  const setDate = (e) => {
    setReleaseDate(e.target.value);
  };

  const addTrack = async (e) => {
    e.preventDefault();

    if (!trackName || !artistName || !releaseDate) {
      setError("*Please fill in all the required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/inserttrack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: trackName,
          Artist: artistName,
          Date: releaseDate,
        }),
      });

      await res.json();

      if (res.status === 201) {
        alert("Track Inserted");
        setTrackName("");
        setArtistName("");
        setReleaseDate("");
        navigate("/music"); 
      } else if (res.status === 422) {
        alert("Track is already added with that name.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-5">
      <h1>Enter the Track Details</h1>

      <div className="mt-5 col-lg-6 col-md-6 col-12 fs-4">
        <label htmlFor="track_name" className="form-label fw-bold">
          Track Name
        </label>
        <input
          type="text"
          onChange={setName}
          value={trackName}
          className="form-control fs-5"
          id="track_name"
          placeholder="Enter Track Name"
          required
        />
      </div>
      <div className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
        <label htmlFor="artist_name" className="form-label fw-bold">
          Artist Name
        </label>
        <input
          type="text"
          onChange={setArtist}
          value={artistName}
          className="form-control fs-5"
          id="artist_name"
          placeholder="Enter Artist Name"
          required
        />
      </div>
      <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
        <label htmlFor="release_date" className="form-label fw-bold">
          Release Date
        </label>
        <input
          type="date"
          onChange={setDate}
          value={releaseDate}
          className="form-control fs-5"
          id="release_date"
          placeholder="Enter Release Date"
          required
        />
      </div>
      <div className="d-flex justify-content-center col-lg-6 col-md-6">
        <NavLink to="/music" className="btn btn-primary me-5 fs-4">
          Cancel
        </NavLink>
        <button
          type="submit"
          onClick={addTrack}
          className="btn btn-primary fs-4"
          disabled={loading}
        >
          {loading ? "Inserting..." : "Insert"}
        </button>
      </div>
      <div className="col text-center col-lg-6">
        {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
      </div>
    </div>
  );
}
