
require.config({

	deps : ['appMain'],

	baseUrl : 'js',
	
	paths : {
		jquery : 'jquery',
		lodash : 'lodash',
		backbone : 'backbone'
	},
	
	shim : {
		backbone : {
			deps : ['jquery', 'lodash'],
			exports : 'Backbone'
		}
	}

});