define(function(require){

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');

	var Game = require('views/Game');

	return Backbone.View.extend({
		initialize: function() {
			window.game = new Game({
				el: $('#appView')
			});
		}
	});
});