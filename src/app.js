/*jshint maxstatements:500 */
define([
    'underscore',
    'jquery',
    'src/circle'
], function( _, $ ) {
    'use strict';

    // App's constructor function
    var App = function() {
        this.$circle = $('<div>').circle();
        this.$field = $('#field');
    };

    // Extend the App prototype to add "class" methods to App
    _.extend( App.prototype, {

        start: function() {
            this.$field.append( this.$circle );
        }

    });

    return App;
});
