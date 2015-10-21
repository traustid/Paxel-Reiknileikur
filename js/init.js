requirejs.config({
	urlArgs: "bust=" + (new Date()).getTime(),
	baseUrl: 'js/',
	paths: {
		jquery: 'lib/jquery.min',				
		backbone: 'lib/backbone-min',
		underscore: 'lib/underscore-min',
		pathanimator: 'lib/pathAnimator',
		svgpath: 'lib/svgpath',
		a2c: 'lib/svgpath/a2c',
		matrix: 'lib/svgpath/matrix',
		path_parse: 'lib/svgpath/path_parse',
		transform_parse: 'lib/svgpath/transform_parse'
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery'],
			exports: 'Backbone'
		},

		'underscore': {
			exports: '_'
		},

		'jquery': {
			exports: '$'
		},

		'svgpath': {
			deps: [
				'a2c', 
				'matrix', 
				'path_parse',
				'transform_parse'
			]
		}
	}
});

require(['js/views/AppView.js'],function(AppView) {
	$(function() {
		var appView = new AppView();
	});
});
