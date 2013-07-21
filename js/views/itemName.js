define(
	[
		'jquery',
		'lodash',
		'tpl',
		'backbone',
		'views/itemDataDetails'
	],
	function($, _, tpl, Backbone, ItemDataDetails) {

	var ItemNameList = Backbone.View.extend({

		tagName : 'ul',

		id : 'itemnames',

		className : 'itemdata',

		initialize : function() {
			this.model.on('add', this.addNewItem, this);
			this.model.on('destroy', this.render, this);

			/* 'queryOccurred' is a custom event */
			this.model.on('queryOccurred', this.render, this);
		},

		addNewItem : function ( newItem ) {
			this.$el.append( new ItemNameListItem({ model : newItem }).render() );
		},

		render : function() {
			var me = this;

			this.$el.find('li').remove();

			var _model = this.model.queriedModels ? this.model.queriedModels : this.model.models;

			if(this.model) {
				_.each(_model, function( item ){
					me.addNewItem( item );
				}, this);
			}

			return this.el;
		}

	});

	var ItemNameListItem = Backbone.View.extend({

		tagName : 'li',

		className : 'listItem',

		events : {
			'click' : 'renderItemData'
		},

		initialize : function() {
			this.template = _.template( this.getListItemTemplate() );
		},

		getListItemTemplate : function() { 
			return tpl.getTemplate( 'itemName' );
		},

		renderItemData : function () {
			var textValue = this.$el.find('span').text();

			if(textValue) {
				var button = $.find('#saveItem')[0];

				if(button.innerText !== 'Update Item') {
					button.innerHTML = 'Update Item';
				}

				new ItemDataDetails({ model : this.model }).render();

				app.setItemDetailsModel( this.model );
			}
		},

		render : function() {
			this.$el.html( this.template( this.model.toJSON() ) );

			return this.el;
		}

	});

	return ItemNameList;
});