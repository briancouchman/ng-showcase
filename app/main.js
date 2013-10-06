require.config({
	baseUrl: "scripts",
	paths: {
		angular: '../bower_components/angular/angular',
		angularRoute: '../bower_components/angular-route/angular-route',
		angularMocks: '../bower_components/angular-mocks/angular-mocks',
		jquery: '../bower_components/jquery/jquery',
		'domReady' : '../bower_components/requirejs-domready/domReady',
		'async' : '../bower_components/requirejs-plugins/src/async',
		'GoogleMap' : '../bower_components/requirejs-google-maps/dist/GoogleMap',
		'jqplot' : '../bower_components/jqplot/jquery.jqplot',
		'bootstrap' : '../bower_components/bootstrap/dist/js/bootstrap'
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		},
		'jqplot': {
			deps:['jquery'],
			'exports':'jqplot'
		},
		'bootstrap': {
			deps:['jquery'],
			'exports':'bootstrap'
		}
	},
	priority: [
		"angular"
	]
});

require(['jquery', 'bootstrap'], function($){
	$("#output").html("Yeah");
});


require( ['angular','app','controllers','routes'], function(angular, app, routes) {
	'use strict';
	angular.bootstrap(document, ['showcase']);
});


 require(['GoogleMap', 'domReady!'], function(GoogleMap) {
    var mapEl = document.getElementById('map');
    return new GoogleMap(mapEl);
 });

 require(['jquery', 'jqplot'], function($jq){
	$jq.jqplot('plot',  [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]]);
 });

