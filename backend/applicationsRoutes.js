const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;

let applicationsRoutes = express.Router();

//1 read all
applicationsRoutes.route("/applications").get(async (request, response) => {
  try {
    let db = database.getDb();
    let data = await db.collection("applications").find({}).toArray();
    if (data.length > 0) {
      response.json(data);
    } else {
      response.status(200).json([]);
    }
  } catch (e) {
    response
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

//2 read one
// applicationsRoutes.route("/applications/:id").get(async (request, response) => {
//   let db = database.getDb();
//   let data = await db
//     .collection("applications")
//     .findOne({ _id: new ObjectId(request.params.id) });
//   if (Object.keys(data).length > 0) {
//     response.json(data);
//   } else {
//     throw new Error("Data was not found");
//   }
// });

applicationsRoutes.route("/applications/:id").get(async (request, response) => {
  try {
    const db = database.getDb();
    const data = await db
      .collection("applications")
      .findOne({ _id: new ObjectId(request.params.id) });

    if (!data) {
      return response.status(404).json({ message: "Application not found" });
    }

    response.json(data);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Server error" });
  }
});

//3 create one
applicationsRoutes.route("/applications").post(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    company: request.body.company,
    status: request.body.status,
    position: request.body.position,
    location: request.body.location,
    applied: request.body.applied,
    interview: request.body.interview,
    notes: request.body.notes,
    userId: request.body.userId,
  };
  let data = await db.collection("applications").insertOne(mongoObject);
  response.json(data);
});
//4 update one
applicationsRoutes.route("/applications/:id").put(async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      company: request.body.company,
      status: request.body.status,
      position: request.body.position,
      location: request.body.location,
      applied: request.body.applied,
      interview: request.body.interview,
      notes: request.body.notes,
    },
  };
  let data = await db
    .collection("applications")
    .updateOne({ _id: new ObjectId(request.params.id) }, { mongoObject });
  response.json(data);
});

//5 delete one
applicationsRoutes
  .route("/applications/:id")
  .delete(async (request, response) => {
    let db = database.getDb();
    let data = await db
      .collection("applications")
      .deleteOne({ _id: new ObjectId(request.params.id) });
    response.json(data);
  });

//6 get all applications for a user
applicationsRoutes
  .route("/applications/user/:userId")
  .get(async (request, response) => {
    try {
      let db = database.getDb();
      let data = await db
        .collection("applications")
        .find({ userId: request.params.userId })
        .toArray();
      response.json(data);
    } catch (error) {
      response
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  });

module.exports = applicationsRoutes;
