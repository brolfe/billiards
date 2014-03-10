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

        // hook up the start button
        $('#start').click(function(){
            app.start();
        });

        // hook up the stop button
        $('#stop').click(function(){
            app.stop();
        });

        // tab toggling
        $('#scenarioTabs > li > a').click(function () {
            $( this ).tab('show');
        });

        Backbone.history.start();
    });
});
