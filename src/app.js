/*jshint maxstatements:500 */
define([
    'underscore',
    'jquery',
    'bootstrap',
    'text!src/dropdown.html'
], function( _, $, bootstrap, dropdownHtml ) {
    'use strict';

    // Create a "class" for our application.
    // Note: this is where an app framework would be nice...
    var App = function() {
        // This is the App's constructor function

        // Create the dropdown dom element from the template
        // We prefix this var with "$" to show that it is a jQuery object.
        var $dropdown = $( dropdownHtml );

        // Assign this $dropdown to a member var so we can access it
        // in the methods defined below.
        this.$dropdown = $dropdown;
    };

    // Extend the App prototype to add "class" methods to App
    _.extend( App.prototype, {

        start: function() {
            // Append our initialized dropdown element to the dom
            $('#dropdown-container').append( this.$dropdown );

            // Listen to the events on the dropdown and update
            this.$dropdown.on('shown.bs.dropdown', function() {
                $('#date-value').text( 'shown' );
            });

            this.$dropdown.on('hidden.bs.dropdown', function() {
                $('#date-value').text( 'hidden' );
            });
        }

    });

    return App;
});
