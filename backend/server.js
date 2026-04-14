const connect = require("./connect");
const express = require("express");
const cors = require("cors");
const applications = require("./applicationsRoutes");
const authRoutes = require("./authRoutes");

const app = express();
// const PORT = 3000;
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://job-hunt-fgxu.vercel.app",
  }),
);
app.use(express.json());
app.use(applications);
app.use("/auth", authRoutes);

connect
  .connectToServer()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on ${PORT} `);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
