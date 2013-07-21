define(
	[
		'jquery', 
		'lodash'
	],
	function($, _) {

	var tpl = {

		templates : {},

		loadTemplates : function(names, callback) {
			var me = this;

			var nameSize = names.length;

			var index = 0;

			_.each(names, function(name) {
				$.get('tpl/' + name + '.html', function(data) {
					me.templates[name] = data;

					if(index === nameSize - 1) {
						callback();
					}

					index++;
				});
			});
		},

		getTemplate : function(name) {
			return this.templates[name];
		}

	};

	return tpl;
});
