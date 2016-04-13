var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
	facebookID: String,
    token: String,
    username: String,
    displayName: String,
    photo: String
});
var answerSchema = new Schema({
	author:String,
	photo:String,
	answer:String,
	votes:Number,
	date:String
});
var questionSchema = new Schema({
	author:String,
	photo:String,
	question:String,
	answers:[answerSchema],
	date:String,
	category:String
});

module.exports.User = mongoose.model('User', userSchema);
module.exports.Answer = mongoose.model('Answer', answerSchema);
module.exports.Question = mongoose.model('Question', questionSchema);