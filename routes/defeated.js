const getDatabase = require("../database.js")
//const db=getDatabase();
const express = require("express")
const router = express.Router()
db = getDatabase.getDatabase()

router.get("/", (req, res) => {
  res.send("hello");
});
router.get("/:id", async (req, res) => {
	let snapshot
	const id = req.params.id

	try {
		snapshot = await db.collection('matches').where('winnerId', '=', id).get()
		}

	catch(error) {
		console.log(error.message)
		res.status(500).send(error.message)
	}

	if (snapshot.empty) {
		res.sendStatus(404)
		return;
	}

	const defeated = []

	snapshot.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		defeated.push(data)
		//console.log(data.winnerId, id)
	});
	
res.send(defeated)

});

module.exports = router
