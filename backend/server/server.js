const express = require("express");
const cors = require("cors");

const userRoutes = require("../routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json()); // MUST be before routes

app.use("/todos", userRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
