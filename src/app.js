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
            width: 503,
            height: 303
        };
        _.extend( this.options, options );

        // initialize member vars
        this.intervalId = null; // so that we can clear the interval
        this.$field = null;

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
            if ( this.$field ) {
                // update position of all obejcts in the field
                this.$field.field( 'digest', this.options.digestFrequency );
            }
        },

        populateField: function( config ) {
            // stop any processing
            this.stop();

            // empty field container to delete current field
            $('#fieldContainer').empty();
            delete this.$field;

            this.$field = $('<div>').field({
                width: this.options.width,
                height: this.options.height
            });

            for ( var i = 0; i < this.options.numCircles; i++ ) {
                this.$field.field( 'add', $('<div>').circle( config ) );
            }

            $('#fieldContainer').append( this.$field );
        },

        /* DIFFERENT SCENARIOS
        ** =================== */

        setBrownian: function() {
            this.populateField({
                random: {
                    field: [ this.options.width, this.options.height ]
                },
                brownian: 5
            });
        },

        setConstantVelocity: function() {
            this.populateField({
                random: {
                    field: [ this.options.width, this.options.height ],
                    constantVelocity: true
                }
            });
        },

        setGravity: function() {
            this.populateField({
                random: {
                    field: [ this.options.width, this.options.height ],
                    randomAcceleration: false
                },
                ax: 0,
                ay: 3
            });
        }
    });

    return App;
});
