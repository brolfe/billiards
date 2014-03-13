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
        'angular-ui-slider': {
            deps: ['angular', 'jqui-slider']
        },
        'jqui-slider': {
            deps: ['jquery', 'jqui-core', 'jqui-widget', 'jqui-mouse']
        },
        'jqui-widget': {
            deps: ['jquery']
        },
        'jqui-core': {
            deps: ['jquery']
        },
        'jqui-mouse': {
            deps: ['jquery', 'jqui-widget']
        }
    },
    paths: {
        // Remember to update tools/wrap.start after updating this list
        text: 'bower_components/requirejs-text/text',
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',
        angular: 'bower_components/angular/angular',
        'angular-ui': 'bower_components/angular-bootstrap/ui-bootstrap',
        'angular-ui-slider': 'bower_components/angular-ui-slider/src/slider',
        'jqui-widget': 'bower_components/jqueryui/ui/jquery.ui.widget',
        'jqui-core': 'bower_components/jqueryui/ui/jquery.ui.core',
        'jqui-slider': 'bower_components/jqueryui/ui/jquery.ui.slider',
        'jqui-mouse': 'bower_components/jqueryui/ui/jquery.ui.mouse'
    }
});
