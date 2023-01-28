const express = require("express");
const router = express.Router();
const ConsultingSession = require("../models/consultingsession");

// consulting sessions ---------------------------
// Create a new consulting session
router.post("/create", async (req, res) => {
  try {
    const session = new ConsultingSession({
      consultant: req.body.consultant_id,
      available: req.body.available,
      date: req.body.date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
    });
    await session.save();
    res.status(201).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all consulting sessions
router.get("/all", async (req, res) => {
  try {
    const sessions = await ConsultingSession.find();
    res.send(sessions);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific consulting session
router.get("/:id", async (req, res) => {
  try {
    const session = await ConsultingSession.findById(req.params.id);
    if (!session) {
      return res.status(404).send("Consulting session not found");
    }
    res.send(session);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update a specific consulting session
router.patch("/:id", async (req, res) => {
  try {
    const session = await ConsultingSession.findByIdAndUpdate(
      req.params.id,
      {
        available: req.body.available,
        date: req.body.date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
      },
      { new: true }
    );
    if (!session) {
      return res.status(404).send("Consulting session not found");
    }
    res.send(session);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a specific consulting session
router.delete("/:id", async (req, res) => {
  try {
    const session = await ConsultingSession.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).send("Consulting session not found");
    }
    res.send(session);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
