app.factory('answerFactory', ['$http', function($http){
	var answers = {};

	answers.create = function(id, answer, callback){
		$http({
			url: '/answers/' + id,
			method: 'POST',
			data: answer
		}).then(callback);
	}
	answers.likeAnswer = function(id){
		$http({
			url: '/like_answer/' + id,
			method: 'POST'
		});
	}
	return answers;
}]);