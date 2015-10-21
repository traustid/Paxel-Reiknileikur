define(function(require){

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');

	return Backbone.Model.extend({
		getTotalNumber: function() {
			var totalNumber = 0;
			_.each(this.get('numbers'), function(number) {
				totalNumber += number;
			});

			return totalNumber;
		}
	});
});