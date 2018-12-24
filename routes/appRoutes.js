const express = require('express');
const router = express.Router();
const User = require('../models/dataSchema');
const multer = require('multer');
const path = require('path');
const stripe = require("stripe")("sk_test_dX5mW24y8SYbSiWHTPqx7J5e");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },    
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

/*const fileFilter = (req, file, cb) => {
if(file.mimetype === 'image/jpeg'){
    cb(null, false);
}else{
    cb(null, true);
} 
};

const upload = multer({storage: storage, limits:{
    fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter}); */

const upload = multer({storage : storage});
  

router.get('/readall', function(req,res){    
    User.find({})
    .exec(function(err,users){
        if(err){
            console.log("Error retrieving users");
        }
        else
        {
            res.json(users);
        }
    })
});

router.get('/read/:id', function(req,res){    
    User.findById(req.params.id)
    .exec(function(err,user){
        if(err){
            console.log("Error retrieving user");
        }
        else
        {
            res.json(user);
        }
    })
});

router.post('/download', (req,res,next) => {
    filepath = path.join(__dirname,'../uploads/') + req.body.filename;    
    res.sendFile(filepath);
});

router.post('/create',upload.single('file'), (req, res, next) => {
    console.log(req.file);
    var newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        routingNum:req.body.routingNum,
        accountNum:req.body.accountNum,
        fileAddress:req.body.fileAddress,
        fileCity:req.body.fileCity,
        fileState:req.body.fileState,
        fileCountry:req.body.fileCountry,
        fileZip:req.body.fileZip,
        filePrice:req.body.filePrice,
        documentPath:req.file.path        
    });

    newUser.save((err,User) =>{
         if(err){
            res.status(500).json({errmsg:err});
        }
        else{
            res.status(200).json({msg:User});
        }
    });
        
});

router.put('/update/:id',(req, res, next) => {
    
    User.findById(req.params.id, (err,user) => {
        if(err)
         res.status(500).json({ errmsg:err});
         
         user.firstName = req.body.firstName;
         user.lastName = req.body.lastName;
         user.email = req.body.email;
         user.routingNum = req.body.routingNum;
         user.accountNum = req.body.accountNum;
         user.fileAddress = req.body.fileAddress;
         user.fileCity = req.body.fileCity;
         user.fileState = req.body.fileState;
         user.fileZip = req.body.fileZip;
         user.filePrice = req.body.filePrice;
         user.documentPath = req.file.path; 
         
         user.save((err, user) => {
             if(err){
                res.status(500).json({ errmsg:err}); 
             }else{
                res.status(200).json({msg:user});
             }
         });
    })
});

router.delete('/delete/:id',(req, res, next) => {
    User.findOneAndRemove(req.params.id, (err, user) => {
        if(err){
            res.status(500).json({ errmsg:err});     
        }else{
            res.status(200).json({msg:user});
        }
    });
});

router.post('/stripeCharge', (req,res,next) => {
    console.log(req.body.token);
    console.log(req.body.amount);
   
      let amount = req.body.amount;
      let desc = req.body.fName;
      
        stripe.customers.create({
           email: req.body.token.email,
          source: req.body.token.id          
        })
        .then(customer =>
          stripe.charges.create({
            amount,
            description: desc,
               currency: "usd",
               customer: customer.id,
               receipt_email: req.body.token.email               
          }, function(err, charge) {
            // asynchronously called
            if(err)
                {
                    res.status(500).json({ errmsg:err}); 
            switch (err.type) {
                case 'StripeCardError':
                  // A declined card error
                  err.message; // => e.g. "Your card's expiration year is invalid."
                  break;
                case 'RateLimitError':
                  // Too many requests made to the API too quickly
                  break;
                case 'StripeInvalidRequestError':
                  // Invalid parameters were supplied to Stripe's API
                  break;
                case 'StripeAPIError':
                  // An error occurred internally with Stripe's API
                  break;
                case 'StripeConnectionError':
                  // Some kind of error occurred during the HTTPS communication
                  break;
                case 'StripeAuthenticationError':
                  // You probably used an incorrect API key
                  break;
                default:
                  // Handle any other types of unexpected errors
                  break;
              }
            }
            else
                {
                    res.status(200).json({msg:'success'});
                }
          })        
        );
        
});

module.exports = router;