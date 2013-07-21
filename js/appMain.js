
require(
	[
		 'jquery', 
		 'lodash', 
		 'backbone', 
		 'tpl', 
		 'views/buttonsView', 
		 'views/itemName', 
		 'views/itemType', 
		 'views/itemDataDetails', 
		 'views/itemFormDetails', 
		 'views/mainItemDetailsView', 
		 'models/itemModel', 
		 'collections/itemCollection'
	 ], 
	function($, _, Backbone, tpl, ButtonsView, ItemNameList, ItemTypeList, ItemDataDetails, ItemFormDetails, MainItemDetailsView, ItemModel, ItemCollection) {
		/*  A global variable that  */
		app = (function() {
			var _detailsModel, _itemsCollection, _router;

			var init = function() {
				var Router = Backbone.Router.extend({
						routes : {
							'items/:id' : 'showItem',
							'item/delete' : 'deleteItem'
						},

						showItem : function(id) {
							var item = _itemsCollection.get(id);
							item.fetch({
								success : function(model, response) {
									new ItemDataDetails({ model : model }).render();
									_detailsModel = item;
									window.history.back();
								},
								error : function(model, response) {
									alert('Server was not able to return the model with id = ' + id);
								}
							});
						},

						deleteItem : function() {
							$('div.rightside').find('div.property-value').remove();
							$('div.rightside').find('div.property-description').remove();

							if(!_itemsCollection.hasQueryOccurred) {
								_itemsCollection.fetch({reset : true});
							}

							window.history.back();
						}
				});

				_router = new Router();
				Backbone.history.start();

				tpl.loadTemplates(['itemName', 'itemType', 'itemDataDetails', 'itemFormDetails', 'buttons'], function(){
					_itemsCollection = new ItemCollection();
					new ButtonsView().render();
				});
			};

			return  {
				initialize : function() {
					init();
				},

				setItemDetailsModel : function( model ) {
					_detailsModel = model;
				},

				getItemDetailsModel : function() {
					return _detailsModel;
				},
				
				getItemsCollection : function() {
					return _itemsCollection;
				},
				
				getRouter : function() {
					return _router;
				}
			};

		}());

		/*  Initialize the item components, collections, and models */
		app.initialize();
	}
);
