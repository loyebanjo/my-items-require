define(
	[
		'jquery',
		'lodash',
		'tpl',
		'backbone'
	],
	function($, _, tpl, Backbone) {

	var ItemTypeList = Backbone.View.extend({

		tagName : 'ul',

		id : 'itemtypes',

		className : 'itemdata',

		initialize : function() {
		},

		addNewItem : function( newItem ) {
			this.$el.append( new ItemTypeListItem({ model:newItem }).render() );
		},

		render : function() {
			var me = this;

			this.$el.find('li').remove();

			if(this.model) {
				_.each(this.model.models, function( newItem ) {
					me.addNewItem( newItem );
				}, this);
			}

			return this.el;
		}

	});

	var ItemTypeListItem = Backbone.View.extend({

		tagName : 'li',

		className : 'listItem',

		events : {
			'click' : 'renderItemNameList'
		},

		initialize : function() {
			this.template = _.template( this.getListItemTemplate() );
		},

		getListItemTemplate : function() {
			return tpl.getTemplate( 'itemType' );
		},

		renderItemNameList : function() {
			var textValue = this.$el.find('span').text();

			var itemCollection = app.getItemsCollection();

			itemCollection.resetItemNameList( textValue );

			return false;
		},

		render : function() {
			var me = this;

			if(this.model) {
				this.$el.html( me.template( me.model.toJSON() ) );
			}

			return this.el;
		}

	});

	return ItemTypeList;
});
