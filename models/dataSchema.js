var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
        firstName:{type:String},
        lastName:{type:String},
        email:{type:String},
        routingNum:{type:Number},
        accountNum:{type:Number}
});

module.exports = mongoose.model('users', usersSchema );