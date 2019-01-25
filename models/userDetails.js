var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var usersDetails = mongoose.Schema({
       // filePath:{type:String},
        email:{type:String, require:true},
        username:{type:String, require:true},
        password:{type:String,require:true},
        creation_dt:{type:Date, require:true} 
});

usersDetails.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

usersDetails.methods.isValid = function(hashedpassword){
    return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('userDetails', usersDetails, 'userDetails');