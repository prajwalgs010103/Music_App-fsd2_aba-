import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export default function UpdateSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getSong = async () => {
      try {
        const res = await fetch(`http://localhost:3001/songs/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.status === 200) {
          console.log("Data Retrieved.");
          setTitle(data.title);
          setArtist(data.artist);
          setAlbum(data.album);
          setReleaseDate(data.releaseDate);
        } else {
          console.log("Something went wrong. Please try again.");
        }
      } catch (err) {
        console.log(err);
      }
    };

    getSong();
  }, [id]);

  const updateSong = async (e) => {
    e.preventDefault();

    if (!title || !artist || !album || !releaseDate) {
      setError("*Please fill in all the required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3001/updatesong/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, artist, album, releaseDate }),
      });

      if (response.status === 200) {
        alert("Song Updated");
        navigate("/songs");
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
      <h1 className="">Update Song Details</h1>
      <div className="mt-5 col-lg-6 col-md-6 col-12">
        <label htmlFor="song_title" className="form-label fs-4 fw-bold">
          Title
        </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="form-control fs-5"
          id="song_title"
          placeholder="Enter Title"
          required
        />
      </div>
      <div className="mt-3 col-lg-6 col-md-6 col-12">
        <label htmlFor="song_artist" className="form-label fs-4 fw-bold">
          Artist
        </label>
        <input
          type="text"
          onChange={(e) => setArtist(e.target.value)}
          value={artist}
          className="form-control fs-5"
          id="song_artist"
          placeholder="Enter Artist"
          required
        />
      </div>
      <div className="mt-3 col-lg-6 col-md-6 col-12">
        <label htmlFor="song_album" className="form-label fs-4 fw-bold">
          Album
        </label>
        <input
          type="text"
          onChange={(e) => setAlbum(e.target.value)}
          value={album}
          className="form-control fs-5"
          id="song_album"
          placeholder="Enter Album"
          required
        />
      </div>
      <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12">
        <label htmlFor="song_release_date" className="form-label fs-4 fw-bold">
          Release Date
        </label>
        <input
          type="date"
          onChange={(e) => setReleaseDate(e.target.value)}
          value={releaseDate}
          className="form-control fs-5"
          id="song_release_date"
          required
        />
      </div>
      <div className="d-flex justify-content-center col-lg-6 col-md-6">
        <NavLink to="/songs" className="btn btn-primary me-5 fs-4">
          Cancel
        </NavLink>
        <button
          type="submit"
          onClick={updateSong}
          className="btn btn-primary fs-4"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
      <div className="col text-center col-lg-6">
        {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
      </div>
    </div>
  );
}
