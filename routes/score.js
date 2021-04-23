const express = require('express')
const router = express.Router()

const getDatabase = require('../database.js');
//const db = getDatabase()

router.get('/',  (req, res) => {
	res.send('hello')
})

router.get('/:challanger/:defender', async (req, res) => {
    const challanger = req.params.challanger
    const defender = req.params.defender

	const items = await getDatabase.getCollection('matches')
	let score=[]
	for(var i = 0; i < items.length; ++i) {
		let opt_one=(items[i].winnerid === challanger)&&(items[i].loserid===defender)
	  let opt_two=(items[i].winnerid === defender)&&(items[i].loserid===challanger)
	 if(opt_one  || opt_two)
	 {
	  score.push(items[i])
    }
   
}

let result = score.reduce(function(acc, curr) {
	// Check if there exist an object in empty array whose winnerId matches
	let isElemExist = acc.findIndex(function(item) {
	  return item.winnerid === curr.winnerid;
	})
	if (isElemExist === -1) {
	  let obj = {};
	  obj.winnerid = curr.winnerid;
	  obj.count = 1;
	  obj.winnerid = curr.winnerid;
	  acc.push(obj)
	} else {
	  acc[isElemExist].count += 1
	}
	return acc;
  
  }, [])
  result.sort(function(a, b) {
	return parseFloat(b.count) - parseFloat(a.count);
	
});


res.send(result)

})

module.exports=router