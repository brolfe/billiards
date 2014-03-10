define([
    'angular',
    'src/app'
], function( ng, App ) {
    'use strict';

    // define angular module
    var module = ng.module('app.controller', []);

    // put stuff on that module
    module.controller( 'controller', function( $scope ) {
        // Set up initial values
        $scope.scenario = 'brownian';
        $scope.started = false;

        // new up the App
        var app = new App();

        // change handlers
        var setScenario = function( scenario ) {
            switch ( scenario ) {
                case 'brownian':
                    app.setBrownian();
                    break;
                case 'constantv':
                    app.setConstantVelocity();
                    break;
                case 'gravity':
                    app.setGravity();
                    break;
            }
            
            // Make sure app reflects started/stopped state
            setStarted( $scope.started );
        };

        var setStarted = function( started ) {
            if ( started ) {
                app.start();
            } else {
                app.stop();
            }
        };

        // scope watches
        $scope.$watch( 'scenario', setScenario );
        $scope.$watch('started', setStarted );

        // apply initial values
        setScenario( $scope.scenario );
        setStarted( $scope.started );
    });
});
