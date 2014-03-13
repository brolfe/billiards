define([
    'angular'
], function( ng ) {
    'use strict';

    // define angular module
    var module = ng.module('app.controllers', []);

    // put stuff on that module
    module.controller( 'scenarioController', [ '$scope', function( $scope ) {

        // TODO does angular have built in support for computed values?
        var setSliderEnabled = function( scenario ) {
            $scope.sliderEnabled = scenario !== 'bullet';
        };

        // Set up initial values
        $scope.scenario = 'brownian';
        setSliderEnabled( $scope.scenario );
        $scope.started = false;
        $scope.numCircles = 10;

        $scope.$watch( 'scenario', setSliderEnabled );
    }]);
});
