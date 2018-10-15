const express = require('express');
const router = express.Router();
const User = require('../models/dataSchema');
  

router.get('/allusers', function(req,res){
    console.log('Get Request for all users');
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

router.get('/users/:id', function(req,res){
    console.log('Get Request for single user');
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

router.post('/create',(req, res, next) => {
    var newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        routingNum:req.body.routingNum,
        accountNum:req.body.accountNum
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

module.exports = router;