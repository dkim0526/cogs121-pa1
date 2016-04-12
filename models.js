var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
	facebookID: String,
    token: String,
    username: String,
    displayName: String,
    photo: String
});

module.exports.User = mongoose.model('User', userSchema);