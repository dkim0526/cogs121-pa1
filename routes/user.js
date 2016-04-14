var models = require("../models");
var mongoose = require('mongoose');

exports.send = function(req, res) {
  //console.log(req.body); 
  // help you see what is inside of req.body
    // your solution here
  // var user = new models.user({
  //   facebookID: profile.facebookID,
  //   displayName: profile.displayName,
  //   token: profile.token,
  //   username: profile.username,
  //   picture: profile.picture 
  // });
console.log("TESTING MESSAGE FILE123");
  
  
  models.user.find().exec(renderUser);
  function renderUser(err, user){
    models.Question.find().exec(renderMessage);
      function renderMessage(err, messages){
        console.log("TESTING MESSAGE FILE");
          if(typeof(messages) == 'undefined'){
              messages = [];
          }else{
              var counter = 0;
              var array = new Array(messages.length);
              for(var i = 0; i < messages.length-1; i++){
                  for(var j = messages[i].answers.length - 1; j >= 0; j--){
                      array[counter] = messages[i].answers[j];
                      counter++;
                      if(j == 0){
                          messages[i].answers = array;
                      }
                  }
                  counter = 0; 
              }
              counter = 0;
              var array2 = new Array(messages.length);
              for(var i = messages.length-1; i >= 0 ; i--){
                  array2[counter] = messages[i];
                  counter++;
              }    
              messages = array2;
              res.render("test", {users: user, questions: messages });
          }
        }

        console.log(user);
        console.log("EHELEJWEOJWOEPJQEPJWEOQPJEPJJW");
        console.log('picture ', user[0].picture);
  }
  // user.save((err) => {
  //   (err) ? res.send(err) : res.redirect('/');
  // });
};