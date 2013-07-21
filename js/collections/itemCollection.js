define(
	[
		'jquery',
		'lodash',
		'backbone',
		'models/itemModel',
		'views/itemName',
		'views/itemType'
	],
	function($, _, Backbone, ItemModel, ItemNameList, ItemTypeList) {

	var ItemCollection = Backbone.Collection.extend({

		model : ItemModel,

		url : 'php/items.php',

		initialize : function() {
			this.modelTypeCollection;

			var me = this;

			this.fetch({
				success : function(collection, response, options) {
					me.models = collection.models;
					me.itemNameList = new ItemNameList({ model : me });
					$('div.leftside').append( me.itemNameList.render() );

					// Retrieve all the list item types.
					me.setItemTypeList();
				},
				error : function(collection, response, options) {
					alert('There has been a problem retrieveing data from the server');
				}
			});
		},

		resetItemNameList : function( textValue ) {
			if(textValue !== 'All') {
				this.fetch({reset : true});
				var selectedItems = this.where({ item_type : textValue });
				this.hasQueryOccurred = true;
				this.models = selectedItems;
				this.queriedModels = selectedItems;
				this.itemNameList.model = this;
				this.itemNameList.render();
			}
			else {
				var me = this;
				(function(){
					me.fetch({
						success : function(collection, response) {
							me.models = collection.models;
							me.itemNameList.model = me;
							me.itemNameList.render();
							me.hasQueryOccurred = false;
							me.queriedModels = null;
						}
					});
				}());
			}
		},

		setItemTypeList : function() {
			var me = this;

			this.fetch({
				success : function(collection, response, options) {
					if(me.modelTypeCollection) {
						me.modelTypeCollection.reset();
					}

					var types = [];
					me.modelTypeCollection = new Backbone.Collection();
					me.modelTypeCollection.add([ new ItemModel({ item_type : 'All' }) ]);

					_.each(response, function( _model ) {
						var type = _model.item_type;
						if(!_.contains(types, type)) {
							types.push(type);
							me.modelTypeCollection.add([ new ItemModel({ item_type : type }) ]);
						}
					});

					if(!me.itemTypeList) {
						me.itemTypeList = new ItemTypeList({ model : me.modelTypeCollection });
						$('div.leftside').append( me.itemTypeList.render() );
					}
					else {
						me.itemTypeList.model = me.modelTypeCollection;
						me.itemTypeList.render();
					}
				}
			});
		},

		getModelTypeCollection : function() {
			return this.modelTypeCollection;
		}

	});

	return ItemCollection;
});