define(['app'], function (app) {
	'use strict';
 
	return app.controller('MainCtrl', ['$scope',
			function($scope){
				$scope.greeting="Hola!";
			}
	]);

});