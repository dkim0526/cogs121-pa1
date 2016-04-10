var models = require("../models");

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
