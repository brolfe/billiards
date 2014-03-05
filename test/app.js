define(['src/app'], function( App ) {
    'use strict';
    module('App');

    test('App exists', function() {
        ok( App, 'App is a thing' );
    });

    test('App can be initialized', function() {
        var app = new App();

        ok( app, 'app is a thing' );
        ok( app.$dropdown, 'app has a $dropdown member var' );
    });
});
