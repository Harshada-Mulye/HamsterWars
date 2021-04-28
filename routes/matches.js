const express = require("express");
const router = express.Router();

const getDatabase = require("../database.js");

router.get("/", async (req, res) => {
  const items = await getDatabase.getCollection("matches");
  res.send(items);
});


router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const item = await getDatabase.getDocByID("matches", id);
  
  if(typeof item === 'number') {
	res.sendStatus(item)
	return
}
  res.send(item);
});

router.post("/", async (req, res) => {
  const obj = req.body;
  if (!obj.winnerId || !obj.loserId) {
    res.sendStatus(400);
    return;
  }
  const docRef = await getDatabase.postToCollection("matches", obj);
  const newMatch = {
    winnerid: req.body.winnerid,
    loserid: req.body.loserid,
    id: docRef,
  };
  res.send(newMatch);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  const response = await getDatabase.putToCollection("matches", id, obj);
  res.sendStatus(response);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const docRef = await getDatabase.deleteFromCollection("matches", id);
  res.sendStatus(docRef);
});
module.exports = router;
