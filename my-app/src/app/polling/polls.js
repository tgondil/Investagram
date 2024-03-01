const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');

// Get all polls
router.get('/polls', async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new poll
router.post('/polls', async (req, res) => {
  const poll = new Poll({
    title: req.body.title,
    options: req.body.options
  });
  try {
    const newPoll = await poll.save();
    res.status(201).json(newPoll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vote on a poll
router.put('/polls/:id/vote', async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: 'Poll not found' });
    const optionIndex = poll.options.findIndex(option => option === req.body.option);
    if (optionIndex === -1) return res.status(400).json({ message: 'Invalid option' });
    poll.optionsVotes[optionIndex]++;
    await poll.save();
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
