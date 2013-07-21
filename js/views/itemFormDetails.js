define(
	[
		'jquery',
		'lodash',
		'backbone',
		'views/mainItemDetailsView'
	],
	function($, _, Backbone, MainItemDetailsView) {

	var ItemFormDetails = MainItemDetailsView.extend({

		initialize : function() {
			MainItemDetailsView.prototype.initialize.call(this, 'itemFormDetails');
		}

	});

	return ItemFormDetails;
});