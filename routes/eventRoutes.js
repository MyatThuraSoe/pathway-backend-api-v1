const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// events route ----------------------------
router.post("/create", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Failed to create event",
      error: "No data in the req.body",
    });
  }

  try {
    const newEvent = new Event({
      image: req.body.img,
      name: req.body.name,
      organizer: req.body.organizer,
      data: req.body.data,
      time: req.body.time,
      location: req.body.location,
      description: req.body.description,
      registerlink: req.body.registerlink,
    });

    await newEvent.save();

    res.status(201).json({ message: "Event created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to create event", error: err });
  }
});

router.get("/all", async (req, res) => {
  try {
    const events = await Event.find({});
    const total = await Event.count({});
    res.json({ events: events, total: total });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch events", error: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(404).json({ message: "Event not found", error: err });
  }
});

router.patch("/update/:id", async (req, res) => {
  const newevent = {
    image: req.body.img,
    name: req.body.name,
    organizer: req.body.organizer,
    data: req.body.data,
    time: req.body.time,
    location: req.body.location,
    description: req.body.description,
    registerlink: req.body.registerlink,
  };
  try {
    await Event.findByIdAndUpdate(req.params.id, newevent);
    res.status(200).json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(404).json({ message: "Event not found", error: err });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: "Event not found", error: err });
  }
});

module.exports = router;
