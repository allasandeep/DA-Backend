var mongoose = require('mongoose');

var countrySchema = mongoose.Schema({
        name:{type:String},
        capital:{type:String}
});

module.exports = mongoose.model('country', countrySchema );