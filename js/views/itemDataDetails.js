define(
	[
		'jquery',
		'lodash',
		'backbone',
		'views/mainItemDetailsView'
	],
	function($, _, Backbone, MainItemDetailsView) {

	var ItemDataDetails = MainItemDetailsView.extend({

		initialize : function() {
			MainItemDetailsView.prototype.initialize.call(this,  'itemDataDetails');
		}

	});

	return ItemDataDetails;
});
