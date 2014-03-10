define([
    'jquery',
    'backbone'
], function( $, Backbone ) {
    'use strict';

    var Router = Backbone.Router.extend({
        initialize: function( options ) {
            this.app = options.app;
        },

        routes: {
            'scenarios/:scenario': 'showScenario'
        },

        showScenario: function( scenario ) {
            switch ( scenario ) {
                case 'brownian':
                    this.app.setBrownian();
                    break;
                case 'constantv':
                    this.app.setConstantVelocity();
                    break;
                case 'gravity':
                    this.app.setGravity();
                    break;
            }

            // update the tab display
            $('#scenarioTabs > li').removeClass('active');

            $('#scenarioTabs > li > a[href*="' +  scenario + '"]' )
            .closest('li')
            .addClass('active');
        }

    });

    return Router;
});
