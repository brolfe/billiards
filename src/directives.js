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

            /* INITIAL SETUP
            ** ============= */
            var intervalId;
            var $field;

            attrs = _.defaults( attrs, {
                scnWidth: 500,
                scnHeight: 300,
                scnFreq: 10
            });

            /* SCENARIO HELPERS
            ** ================ */

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
        
            var resetField = function( config ) {
                // empty field container to delete current field
                $el.empty();

                $field = $('<div>').field({
                    width: attrs.scnWidth,
                    height: attrs.scnHeight
                });

                addToField( config, $scope.numCircles );

                $el.append( $field );
            };

            var addToField = function( config, numToAdd ) {
                if ( _.isArray( config ) ) {
                    _.each( config, function( c ) {
                        $field.field( 'add', $('<div>').circle( c ) );
                    });
                } else {
                    for ( var i = 0; i < numToAdd; i++ ) {
                        $field.field( 'add', $('<div>').circle( config ) );
                    }
                }
            };

            /* DIFFERENT SCENARIOS
            ** =================== */

            var brownianConfig = {
                random: {
                    field: [ attrs.scnWidth, attrs.scnHeight ]
                },
                brownian: 5
            };

            var constantVConfig = {
                random: {
                    field: [ attrs.scnWidth, attrs.scnHeight ],
                    randomAcceleration: false
                }
            };

            var gravityConfig = {
                random: {
                    field: [ attrs.scnWidth, attrs.scnHeight ],
                    randomAcceleration: false
                },
                ax: 0,
                ay: 3
            };

            var bulletConfig = [
                {
                    size: 10,
                    px: 100,
                    py: 120,
                    vx: 20,
                    vy: 0
                },
                {
                    size: 50,
                    px: 300,
                    py: 100,
                    vx: 0,
                    vy: 0
                }
            ];

            /* CHANGE HANDLERS
            ** =============== */

            var setScenario = function( scenario ) {
                // stop the digest cycle on the field before messing with its contents
                stop();
                switch ( scenario ) {
                    case 'brownian':
                        resetField( brownianConfig );
                        break;
                    case 'constantv':
                        resetField( constantVConfig );
                        break;
                    case 'gravity':
                        resetField( gravityConfig );
                        break;
                    case 'bullet':
                        resetField( bulletConfig );
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

            var updateNumCircles = function( newNum ) {
                // de we need to add or remove circles?
                var diff = newNum - $field.field('getNumCircles');
                // stop the digest cycle on the field before messing with its contents
                stop();
                if ( diff > 0 ) {
                    switch ( $scope.scenario ) {
                        case 'brownian':
                            addToField( brownianConfig, diff );
                            break;
                        case 'constantv':
                            addToField( constantVConfig, diff );
                            break;
                        case 'gravity':
                            addToField( gravityConfig, diff );
                            break;
                    }
                } else if ( diff < 0 ) {
                    $field.field( 'pop', Math.abs( diff ) );
                }
                // Make sure app reflects started/stopped state
                setStarted( $scope.started );
            };

            // scope watches
            $scope.$watch( 'scenario', setScenario );
            $scope.$watch('started', setStarted );
            $scope.$watch('numCircles', _.debounce( updateNumCircles, 350 ) );

            // apply initial values
            setScenario( $scope.scenario );
            setStarted( $scope.started );

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
