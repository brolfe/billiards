define([
    'angular'
], function( ng ) {
    'use strict';

    // define angular module
    var module = ng.module('app.controllers', []);

    // put stuff on that module
    module.controller( 'scenarioController', function( $scope ) {
        // Set up initial values
        $scope.scenario = 'brownian';
        $scope.started = false;
        $scope.numCircles = 10;
    });
});
