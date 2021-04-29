const express = require("express");

const router = express.Router();
const getDatabase = require("../database.js");
db = getDatabase.getDatabase();

router.get("/:id", async (req, res) => {
  let snapshot;
  const id = req.params.id;

  try {
    snapshot = await db.collection("matches").where("winnerId", "=", id).get()
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }

  if (snapshot.empty) {
    res.sendStatus(404);
    return;
  }

  const mwinners = [];

  snapshot.forEach((doc) => {
    const data = doc.data()
    data.id = doc.id
    mwinners.push(data)
    console.log(data.winnerId, id)
  });

  res.send(mwinners);
});

module.exports = router;
