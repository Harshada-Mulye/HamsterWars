const express = require("express");
const router = express.Router();

const getDatabase = require("../database.js");
db = getDatabase.getDatabase();

router.get("/", async (req, res) => {
  let result;

  try {
    result = await db
      .collection("hamsters")
      .orderBy("wins", "desc")
      .limit(5)
      .get();

    const winners = [];

    result.forEach((doc) => {
      winners.push(doc.data());
    });

    res.send(winners);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
