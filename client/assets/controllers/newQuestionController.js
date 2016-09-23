app.controller('newQuestionController', ['$scope','$http', 'userFactory','questionFactory', '$location', function($scope, $http, userFactory, questionFactory, $location){

	userFactory.current_user(function(user){
		$scope.current_user = user;
	});
	//post new question
	$scope.create = function(){
		$scope.error = "";
		if ($scope.question == undefined || $scope.question.question == undefined || $scope.question.question.length < 10) {
			$scope.error = "Please enter a question longer than 10 characters.";
		}else{
			questionFactory.create($scope.question, function(){
				$location.url('/dashboard');			
			});
		}
	}
}]);