const Product = require('../models/Product');
const express = require('express');
const router = express.Router();


router.post('/getproduct', async (req, res) => {
       console.log(req.body.prod,"123")
       try{
       let products = await Product.find({category: req.body.prod});

       res.status(200).json({products});
       }
       catch(error){
              console.error(error.message);
              res.status(500).send("internal server Error occured");
            }
})

module.exports = router