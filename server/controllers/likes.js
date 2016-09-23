var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');
var Like = mongoose.model('Like');

module.exports = {
	like_answer: function(req,res){
		var user_id = req.session.user._id;
		var answer_id = req.params.id;
		console.log("user id:" + user_id);
		console.log("answer id:" + answer_id);
		req.body._user = user_id;
		req.body._answer = answer_id;
		var like = new Like(req.body);
		like.save(function(err,like){
			if (err) {
				console.log("error submitting:" + err);
				res.sendStatus(500);
			}else{
				User.update({_id: user_id}, {$push:{"likes": like}}, function(err, user){
					if (err) {
						console.log("error adding to user");
						res.sendStatus(500);
					}else{
						Answer.update({_id: answer_id}, {$push:{"likes": like}}, function(err,answer){
							if (err){
								console.log("error adding to answer");
								res.sendStatus(500);
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