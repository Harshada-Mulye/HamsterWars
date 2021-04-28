const express = require("express");
const router = express.Router();

const getDatabase = require("../database.js");
db = getDatabase.getDatabase();

router.get("/", (req, res) => {
  res.send("hello");
});

router.get("/:challanger/:defender", async (req, res) => {
  const challanger = req.params.challanger;
  const defender = req.params.defender;
  let challengerItems = [];
  let defenderItems = [];
  const challangerWins = await db
    .collection("matches")
    .where("winnerId", "==", challanger)
    .get();
  const challangerLoses = await db
    .collection("matches")
    .where("loserId", "==", challanger)
    .get();

  challangerWins.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    challengerItems.push(data);
  });

  challangerLoses.forEach((doc) => {
    const data = doc.data();
    data.id = doc.id;
    defenderItems.push(data);
  });

  let matches = [];

  challengerItems.forEach((game) => {
    console.log("1");
    if (game.loserId == defender) {
      matches.push(game);
    }
  });

  defenderItems.forEach((game) => {
    console.log("2");
    if (game.winnerId == defender) {
      matches.push(game);
    }
  });
  console.log(matches);
  let gameScore = {
    challangerWins: 0,
    defenderWins: 0,
  };

  matches.forEach((game) => {
    if (game.winnerId === challanger) {
      console.log(gameScore);
      gameScore.challangerWins++;
    }
    if (game.winnerId === defender) {
      console.log(gameScore);
      gameScore.defenderWins++;
    }
  });
  res.send(gameScore);
});

module.exports = router;
