var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');

module.exports = {
	index: function(req,res){
		Question.find({})
		.populate('_user')
		.exec(function(err,questions){
			if (err) {
				console.log(err);
			}else{
				console.log(questions);
				res.json(questions);
			}
		});
	},
	show: function(req,res){
		Question.findOne({_id: req.params.id}).populate({path: 'answers', populate:[{path: '_user', model: 'User'}]}).exec(function(err,question){
			if (err) {
				console.log("error in finding question");
			}else{
				console.log("found question");
				console.log(question);
				req.session.question = question;
				res.json(question);
			}
		});
	},
	create: function(req,res){
		var user_id = req.session.user._id;
		req.body._user = user_id;
		var question = new Question(req.body);
		question.save(function(err,topic){
			if (err) {
				console.log("error submitting:" + err);
				res.sendStatus(500);
			}else{
				User.update({_id: user_id}, {$push:{"_question": question}}, function(err,user){
					if (err) {
						console.log("error updating user:" + err);
						res.sendStatus(500);
					}else{
						res.sendStatus(200);		
					}
				});
			}
		});
	}
}