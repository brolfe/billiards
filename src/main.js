require([
    'jquery',
    'src/app',
    'bootstrap'
], function( $, App ) {
    'use strict';

    $(function(){
        // initialize the app
        var app = new App();

        // put the app on the window for easier debugging
        window.app = app;

        // hook up the start button
        $('#start').click(function(){
            app.start();
        });

        // hook up the stop button
        $('#stop').click(function(){
            app.stop();
        });
    });
});
