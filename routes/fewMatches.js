const getDatabase=require('../database.js')
//const db=getDatabase();
const express=require('express')
const router=express.Router()

router.get('/', async (req, res) => {
	const items = await getDatabase.getCollection("matches");


	/*let result = items.reduce(function (acc, curr) {
	  // Check if there exist an object in empty array whose id matches
	  let isElemExist = acc.findIndex(function (item) {
		return item.name === curr.name;
	  });
	  if (isElemExist === -1) {
		let obj = {};
		obj.name = curr.name;
		obj.count = 1;
		obj.name = curr.name;
		acc.push(obj);
	  } else {
		acc[isElemExist].count += 1;
	  }
	  return acc;
	}, []);
	console.log(result)
	result.sort(function (a, b) {
	  return parseFloat(a.count) - parseFloat(b.count);
	});
	res.send(result)*/
})
module.exports = router;