define(
	[
		'jquery',
		'lodash',
		'tpl',
		'backbone',
		'models/itemModel',
		'views/itemFormDetails'
	],
	function($, _, tpl, Backbone, ItemModel, ItemFormDetails) {

	var ButtonsView = Backbone.View.extend({

		el : 'div.bottomside',

		events : {
			'click #newItem'     : 'createNewItem',
			'click #saveItem'    : 'saveItem',
			'click #deleteItem'  : 'deleteItem'
		},

		initialize : function () {
			var me = this;
			this.template = _.template( me.getButtonTemplate() );
		},

		getButtonTemplate : function() { 
			return tpl.getTemplate( 'buttons' );
		},

		createItemFormDetails : function(model) {
			this.itemFormDetails = new ItemFormDetails({ model : model });
			this.itemFormDetails.render();
			this.saveButton.text('Save Item');
		},

		createNewItem : function() {
			this.createItemFormDetails( new ItemModel() );
			return false;
		},

		routeItem : function(routePath) {
			var router = app.getRouter();
			router.navigate(routePath, { trigger : true });
		},
		
		getModel : function() {
			var model = this.itemFormDetails.model;
			
			model.set({
				item_name          : $('#item_name_text').val(),
				item_type             : $('#item_type_text').val(),
				item_description : $('#item_description_text').val()
			});
			
			return model;
		},

		saveItem : function() {
			if(this.saveButton.text() === 'Update Item') {
				this.createItemFormDetails( app.getItemDetailsModel() );
			}
			else {
				var model = this.getModel();

				var me = this;

				if(model.isNew()) {
					var itemCollection = app.getItemsCollection();

					itemCollection.create(	model.attributes,
						{
							success : function(model, response) {
								me.routeItem( 'items/' + model.id );
								itemCollection.setItemTypeList();
								app.setItemDetailsModel( model );
							}
						}
					);
				}
				else {
					model.save( model.attributes, 
						{
							success : function(model, response) {
								me.routeItem( 'items/' + model.id );
							}
						} 
					);
				}

				this.saveButton.text('Update Item');
			}

			return false;
		},

		deleteItem : function() {
			var model = app.getItemDetailsModel();

			var me = this;

			model.destroy({
				success : function(model, response) {
					var itemCollection = app.getItemsCollection();

					if(itemCollection.hasQueryOccurred) {
						var index = 0;

						_.each(itemCollection.queriedModels, function( queriedModel ) {
							if(model.get('id') === queriedModel.get('id')) {
								return;
							}
							index++;
						});

						itemCollection.queriedModels.splice(index, 1);

						itemCollection.itemNameList.model.trigger('queryOccurred');
					}

					me.routeItem('item/delete');
				}
			});

			return false;
		},

		render : function() {
			var me = this;

			this.$el.html( me.template() );

			this.saveButton = this.$el.find('#saveItem');

			return this.el;
		}

	});

	return ButtonsView;
});