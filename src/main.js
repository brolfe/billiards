require([
    'jquery',
    'backbone',
    'src/app',
    'src/router',
    'bootstrap'
], function( $, Backbone, App, Router ) {
    'use strict';

    // initialize the app
    var app = new App();

    // put the app on the window for easier debugging
    window.app = app;

    // ridiculous IIFE to get around unused variable warnings resulting from
    // Backbone's ridiculous "new" router API
    (function() {
        return new Router({ app: app });
    })();

    $(function(){

        $('input[name="start-stop"]').change(function() {
            var val = $( this ).val();
            if ( val === 'start' ) {
                app.start();
            } else {
                app.stop();
            }
        });

        Backbone.history.start();
    });
});
