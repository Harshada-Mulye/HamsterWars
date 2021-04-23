const getDatabase=require('../database.js')
//const db=getDatabase();
const express=require('express')
const router=express.Router()


router.get('/',  (req, res) => {
	res.send('hello')
})
router.get('/:id', async (req, res) => {
	const id=req.params.id
	const items = await getDatabase.getCollection('matches')
	let defeted=[]
	for(var i = 0; i < items.length; ++i) {
	 if(items[i].winnerid === id)
	  defeted.push(items[i])
      
    }
    res.send(defeted)

})



module.exports=router