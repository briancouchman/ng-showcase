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
		'jqplot' : '../jqplot.module',
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

require( ['angular','app','controllers','routes','services/data-service'], function(angular, app, routes, dataService) {
	'use strict';
	angular.bootstrap(document, ['showcase']);
});

