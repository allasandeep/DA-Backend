var express = require('express');
var router = express.Router();
var Users = require('../models/dataSchema');


router.post('/create',(req, res, next) => {
    var newUsers = new Users({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        routingNum:req.body.routingNum,
        accountNum:req.body.accountNum
    });

    newUsers.save((err,Users) =>{
         if(err)
         res.status(500).json({ errmsg:err});
         res.status(200).json({msg:Users});
    });
        
});

router.get('/read',(req, res, next) => {
    Users.find({},(err,allusers) =>{
        if(err)
         res.status(500).json({ errmsg:err});
         res.status(200).json({msg:allusers});
    });
});

router.put('/update',(req, res, next) => {
    
    Users.findById(req.body._id, (err,users) => {
        if(err)
         res.status(500).json({ errmsg:err});
         users.firstName = req.body.firstName;
         users.lastName = req.body.lastName;
         users.email = req.body.email;
         users.routingNum = req.body.routingNum;
         users.accountNum = req.body.accountNum;
         users.save((err, users) => {
             if(err)
            res.status(500).json({ errmsg:err});           
            res.status(200).json({msg:users});
         });
    })
});

router.delete('/delete/:id',(req, res, next) => {
    Users.findOneAndRemove({_id:req.params.id}, (err, users) => {
        if(err)
        res.status(500).json({ errmsg:err});       
        res.status(200).json({msg:users});
    });
});

module.exports = router;