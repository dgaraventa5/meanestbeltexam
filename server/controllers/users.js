var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
	register: function(req,res){
		console.log("user to add:");
		console.log(req.body);
		if (req.body.password != req.body.password_confirmation) {
			console.log("over here");
			res.sendStatus(400);
		}else{
			var newUser = new User(req.body);
			newUser.save(function(err,user){
				if (err){
					console.log("error submitting:" + err);
					res.sendStatus(500);
				}else{
					console.log('successfully added');
					req.session.user = user;
					res.send(user);
				}
			});
		}
	},
	login: function(req,res){
		User.findOne({username: req.body.username}).exec(function(err,user){
			if (err) {
				console.log(err);
				res.sendStatus(400);
			}
			if (user.password != req.body.password) {
				res.sendStatus(400);
			}else{
				req.session.user = user;
				console.log(user);
				res.send(user);
			}
		});
	}, 
	logout: function(req,res){
		req.session.user = undefined;
		res.sendStatus(200);
	},
	current_user: function(req,res){
		console.log("session:" + req.session.user);
		res.json({user: req.session.user});
	}
}