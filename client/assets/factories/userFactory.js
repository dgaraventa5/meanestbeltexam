app.factory('userFactory', ['$http', function($http){
	var users = {};
	users.index = function(callback){
		$http({
			url: '/users',
			method: 'GET'
		}).then(function(res){
			callback(res.data);
		});
	}
	users.register = function(user,callback,error){
		$http({
			url: '/users',
			method: 'POST',
			data: user
		}).then(callback,error);
	}
	users.login = function(user,callback,error){
		$http({
			url: '/login',
			method: 'POST',
			data: user
		}).then(callback,error);
	}
	users.current_user = function(callback){
		$http({
			url: '/current_user',
			method: 'GET'
		}).then(function(res){
			callback(res.data.user);
		});
	}
	return users;
}]);