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
// app.use('/api/auth', applications)

app.listen(PORT, () => {
  connect.connectToServer();
  console.log("Server is running on port 3000");
});
