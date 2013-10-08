define(['app', 'GoogleMap', 'jquery', 'jqplot'], function (app, GoogleMap, $) {
	'use strict';
	return app.controller('TestCtrl', ['$scope',
			function($scope){
				console.log("Starting controller TestCtrl");
				$scope.greeting="Hola!";

				$("#output").html("Yeah");

				var mapEl = document.getElementById('map');
				new GoogleMap(mapEl);

				$.jqplot('plot',  [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]]);
			}
		]).controller('BikeCtrl', ['$scope','dataService',
			function($scope, dataService){
				console.log("Starting controller BikeCtrl");
				var mapEl = document.getElementById('bikeMap');
				var map = new GoogleMap(mapEl, {
					center: new google.maps.LatLng(45.55, -73.5667),
					zoom: 11,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});
				
				/*$scope.myMarkers = [];

				$scope.mapOptions = {
				  center: new google.maps.LatLng(45.56, -73.5643),
				  zoom: 15,
				  mapTypeId: google.maps.MapTypeId.ROADMAP
				};*/


				var promise = dataService.getBikes();
				promise.then(function(stations){
					console.log(stations.length + " received");
					angular.forEach(stations, function(station, idx){
						map.addMarker(
							new google.maps.LatLng(station.LAT, station.LONG)
						);
					});
				});
			}
		]);

});