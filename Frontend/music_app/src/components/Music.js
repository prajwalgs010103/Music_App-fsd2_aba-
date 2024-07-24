import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Music() {
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    getMusic();
  }, []);

  const getMusic = async () => {
    try {
      const res = await fetch("http://localhost:3001/music", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 201) {
        console.log("Data Retrieved.");
        setMusicData(data);
      } else {
        console.log("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMusic = async (id) => {
    const response = await fetch(`http://localhost:3001/deletemusic/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await response.json();
    console.log(deletedata);

    if (response.status === 422 || !deletedata) {
      console.log("Error");
    } else {
      console.log("Music deleted");
      getMusic();
    }
  };

  return (
    <>
      <div className="container-fluid p-5">
        <h1>Music List</h1>
        <div className="add_button">
          <NavLink to="/inserttrack" className="btn btn-primary fs-5">
            {" "}
            + Add a Track
          </NavLink>
        </div>
        <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
          <table className="table table-striped table-hover mt-3 fs-5">
            <thead>
              <tr className="tr_color">
                <th scope="col">#</th>
                <th scope="col">Track</th>
                <th scope="col">Artist</th>
                <th scope="col">Release Date</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {musicData.map((element, id) => {
                return (
                  <tr key={id}>
                    <th scope="row">{id + 1}</th>
                    <td>{element.title}</td>
                    <td>{element.artist}</td>
                    <td>{element.album}</td>
                    <td>{element.releaseDate}</td>
                    <td>
                      <NavLink
                        to={`/updatesong/${element._id}`}
                        className="btn btn-primary"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </NavLink>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteMusic(element._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
