const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const userRoutes = require("../routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json()); // MUST be before routes

app.use("/todos", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
