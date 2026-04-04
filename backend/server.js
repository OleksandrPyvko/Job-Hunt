const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const applications = require("./applicationsRoutes");
const authRoutes = require("./authRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(applications);
app.use("/auth", authRoutes);

connect
  .connectToServer()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
