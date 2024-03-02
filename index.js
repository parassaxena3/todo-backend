const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoRoutes = require("./src/routes/todoRoutes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

// Routes
app.use("/api/todos", todoRoutes);

// MongoDB Connection
mongoose.connect("mongodb://localhost/todoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
