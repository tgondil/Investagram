const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll");

// GET all polls
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other CRUD routes (POST, PUT, DELETE) can be added similarly

module.exports = router;

