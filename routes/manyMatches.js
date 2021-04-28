const getDatabase = require("../database.js");
//const db=getDatabase();
const express = require("express");
const router = express.Router();
db = getDatabase.getDatabase()

router.get("/", async (req, res) => {
	//result = await db.collection('hamsters').orderBy('games', 'desc').limit(5).get();
	let items = []
	result = await db.collection('hamsters').orderBy('games', 'desc').get();
	result.forEach(doc => {
		const data = doc.data()
		data.id = doc.id
		items.push(data)
	});
   

	console.log(items)
	const hamsters = []

    for (var i = 0; i < items.length; i++) {
		console.log(items[i].games)
        hamsters.push(items[i])
     
    }

    res.send(hamsters)

});
module.exports = router;
