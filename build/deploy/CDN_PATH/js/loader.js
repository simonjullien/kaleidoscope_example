/**
 * ...
 * @author emlyn@resn.co.nz
 */

require.config({
	
	paths: {
        "jquery": "libs/jquery-1.8.3",
		"underscore": "libs/underscore",
		"backbone": "libs/backbone",
        "swfobject": "libs/swfobject",
        "preloadjs": "libs/preloadjs-0.2.0.min",
        "handlebars": "libs/handlebars-1.0.rc.3",
        "sylvester":"libs/sylvester-min",
        "text": "libs/text"
	},

    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
        'preloadjs':{
            exports: 'createjs.PreloadJS'
        },
        'sylvester':{
            exports: 'Sylvester'
        },
        'libs/swfobject': {
            deps: ['jquery'],
            exports: 'swfobject'
        },
        'libs/swffit':['libs/swfobject'],
        'libs/swfmacmousewheel':['libs/swfobject'],
        'libs/jquery-swfobject': ['jquery']
    },

    waitSeconds: 12
		
  });

require(["jquery","config","main"], function($,Config, Main) {

	// Start onDOMReady
	$(function() {
		Main.start();
		
		//# Run testing framwork.
		if(window.location.toString().indexOf('?testing') > -1) {
			require(['tests/jasmine']);
		}
	});
		
});
	
