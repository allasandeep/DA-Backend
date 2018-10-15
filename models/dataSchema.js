var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
       // filePath:{type:String},
        firstName:{type:String},
        lastName:{type:String},
        email:{type:String},
        routingNum:{type:Number},
        accountNum:{type:Number}
});

module.exports = mongoose.model('user', usersSchema, 'users');