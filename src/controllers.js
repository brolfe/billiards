define([
    'angular'
], function( ng ) {
    'use strict';

    // define angular module
    var module = ng.module('app.controllers', []);

    // put stuff on that module
    module.controller( 'scenarioController', [ '$scope', function( $scope ) {

        var setAllowScenarioMods = function( scenario ) {
            $scope.allowScenarioMods = scenario !== 'bullet';
            if ( scenario === 'bullet' ) {
                // save what the option was before we change it
                nonBulletUseRandomSize = $scope.useRandomSize;
                $scope.useRandomSize = false;
            } else {
                // if we are no longer on bullet, reset the useRandomSize option to
                // whatever it was before we changed it.
                $scope.useRandomSize = nonBulletUseRandomSize;
            }
        };

        // Set up initial values
        $scope.scenario = 'brownian';
        setAllowScenarioMods( $scope.scenario );
        $scope.started = false;
        $scope.useRandomSize = true;
        var nonBulletUseRandomSize = $scope.useRandomSize;
        $scope.numCircles = 10;

        $scope.$watch( 'scenario', setAllowScenarioMods );
    }]);
});
