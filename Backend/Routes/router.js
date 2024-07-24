const express = require("express");
const router = express.Router();
const Track = require("../Models/tracks");

// Inserting (Creating) Data
router.post("/inserttrack", async (req, res) => {
  const { Name, Artist, Date } = req.body;

  try {
    const existingTrack = await Track.findOne({ Name, Artist, Date });
    if (existingTrack) {
      return res.status(422).json({ message: "Track is already added." });
    }else{

    const addTrack = new Track({ Name, Artist, Date });
    await addTrack.save();
    res.status(201).json(addTrack);
    console.log(addTrack);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Getting (Reading) All Tracks
router.get("/tracks", async (req, res) => {
  try {
    const tracks = await Track.find({});
    res.status(200).json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Getting (Reading) Individual Track
router.get("/tracks/:id", async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ message: "Track not found." });
    }
    res.status(200).json(track);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Editing (Updating) Track Data
router.put("/updatesong/:id", async (req, res) => {
  const { Name, Artist, Date } = req.body;

  try {
    const updatedTrack = await Track.findByIdAndUpdate(
      req.params.id,
      { Name, Artist, Date },
      { new: true }
    );

    if (!updatedTrack) {
      return res.status(404).json({ message: "Track not found." });
    }

    res.status(200).json(updatedTrack);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Deleting Track Data
router.delete("/deletetrack/:id", async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.id);
    if (!deletedTrack) {
      return res.status(404).json({ message: "Track not found." });
    }
    res.status(200).json(deletedTrack);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
