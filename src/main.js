require([
    'src/app',
], function(App) {
    'use strict';

    // initialize the app
    var app = new App();

    // start the app
    app.start();

    // put the app on the window for easier debugging
    window.app = app;
});
