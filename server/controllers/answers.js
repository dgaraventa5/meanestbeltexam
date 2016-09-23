var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');

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
	create: function(req,res){
		var user_id = req.session.user._id;
		var question_id = req.session.question._id;
		console.log("question_id = " + question_id);
		console.log("req: " + req);
		req.body._user = user_id;
		req.body._question = question_id;
		var answer = new Answer(req.body);
		answer.save(function(err,answer){
			if (err) {
				console.log("error submitting:" + err);
				res.sendStatus(500);
			}else{
				User.update({_id: user_id}, {$push:{"answers": answer}}, function(err,user){
					if (err) {
						console.log("error updating user:" + err);
						res.sendStatus(500);
					}else{
						Question.update({_id: question_id}, {$push:{"answers": answer}}, function(err,question){
							if (err) {
								console.log("error updating question: " + err);
							}else{
								res.sendStatus(200);	
							}
						});
					}
				});
			}
		});
	}
}