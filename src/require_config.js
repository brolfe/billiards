require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        bootstrap: {
            deps: ['jquery']
        }
    },
    paths: {
        text: 'bower_components/requirejs-text/text',
        jquery: 'bower_components/jquery/dist/jquery',
        underscore: 'bower_components/underscore/underscore',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap'
    }
});
