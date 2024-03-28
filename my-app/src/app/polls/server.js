// const express = require("express");
// const mongoose = require("mongoose");
// const pollRoutes = require("./routes/pollRoutes");

// const app = express();
// const PORT = process.env.PORT || 3000;

// mongoose.connect('mongodb+srv://yang2166:Creepa1688@mydb.9xtm0sn.mongodb.net/?retryWrites=true&w=majority&appName=mydb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   })
//   .catch(error => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// app.use(express.json());
// app.use("/api/polls", pollRoutes);

// module.exports = app;

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Port number for your server

// Define a sample polls data
const polls = [
  { id: 1, title: 'Favorite Color', options: ['Red', 'Blue', 'Green'] },
  { id: 2, title: 'Favorite Animal', options: ['Dog', 'Cat', 'Bird'] },
];

// Define route to fetch polls data
app.get('/api/polls', (req, res) => {
  res.json(polls);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
