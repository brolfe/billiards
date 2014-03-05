# App Boilerplate

This boilerplate is a great starting place for writing a modern web application. It cherry picks some of the most common libraries to create a project environment that encourages tried and true programming paradigms. "But dude, couldn't you have just used yeoman?" I suppose so, but I don't really like yeoman for whatever reason. It's "heavy"...whatever that means.

## Quick Start
Run the following commands, and you should be ready to go:

    npm install
    bower install
    grunt
    grunt http-server
    
The production app and associated artifacts will be in the `dist/` directory.

The development `index.html` is meant to load all files locally so that one can tinking even without an internet connection. Airplane rides, anyone?

The production `index.html` loads libaries and the like from CDNs. Performance, baby.

## Build Features

This boilerplate comes chock full of good build tasks already set up and ready to go. Those include:

1. Source code linting
    1. Checks for tabs, proper line endings.
    1. Strict jshint rules
1. Artifact Generation
    1. RequireJS optimization of your source js.
    1. Uglification of your optmized js.
1. Caching
    1. Includes a .htaccess file which sets the appropriate cache headers (if you're using Apache)
    1. Includes usemin and filerev tasks, which, combined with the .htaccess, provide a strong "autoversion" caching strategy.
1. Unit Testing via qunit and phantomjs

## Preloaded Libraries

This boilerplate comes with several libraries already available to you, via weblibs:

1. jquery
1. underscore
1. bootstrap

## Directory Structure

* index.html - a development version of your app which loads app from source
* test - put your unit tests here
* src - put your source code here
* dist - this is where your artifacts will be generated
    *  dist/index.html - a production version of your app which load optimized, minified source code
* tools - mostly build stuff
