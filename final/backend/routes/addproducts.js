const Product = require('../models/Product');
const express = require('express');
const router = express.Router();


router.post('/addproduct', async (req, res) => {
   console.log(req)
   try{
     console.log(req.body)
    for(let i=0;i<req.body.length;i++)
    {
    let p = new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        desc: req.body[i].desc,
        img: req.body[i].img,
        category: req.body[i].category,
        size: req.body[i].size,
        color: req.body[i].color,
        price: req.body[i].price,
        availableQty: req.body[i].availableQty,
    })
    await p.save();
   }
   res.status(200).json({success: "success"})
}
catch(error){
   console.error(error.message);
   res.status(500).send("internal server Error occured");
 }
})

module.exports = router