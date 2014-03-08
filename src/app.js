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
            digestFrequency: 10, // how often should the event loop be called?    
        };
        _.extend( this.options, options );

        // initialize member vars

        this.intervalId = null; // so that we can clear the interval

        this.$c1 = $('<div>').circle({
            color: 'red',
            px: 100, // initial x position
            py: 100, // initial y position
            vx: 7,   // initial x velocity
            vy: 0,   // initial y velocity
            ay: 0    // gravity...sorta
        });

        this.$c2 = $('<div>').circle({
            color: 'green',
            px: 150, // initial x position
            py: 100, // initial y position
            vx: 2,  // initial x velocity
            vy: 0,   // initial y velocity
            ay: 0    // gravity...sorta
        });

        this.$field = $('#field').field({
            width: 503,
            height: 303
        });

        // put the circle on the playing field
        this.$field.field( 'add', this.$c1 );
        this.$field.field( 'add', this.$c2 );

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
