define(function(require){

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');

	var GameModel = require('models/GameModel');

	return Backbone.Collection.extend({
		url: 'gamedata.json',

		model: GameModel,

		initialize: function() {
			this.fetch({
				reset: true
			});
		},

		byLevel: function(level) {
			return this.filter(function(model) {
				return model.get('level') == level;
			})
		}
	});
});