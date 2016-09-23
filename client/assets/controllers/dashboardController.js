app.controller('dashboardController', ['$scope','$http', 'userFactory','questionFactory', '$location', function($scope, $http, userFactory, questionFactory, $location){

	userFactory.current_user(function(user){
		$scope.current_user = user;
	});

	function updateScope(){
		questionFactory.index(function(questions){
			$scope.questions = questions;
		});
	}
	updateScope();
}]);