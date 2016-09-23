var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider, $httpProvider){
	$httpProvider.interceptors.push(
        function($q, $location) {
        return {
            'responseError':function(rejection){
            if (rejection.status == 401){
                $location.url('/login');
            }
            return $q.reject(rejection);
        }
        };
    });
	$routeProvider
	.when('/',{
		templateUrl: 'partials/loginreg.html',
		controller: 'loginRegController'
	})
	.when('/dashboard',{
		templateUrl: 'partials/dashboard.html',
		controller: 'dashboardController'
	})
	.when('/new_question',{
		templateUrl: 'partials/new_question.html',
		controller: 'newQuestionController'
	})
	.when('/questions/:id/new_answer',{
		templateUrl: 'partials/new_answer.html',
		controller: 'newAnswerController'
	})
	.when('/questions/:id',{
		templateUrl: 'partials/show_question.html',
		controller: 'showQuestionController'
	})
	.otherwise({
		redirectTo: '/'
	});
});