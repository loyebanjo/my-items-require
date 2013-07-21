define(
	[
		'jquery',
		'lodash',
		'backbone'
	],
	function($, _, Backbone) {

	var ItemModel = Backbone.Model.extend({

		defaults : {
			'id' : null,
			'item_name'          : '',
			'item_type'             : '',
			'item_description' : ''
		},

		urlRoot : 'php/items.php',

		url : function() {
			var item_name = this.get('item_name');
			var item_type = this.get('item_type');
			var item_description = this.get('item_description');

			if(this.isNew()) {
				return this.urlRoot + '?' + 'item_name=' + item_name + '&item_type=' + item_type + '&item_description=' + item_description;
			}

			var id = this.get('id');

			return this.urlRoot + '?' + 'id=' + id + '&item_name=' + item_name + '&item_type=' + item_type + '&item_description=' + item_description;
		}

	}); 

	return ItemModel;
});
