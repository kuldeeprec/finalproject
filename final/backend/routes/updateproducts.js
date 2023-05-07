const Product = require('../models/Product');
const express = require('express');
const router = express.Router();


router.post('/updateproduct', async (req, res) => {
   console.log(req)
   try{
     console.log(req.body)
    for(let i=0;i<req.body.length;i++)
    {
    let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
   }
   res.status(200).json({success: "success"})
}
catch(error){
   console.error(error.message);
   res.status(500).send("internal server Error occured");
 }
})

module.exports = router