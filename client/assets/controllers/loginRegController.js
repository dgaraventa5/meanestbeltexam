app.controller('loginRegController', ['$scope','userFactory', '$location', function($scope, userFactory, $location){
	function updateScope(){
		userFactory.index(function(users){
			$scope.users = users;
		});
	}

	$scope.register = function(){
		console.log($scope.user)
		$scope.errors = [];
		if ($scope.user == undefined || $scope.user.username == undefined || $scope.user.username == "") {
			$scope.errors.push("Please enter a username");
		}
		if ($scope.user == undefined || $scope.user.password == undefined || $scope.user.password == "") {
			$scope.errors.push("Please enter a password");
		}
		if ($scope.user == undefined || $scope.user.password_confirmation == undefined || $scope.user.password_confirmation != $scope.user.password) {
			$scope.errors.push("Please confirm your password");
		}
		if ($scope.errors.length == 0) {
			userFactory.register($scope.user, function(){
				$location.url('/dashboard');
			},
			function(){
				$scope.errors.push("Incorrect password or user doesn't exist.");
			});
		}
	}

	$scope.login = function(){
		$scope.loginErrors = [];
		if ($scope.loginUser == undefined || $scope.loginUser.username == undefined || $scope.
			loginUser.username == "") {
			$scope.loginErrors.push("Please enter a username");
		}
		if ($scope.loginUser == undefined || $scope.loginUser.password == undefined || $scope.loginUser.password == "") {
			$scope.loginErrors.push("Please enter a password");
		}
		if ($scope.loginErrors.length == 0) {
			userFactory.login($scope.loginUser, function(){
				$location.url('/dashboard');
			},
			function(){
				$scope.loginErrors.push("Incorrect password or user doesn't exist.");
			});
		}
	}
}]);