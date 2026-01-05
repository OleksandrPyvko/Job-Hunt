const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const database = require("./connect");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username, email and password required" });
  }
  const db = database.getDb();
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "Username with this email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db
    .collection("users")
    .insertOne({ username, email, password: hashedPassword });
  res.status(201).json({ message: "User registered successfully" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password required" });
  }
  const db = database.getDb();
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { userId: user._id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: "5h" }
  );
  res.json({ token });
});

// Logout (client should just delete token, but endpoint for completeness)
router.post("/logout", (req, res) => {
  // No server-side action needed for JWT logout
  res.json({ message: "Logged out" });
});

module.exports = router;
