const express = require('express');
const router = express.Router();
const UserProfile = require('../models/User'); // Import the UserProfile model

// Route to add a stock to the user's watchlist
router.post('/watchlist/add', async (req, res) => {
  const { username, stock } = req.body;

  try {
    const userProfile = await UserProfile.findOne({ username: username });
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    // Check if the stock is already in the watchlist
    const stockExists = userProfile.watchlist.some(s => s.symbol === stock.symbol);
    if (stockExists) {
      return res.status(400).json({ message: 'Stock is already in the watchlist' });
    }

    userProfile.watchlist.push(stock);
    await userProfile.save();
    res.json({ message: 'Stock added to watchlist successfully', watchlist: userProfile.watchlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add stock to watchlist' });
  }
});

// Route to remove a stock from the user's watchlist
router.post('/watchlist/remove', async (req, res) => {
  const { username, stockSymbol } = req.body;

  try {
    const userProfile = await UserProfile.findOne({ username: username });
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    userProfile.watchlist = userProfile.watchlist.filter(s => s.symbol !== stockSymbol);
    await userProfile.save();
    res.json({ message: 'Stock removed from watchlist successfully', watchlist: userProfile.watchlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove stock from watchlist' });
  }
});

// Route to get the user's watchlist
router.get('/watchlist/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const userProfile = await UserProfile.findOne({ username: username });
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json({ message: 'Watchlist retrieved successfully', watchlist: userProfile.watchlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve watchlist' });
  }
});

module.exports = router;
