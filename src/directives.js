define([
    'underscore',
    'angular',
    'jquery',
    'src/circle',
    'src/field'
], function( _, ng, $ ) {
    'use strict';

    var module = ng.module( 'app.directives', [] );

    module.directive('billScenario', [ '$interval', function( $interval ) {
        var link = function( $scope, $el, attrs ) {
            /* jshint maxstatements:20 */

            /* SCENARIO HELPERS
            ** ================ */
            var intervalId;
            var $field;

            attrs = _.defaults( attrs, {
                scnWidth: 500,
                scnHeight: 300,
                scnFreq: 10
            });

            var start = function() {
                if ( $field ) {
                    var digest = function() {
                        // update position of all obejcts in the field
                        $field.field( 'digest' );
                    };
                    stop(); // make sure we clear out any existing intervals, just in case
                    intervalId = $interval( digest, attrs.scnFreq );
                }
            };

            var stop = function() {
                $interval.cancel( intervalId );
            };
        
            var populateField = function( config ) {
                // empty field container to delete current field
                $el.empty();

                $field = $('<div>').field({
                    width: attrs.scnWidth,
                    height: attrs.scnHeight
                });

                for ( var i = 0; i < $scope.numCircles; i++ ) {
                    $field.field( 'add', $('<div>').circle( config ) );
                }

                $el.append( $field );
            };

            /* DIFFERENT SCENARIOS
            ** =================== */

            var setBrownian = function() {
                populateField({
                    random: {
                        field: [ attrs.scnWidth, attrs.scnHeight ]
                    },
                    brownian: 5
                });
            };

            var setConstantVelocity = function() {
                populateField({
                    random: {
                        field: [ attrs.scnWidth, attrs.scnHeight ],
                        randomAcceleration: false
                    }
                });
            };

            var setGravity = function() {
                populateField({
                    random: {
                        field: [ attrs.scnWidth, attrs.scnHeight ],
                        randomAcceleration: false
                    },
                    ax: 0,
                    ay: 3
                });
            };

            /* CHANGE HANDLERS
            ** =============== */
            var setScenario = function( scenario ) {
                stop();
                switch ( scenario ) {
                    case 'brownian':
                        setBrownian();
                        break;
                    case 'constantv':
                        setConstantVelocity();
                        break;
                    case 'gravity':
                        setGravity();
                        break;
                }
                
                // Make sure app reflects started/stopped state
                setStarted( $scope.started );
            };

            var setStarted = function( started ) {
                if ( started ) {
                    start();
                } else {
                    stop();
                }
            };

            // scope watches
            $scope.$watch( 'scenario', setScenario );
            $scope.$watch('started', setStarted );

            // apply initial values
            setScenario( $scope.scenario );
            setStarted( $scope.started );

            // TODO numcircles change handler

            /* CLEAN UP
            ** ======== */

            $el.on( '$destroy', stop );

        };

        return {
            restrict: 'E', // element / tag name matching
            link: link
        };
    }]);
});
