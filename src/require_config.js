require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        bootstrap: {
            deps: ['jquery']
        },
        'jqui-widget': {
            deps: ['jquery']
        },
        'jqui-core': {
            deps: ['jquery']
        }
    },
    paths: {
        // Remember to update tools/wrap.start after updating this list
        text: 'bower_components/requirejs-text/text',
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
        backbone: 'bower_components/backbone/backbone',
        'jqui-widget': 'bower_components/jqueryui/ui/jquery.ui.widget',
        'jqui-core': 'bower_components/jqueryui/ui/jquery.ui.core'
    }
});
