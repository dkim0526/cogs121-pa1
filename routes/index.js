var models = require('../models');
var mongoose = require('mongoose');

function getCurrentDate(){
    var d = new Date();
    var dateNum = d.getDate();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var date = month + "/" + dateNum + "/" + year;

    return date.toString();
}
exports.view = function(req, res) {
    // var name = req.body.name;
    // var email = req.body.email;
    // var content = req.body.content;
    // res.render("index", data);
    console.log("THIS IS THE TEST");
    //console.log(name);
    //console.log(email);
    //console.log(content);
    var data = {data: []};
    res.render("index", data);

};


exports.send = function(req, res) {
    var message =  mongoose.model('Question'); //mongoose.model('Message', Message);
    var new_message = new message();
    var date = getCurrentDate();
    new_message.author = (req.body.author)? req.body.author: "Anonymous";
    new_message.photo = req.body.picture;
    new_message.answers = [];
    new_message.question = req.body.question;
    new_message.category = req.body.category;
    new_message.date = date;
    new_message.save(function(err, saved){
        if(err){
        throw err;
            console.log(err);
        }else{
            //console.log(new_message);
            res.redirect("/home");
        }
    });
};

exports.answer = function(req, res) {
     var message =  mongoose.model('Question'); 
     message.findOne({_id: req.body.questionid}, function(err, question){
        if(err){
            throw err;
            console.log(err);
        }else{
            var date = getCurrentDate();
            var answer_schema =  mongoose.model('Answer'); 
            var answer = answer_schema();
            answer.author = (req.body.author)? req.body.author: "Anonymous";
            answer.photo = req.body.photo;

            answer.answer = req.body.answer;
            answer.votes = 0;
            answer.date = date;
            question.answers.addToSet(answer);
            question.save(function(err, saved){
                if(err){
                    throw err;
                    console.log(err);
                }else{
                    //console.log(question);
                    res.redirect("/home");
                }
            });
        }
     });
};

exports.vote = function(req, res){
    console.log(req.body);
    var message =  mongoose.model('Answer'); 
     message.findOne({_id: req.body.answerid}, function(err, answer){
        if(err){
            throw err;
            console.log(err);
        }else{
            answer.votes = Number(req.body.vote);
            answer.save(function(err, saved){
                if(err){
                    throw err;
                    console.log(err);
                }else{
                    //console.log(answer);
                    res.redirect("/home");
                }
            });
        }
     });
}