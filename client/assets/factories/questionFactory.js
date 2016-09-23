app.factory('questionFactory', ['$http', function($http){
	var questions = {};
	questions.index = function(callback){
		$http({
			url: '/questions',
			method: 'GET'
		}).then(function(res){
			callback(res.data);
		});
	},
	questions.show = function(id, callback){
		$http({
			url: '/questions/' + id,
			method: 'GET'
		}).then(function(res){
			callback(res.data);
		});
	}
	questions.create = function(question, callback){
		$http({
			url: '/questions',
			method: 'POST',
			data: question
		}).then(callback);
	}
	return questions;
}]);