define(
	[
		'jquery',
		'lodash',
		'tpl',
		'backbone'
	],
	function($, _, tpl, Backbone) {

	var MainItemDetailsView = Backbone.View.extend({

		el : 'div.rightside',

		initialize : function(htmlText) {
			this.htmlText = htmlText;
			this.template = _.template( tpl.getTemplate( htmlText ) );
		},

		render : function() {
			this.$el.html( this.template( this.model.toJSON() ) );

			if(this.htmlText === 'itemFormDetails') {
				this.$el.find('#item_name_text').focus();
			}

			return this.el;
		}

	});

	return MainItemDetailsView;
});
