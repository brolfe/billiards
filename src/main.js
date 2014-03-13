require([
    'jquery',
    'angular',
    // angular module system
    'src/controllers',
    'src/directives',
    'angular-ui',
    'angular-ui-slider'
], function( $, ng ) {
    'use strict';

    // define the app
    ng.module( 'app', [ 'app.controllers', 'app.directives', 'ui.bootstrap', 'ui.slider' ] );

    $(function() {
        // start that app
        ng.bootstrap( document, ['app'] );
    });
});
