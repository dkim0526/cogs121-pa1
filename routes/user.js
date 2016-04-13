var models = require("../models");

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

  models.user.find().exec(renderUser);
  function renderUser(err, user){
        if(err) console.log(err);

        console.log(user);
        console.log('picture ', user[0].picture);
        res.render("test", {users: user});
  }
  // user.save((err) => {
  //   (err) ? res.send(err) : res.redirect('/');
  // });
};