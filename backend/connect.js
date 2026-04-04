const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const ATLAS_URI = process.env.ATLAS_URI;
const DB_NAME = process.env.DB_NAME || "JobHuntDB";

if (!ATLAS_URI) {
  throw new Error("Missing ATLAS_URI in backend/config.env");
}

const client = new MongoClient(ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

module.exports = {
  connectToServer: async () => {
    await client.connect();
    database = client.db(DB_NAME);
    console.log(`Connected to MongoDB database: ${DB_NAME}`);
  },
  getDb: () => {
    if (!database) {
      throw new Error("Database not initialized. Call connectToServer first.");
    }
    return database;
  },
};
