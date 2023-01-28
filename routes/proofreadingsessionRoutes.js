const express = require("express");
const router = express.Router();
const ProofreadingSession = require("../models/proofreadingsession");

// proofreading sessions ---------------------------
// Create a new proofreading session
router.post("/create", async (req, res) => {
  try {
    const session = new ProofreadingSession({
      proofreader: req.body.proofreader_id,
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

// Get all proofreading sessions
router.get("/all", async (req, res) => {
  try {
    const sessions = await ProofreadingSession.find();
    res.send(sessions);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific proofreading session
// proofreader name lo tay tl --------------------------
router.get("/:id", async (req, res) => {
  try {
    const session = await ProofreadingSession.findById(req.params.id);
    if (!session) {
      return res.status(404).send("Proofreading session not found");
    }
    res.send(session);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a specific proofreading session
router.patch("/:id", async (req, res) => {
  try {
    const session = await ProofreadingSession.findByIdAndUpdate(
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
      return res.status(404).send("Proofreading session not found");
    }
    res.send(session);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a specific proofreading session
router.delete("/:id", async (req, res) => {
  try {
    const session = await ProofreadingSession.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).send("Proofreading session not found");
    }
    res.send(session);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
