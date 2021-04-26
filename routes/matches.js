const express = require("express");
const router = express.Router();

const getDatabase = require("../database.js");

router.get("/", async (req, res) => {
  const items = await getDatabase.getCollection("matches");
  res.send(items);
});


router.get("/matchWinners/:id", async (req, res) => {
	const id = req.params.id;
	const items = await getDatabase.getCollection("matches");
	//res.send(item);
	let matchWinners=[];
	
   for(let i=0;i<items.length;i++)
   {
	   if(items[i].winnerid==id)
	   {
		   matchWinners.push(items[i].id)
		  // matchWinners.matchid=items[i].winnerid
		   //break;
	   }

   }
   res.send(matchWinners)
	
  });

router.get("/winners", async (req, res) => {
  const items = await getDatabase.getCollection("matches");
  let result = items.reduce(function (acc, curr) {
    // Check if there exist an object in empty array whose winnerId matches
    let isElemExist = acc.findIndex(function (item) {
      return item.winnerid === curr.winnerid;
    });
    if (isElemExist === -1) {
      let obj = {};
      obj.winnerid = curr.winnerid;
      obj.count = 1;
      obj.winnerid = curr.winnerid;
      acc.push(obj);
    } else {
      acc[isElemExist].count += 1;
    }
    return acc;
  }, []);
  result.sort(function (a, b) {
    return parseFloat(b.count) - parseFloat(a.count);
  });
  const topfive = result.slice(0, 5);
  console.log(result);
  console.log(topfive);
  res.send(topfive);
});

router.get("/losers", async (req, res) => {
  const items = await getDatabase.getCollection("matches");
  let result = items.reduce(function (acc, curr) {
    // Check if there exist an object in empty array whose loserId matches
    let isElemExist = acc.findIndex(function (item) {
      return item.loserid === curr.loserid;
    });
    if (isElemExist === -1) {
      let obj = {};
      obj.loserid = curr.loserid;
      obj.count = 1;
      obj.loserid = curr.loserid;
      acc.push(obj);
    } else {
      acc[isElemExist].count += 1;
    }
    return acc;
  }, []);
  result.sort(function (a, b) {
    return parseFloat(b.count) - parseFloat(a.count);
  });
  const topfive = result.slice(0, 5);
  console.log(result);
  console.log(topfive);

  res.send(topfive);
});



router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const item = await getDatabase.getDocByID("matches", id);

  
  res.send(item);
});



router.post("/", async (req, res) => {
  const obj = req.body;
  if (!obj.winnerid || !obj.loserid) {
    res.sendStatus(400);
    return;
  }
  const docRef = await getDatabase.postToCollection("matches", obj);
  const newMatch = {
	winnerid: req.body.winnerid,
	loserid: req.body.loserid,
    id:docRef 
}
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
