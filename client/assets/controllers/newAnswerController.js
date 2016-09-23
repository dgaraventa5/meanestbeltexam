app.controller('newAnswerController', ['$routeParams','$scope','$http', 'userFactory','questionFactory', 'answerFactory','$location', function($routeParams, $scope, $http, userFactory, questionFactory, answerFactory, $location){

	userFactory.current_user(function(user){
		$scope.current_user = user;
	});
	questionFactory.show($routeParams.id, function(question){
		$scope.question = question;
	});

	//post new question
	$scope.create = function(){
		$scope.error = "";
		if ($scope.answer == undefined || $scope.answer.answer == undefined || $scope.answer.answer.length < 5) {
			$scope.error = "Please enter an answer longer than 5 characters.";
		}else{
			answerFactory.create($routeParams.id, $scope.answer, function(){
				$location.url('/dashboard');			
			});
		}
	}
}]);