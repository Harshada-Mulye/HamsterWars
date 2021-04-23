const getDatabase = require("../database.js");
//const db=getDatabase();
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const items = await getDatabase.getCollection("hamsters");
  res.send(items);
});

router.get("/random", async (req, res) => {
  const items = await getDatabase.getCollection("hamsters");
  let randomNum = Math.floor(Math.random() * items.length);
  res.send(items[randomNum]);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const item = await getDatabase.getDocByID("hamsters", id);
  res.send(item);
});

router.post("/", async (req, res) => {
  const obj = req.body;

  if (
    !obj.name ||
    typeof obj.age != "number" ||
    !obj.favFood ||
    !obj.loves ||
    !obj.imgName ||
    typeof obj.wins != "number" ||
    typeof obj.defeats != "number" ||
    typeof obj.games != "number"
  ) {
    res.sendStatus(400);
    return;
  }

  const docRef = await getDatabase.postToCollection("hamsters", obj);
  res.send({ id: docRef });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  const response = await getDatabase.putToCollection("hamsters", id, obj);
  res.sendStatus(response);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const docRef = await getDatabase.deleteFromCollection("hamsters", id);
  res.sendStatus(docRef);
});

module.exports = router;
