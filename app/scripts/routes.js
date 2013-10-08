define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider', function($routeProvider) {
		console.log("defining routes...");
		
		$routeProvider.when('/test', {
			templateUrl: 'views/main.html',
			controller: 'TestCtrl'
		});

		$routeProvider.when('/bike', {
			templateUrl: 'views/bike.html',
			controller: 'BikeCtrl'
		});
		$routeProvider.otherwise({redirectTo: '/view1'});
		
	}]);

});