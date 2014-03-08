/*jshint maxstatements:500 */
define([
    'underscore',
    'jquery',
    'src/circle',
    'src/field'
], function( _, $ ) {
    'use strict';

    // App's constructor function
    var App = function( options ) {
        
        // Set/merge app options
        this.options = {
            numCircles: 15,
            digestFrequency: 10, // how often should the event loop be called?    
        };
        _.extend( this.options, options );

        // initialize member vars

        this.intervalId = null; // so that we can clear the interval

        var width = 503;
        var height = 303;

        this.$field = $('#field').field({
            width: width,
            height: height
        });

        for ( var i = 0; i < this.options.numCircles; i++ ) {
            this.$field.field( 'add', $('<div>').circle({
                random: {
                    field: [ width, height ],
                    /* constantVelocity: false */
                },
                brownian: 5
            }));
        }
    };

    // Extend the App prototype to add "class" methods to App
    _.extend( App.prototype, {

        start: function() {
            // start the event loop
            this.intervalId = setInterval( _.bind( this.digest, this ), this.options.digestFrequency );
        },

        stop: function(){
            clearInterval( this.intervalId );
        },

        digest: function(){
            // update position of all obejcts in the field
            this.$field.field( 'digest', 10 );
        }
    });

    return App;
});
