const getDatabase = require("../database.js");
//const db=getDatabase();
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const hamsters = await getDatabase.getCollection("hamsters");
  const matches = await getDatabase.getCollection("matches");
  let fewMatches = [];
  for (let i = 0; i < hamsters.length; i++) {
    for (let j = 0; j < matches.length; j++) {
      if (
        hamsters[i].id == matches[j].winnerid ||
        hamsters[i].id == matches[j].loserid
      ) {
        fewMatches.push(hamsters[i].id);
      }
    }
  }

  const countUnique = (fewMatches) => {
    const counts = {};
    for (var i = 0; i < fewMatches.length; i++) {
      counts[fewMatches[i]] = 1 + (counts[fewMatches[i]] || 0);
    }
    return counts;
  };
  let result = [];
  result = countUnique(fewMatches);
  console.log(typeof result);

  let entries = Object.entries(result);
  let sorted = entries.sort((a, b) => a[1] - b[1]);
  const topfive = sorted.slice(0, 5);
  res.send(topfive);
});
module.exports = router;
