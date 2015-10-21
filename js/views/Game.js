define(function(require){

	var Backbone = require('backbone');
	var _ = require('underscore');
	var $ = require('jquery');
	require('pathanimator');
	require('path_parse');
	SvgPath = require('svgpath');

	var GameCollection = require('collections/GameCollection');

	return Backbone.View.extend({
		rendered: false,

		initialize: function() {
			_.each(this.$el.find('.game-menu .menu-item'), _.bind(function(menuItem) {
				$(menuItem).click(_.bind(function() {
					this.gameLevel = $(menuItem).data('level');
					this.startGame();
				}, this));
			}, this));

			this.startApp();
		},

		startApp: function() {
			this.collection = new GameCollection();
		},

		startGame: function() {
			this.gameIsDone = false;
			console.log('byLevel.length = '+this.collection.byLevel(this.gameLevel).length);
			this.currentGameIndex = Math.floor(Math.random()*this.collection.byLevel(this.gameLevel).length);
			console.log('currentGameIndex = '+this.currentGameIndex);
			this.currentGame = this.collection.byLevel(this.gameLevel)[this.currentGameIndex];

			this.$el.addClass('initialized');

			this.render();
		},

		events: {
			'click .restart-button': 'restartButtonClick',
			'click .solution-check-button': 'solutionCheckButtonClick',
			'click .math-problem .solution-check': 'solutionCheckButtonClick',
			'mousemove': 'mouseMoveHandler',
			'click .symbols .symbol .hook': 'symbolMouseHandler'
		},

		appSize: {
			width: 1200,
			height: 898
		},

		checkSolution: function() {
			var symbolsCount = this.threadContainer.find('.symbol').length;

			var gameLevel = this.currentGame.get('level');

			if (gameLevel == 'easy') {
				if (symbolsCount == this.currentGame.get('numbers')[0]) {
					this.gameDone();
				}
			}
			if (gameLevel == 'medium') {
				if (symbolsCount == this.getSum(this.currentGame.get('numbers'))) {
					this.gameDone();
				}
			}
			if (gameLevel == 'hard') {
				if (symbolsCount == this.getSubtraction(this.currentGame.get('numbers'))) {
					this.gameDone();
				}
			}
		},

		updateSolution: function() {
			var symbolsCount = this.threadContainer.find('.symbol').length;

			if (symbolsCount > 0) {
				this.$el.find('.math-problem .solution-check').addClass('visible');
			}

			this.$el.find('.math-problem .number.result').removeClass('number-added');
			this.$el.find('.math-problem .number.result').text(symbolsCount);
			setTimeout(_.bind(function() {
			this.$el.find('.math-problem .number.result').addClass('with-effects');
				this.$el.find('.math-problem .number.result').addClass('number-added');
				setTimeout(_.bind(function() {
					this.$el.find('.math-problem .number.result').removeClass('with-effects');
				}, this), 500);
			}, this), 10);
		},

		getSum: function(numbers) {
			var sum = 0;
			_.each(numbers, function(number) {
				sum += number;
			});

			return sum;
		},

		getSubtraction: function(numbers) {
			var sum;
			_.each(numbers, function(number) {
				if (sum == null) {
					sum = number;
				}
				else {
					sum -= number;
				}
			});

			return sum;
		},

		gameDone: function() {
			this.$el.addClass('game-done');
			this.gameIsDone = true;
		},

		symbolMouseHandler: function(event) {
			var target = $(event.currentTarget).closest('.symbol');

			this.needle.append(target);
			target.css({
				left: 0,
				top: 0,
				marginTop: -10
			});

			target.animate({
				left: 190
			}, {
				complete: _.bind(function() {
					var path = this.thread.find('path').attr('d');

					var animator = new PathAnimator(path);
					this.threadContainer.append(target);

					var pathEnd = this.thread.find('path')[0].getPointAtLength(this.thread.find('path')[0].getTotalLength()-(50*this.threadContainer.find('.symbol.added').length)-50);

					animator.start(
						0.7,
						_.bind(function(point, angle) {
							if (point.x < pathEnd.x-36) {
								target.css({
									top: point.y-6,
									left: point.x-38
								});
							}
						}, this),
						false,
						0,
						_.bind(function() {
							target.addClass('added');
							this.alignThreadSymbols();
						}, this)
					);
					this.updateSolution();

				}, this)
			});
		},

		mouseMoveHandler: function(event) {
			if (!this.rendered || this.gameIsDone) {
				return;
			}

			var offsetX = 185;
			var offsetY = 75

			this.$el.find('.needle-container .needle').css({
				top: event.clientY+1,
				left: event.clientX+1
			});

			if (event.clientX+offsetX > 0 && event.clientY+offsetY > 0) {
				this.threadContainer.css({
					left: event.clientX+offsetX,
					top: event.clientY+offsetY
				});
			}

			var svgWidth = (this.appSize.width-event.clientX)-offsetX;

			var transformed = SvgPath(this.threadPath).scale(svgWidth/445, 1).toString();

			this.thread.find('path').attr('d', transformed);

			if (svgWidth > 0) {		
				this.thread[0].setAttribute('viewBox', "0 0 "+svgWidth+" 203");
				this.thread.attr('width', svgWidth);
			}

			this.alignThreadSymbols();
		},

		alignThreadSymbols: function() {
			var count = 1;
			var path = this.thread.find('path')[0];
			_.each(this.threadContainer.find('.symbol.added'), _.bind(function(symbol) {
				$(symbol).css({
					left: path.getPointAtLength(path.getTotalLength()-(50*count)-50).x,
					top: path.getPointAtLength(path.getTotalLength()-(50*count)-38).y
				});
				count++;
			}, this));
		},

		solutionCheckButtonClick: function() {
			this.checkSolution();
		},

		restartButtonClick: function() {
			this.$el.removeClass('initialized');
			this.$el.removeClass('game-done');

			setTimeout(_.bind(function() {
				this.startApp();
			}, this), 400);
		},

		render: function() {
			var template = _.template($("#gameTemplate").html(), {
				game: this.currentGame
			});

			this.$el.find('.game-content').html(template);
			this.threadContainer = this.$el.find('.thread-container');
			this.thread = this.$el.find('.thread-container .thread-graphic');
			this.threadPath = this.thread.find('path').attr('d');
			this.solutionContainer = this.$el.find('.solution-container');
			this.needle = this.$el.find('.needle');

			this.rendered = true;
		}
	})
});