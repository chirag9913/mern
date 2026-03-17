// import packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// create app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// analyze route
app.use("/analyze", require("./routes/analyze"));

// connect mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => {
  console.log("MongoDB connection failed, running without database");
  console.log(err.message);
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
