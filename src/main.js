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

        // tab toggling
        $('#scenarioTabs > li > a').click(function () {
            $( this ).tab('show');
            // This is where we should be using the backbone router
            var id = $( this ).attr('href');
            switch ( id ) {
                case '#brownian':
                    app.setBrownian();
                    break;
                case '#constant_v':
                    app.setConstantVelocity();
                    break;
                case '#gravity':
                    app.setGravity();
                    break;
            }
        });
    });
});
