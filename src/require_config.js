require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        angular: {
            exports: 'angular'
        },
        'angular-ui': {
            deps: ['angular']
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
        angular: 'bower_components/angular/angular',
        'angular-ui': 'bower_components/angular-bootstrap/ui-bootstrap',
        'jqui-widget': 'bower_components/jqueryui/ui/jquery.ui.widget'
    }
});
