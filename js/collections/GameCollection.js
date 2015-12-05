define(function(require){

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');

	var GameModel = require('models/GameModel');

	return Backbone.Collection.extend({
		model: GameModel,

		initialize: function() {
			this.reset([
				{
					"level": "easy",
					"numbers": [
						5
					]
				},
				{
					"level": "easy",
					"numbers": [
						4
					]
				},
				{
					"level": "easy",
					"numbers": [
						5
					]
				},
				{
					"level": "easy",
					"numbers": [
						3
					]
				},
				{
					"level": "easy",
					"numbers": [
						6
					]
				},

				{
					"level": "medium",
					"numbers": [
						3,
						3
					]
				},
				{
					"level": "medium",
					"numbers": [
						3,
						2,
						1
					]
				},
				{
					"level": "medium",
					"numbers": [
						2,
						3
					]
				},
				{
					"level": "medium",
					"numbers": [
						1,
						2,
						3
					]
				},
				{
					"level": "medium",
					"numbers": [
						2,
						4
					]
				},
				{
					"level": "medium",
					"numbers": [
						3,
						1,
						3
					]
				},
				{
					"level": "medium",
					"numbers": [
						4,
						2,
						1
					]
				},
				{
					"level": "medium",
					"numbers": [
						4,
						3
					]
				},

				{
					"level": "hard",
					"numbers": [
						6,
						2
					]
				},
				{
					"level": "hard",
					"numbers": [
						5,
						2
					]
				},
				{
					"level": "hard",
					"numbers": [
						4,
						3
					]
				},
				{
					"level": "hard",
					"numbers": [
						6,
						4
					]
				},
				{
					"level": "hard",
					"numbers": [
						6,
						3
					]
				},
				{
					"level": "hard",
					"numbers": [
						6,
						1
					]
				},
				{
					"level": "hard",
					"numbers": [
						4,
						1
					]
				},
				{
					"level": "hard",
					"numbers": [
						5,
						1
					]
				}
			]);
		},

		byLevel: function(level) {
			return this.filter(function(model) {
				return model.get('level') == level;
			})
		}
	});
});