define([
    'backbone'
], function( Backbone ) {
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
        }

    });

    return Router;
});
