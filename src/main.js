require([
    'jquery',
    'angular',
    // angular module system
    'src/controller',
    'angular-ui'
], function( $, ng ) {
    'use strict';

    // define the app
    ng.module( 'app', [ 'app.controller', 'ui.bootstrap' ] );

    $(function() {
        // start that app
        ng.bootstrap( document, ['app'] );
    });
});
