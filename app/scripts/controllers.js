define(['app', 'gmaps', 'jquery', 'jqplot', 'd3'], function (app, GMaps, $) {
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
				var map = new GMaps({
					el: 'bike_map',
					lat: 45.55, 
					lng: -73.5667,
					zoom: 10,
					enableNewStyle: true,
					markerClusterer: function(map) {
						return new MarkerClusterer(map, [], {
							maxZoom: 12
						});
					}
				});
				/*var mapEl = document.getElementById('bikeMap');
				var map = new GMap(mapEl, {
					center: new google.maps.LatLng(45.55, -73.5667),
					zoom: 11,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				});
				*/
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
						map.addMarker({
							lat: station.LAT, 
							lng: station.LONG
						});
					});
				});
			}

		]).controller('LastFMCtrl', ['$scope', 'lastfmService', 
			function($scope, lastfmService){
				var artist;


				var getFirstMatchingArtist = function(){
					var promise = lastfmService.getArtistsByName({name: $scope.artist});
					return promise.then(function(data){
						var artists = data.results.artistmatches.artist;

						console.log("%s artists matched", artists.length);

						//var firstArtist = null;
						angular.forEach(artists, function(_artist, idx){
							if(artist == null){
								console.log(_artist);
								if(_artist.mbid != "" && _artist.name != "Undefined"){
									artist = _artist;
								}
							}
						});
						console.log("Pickin first : %s [%s]", artist.name, artist.mbid);
					});
				}

				var getSimilarArtists = function(){
					var promise = lastfmService.getSimilarsById({mbid: artist.mbid});
					promise.then(function(data){
						var similars = data.similarartists.artist;
						console.log("Similar:");
						angular.forEach(similars, function(similar, idx){
							console.log("%s [%s]", similar.name, similar.mbid);
						});

						buildPlot(buildSimilarTree(artist.name, similars))
					});
				}


				var buildSimilarTree = function(root, similars){
					var tree = {
						name: root,
						children: []
					};
					
					angular.forEach(similars, function(similar, idx){
						tree.children.push({name: similar.name});
					});
					
					return tree
				};



				var buildPlot = function(json){

					//build style
					var radius = 800 / 2;

					var cluster = d3.layout.cluster()
						.size([360, radius - 120]);

					var diagonal = d3.svg.diagonal.radial()
						.projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

					var svg = d3.select("#similar_tree").html("").append("svg")
						.attr("width", radius * 2)
						.attr("height", radius * 2)
					  .append("g")
						.attr("transform", "translate(" + radius + "," + radius + ")");

					//build tree
					
						var nodes = cluster.nodes(json);

						var link = svg.selectAll("path.link")
							.data(cluster.links(nodes))
							.enter().append("path")
							.attr("class", "link")
							.attr("d", diagonal);

						var node = svg.selectAll("g.node")
							.data(nodes)
							.enter().append("g")
							.attr("class", "node")
							.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

						node.append("circle")
							.attr("r", 4.5);

						node.append("text")
							.attr("dy", ".31em")
							.attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
							.attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
							.text(function(d) { return d.name; });
				}

				$scope.similar = function(){
					artist = null;
					getFirstMatchingArtist().then(getSimilarArtists);
				}
			
			}
		]);

});