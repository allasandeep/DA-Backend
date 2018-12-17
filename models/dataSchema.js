var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
       // filePath:{type:String},
        firstName:{type:String},
        lastName:{type:String},
        email:{type:String},
        routingNum:{type:String},
        accountNum:{type:String},
        fileAddress:{type:String},
        fileCity:{type:String},
        fileState:{type:String},
        fileCountry:{type:String},
        fileZip:{type:String},
        filePrice:{type:String},
        documentPath: {type:String}       
});

module.exports = mongoose.model('user', usersSchema, 'users');