const getDatabase = require("../database.js");
//const db=getDatabase();
const express = require("express");
const router = express.Router();
db = getDatabase.getDatabase()

router.get("/", async (req, res) => {
	//result = await db.collection('hamsters').orderBy('games', 'desc').limit(5).get();
	let items = []
	result = await db.collection('hamsters').orderBy('games', 'asc').get();
	result.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		items.push(data)
	});
   

	console.log(items)
	const fewMatches = []

    for (var i = 0; i < items.length; i++) {
		console.log(items[i].games)
        fewMatches.push(items[i])
    
    }

    res.send(fewMatches)

});
module.exports = router;

