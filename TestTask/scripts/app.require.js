requirejs.config({
    baseUrl: '/scripts',
    locale: 'en-US',
    paths: {
        'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min',
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
        'backbone': '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        'jqueryui': '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min',
        'marionette': '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/1.8.0/backbone.marionette.min',
        'app': './app'
    },
    shim: {
        'jqueryui': {
            deps: ['jquery']
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery', 'jqueryui'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['underscore', 'backbone', 'jquery']
        }
    }
});

require(['app'], function (App) {
    var options = {
        noteService: 'http://ecorougenotes.apiary-mock.com/notes'
    };
    App.start(options);
});
