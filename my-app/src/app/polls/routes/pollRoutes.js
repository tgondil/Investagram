// pollRoutes.js

const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll");

// Vote for a poll option
router.post("/:pollId/vote", async (req, res) => {
  const { pollId } = req.params;
  const { optionId } = req.body;

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    const option = poll.options.find((opt) => opt.id === optionId);
    if (!option) {
      return res.status(404).json({ message: "Option not found" });
    }

    // Update vote count for the selected option
    option.votes += 1;
    await poll.save();

    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
