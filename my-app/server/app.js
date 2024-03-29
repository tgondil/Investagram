const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://tgondil:gMnxHLC26iA4V9rP@cluster0.jrtwssx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Require and use messaging routes
const messagingRoutes = require('./routes/messaging');
app.use(messagingRoutes);

const accountUpdateRoutes = require('./routes/accountUpdate');
app.use(accountUpdateRoutes);

const profilePictureRoutes = require('./routes/profilePicture');
app.use(profilePictureRoutes);

const createAccountRoutes = require('./routes/createAccount');
app.use(createAccountRoutes);

const accountInfoRoutes = require('./routes/accountInfo');
app.use(accountInfoRoutes);

const accountLoginRoutes = require('./routes/accountLogin');
app.use(accountLoginRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
