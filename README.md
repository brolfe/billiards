# Billiards

This is a little physics simulation page that models basic mechanics. The app contains a "field" which is populated with "circles". These circles can be given different initial conditions (size, position, velocity, acceleration ) which will play out when the app is started.

The app comes with four pre-baked scenarios:

1. Brownian motion - randomly positioned circles with zero initial velocity and constantly random acceleration.
1. Constant velocity - randomly positioned circles with random initial velocity and zero acceleration.
1. Gravity - randomly positioned circles with random initial velocity and gravitational acceleration.
1. Bullet - two circles, one small and one large. The small one shoots like bullet into the big one, transfering its momentum.

All collisions in this app are perfectly elastic -- in other words, no energy is lost in the collision. (A dampening factor could certainly be added.)

## Installation

    npm install
    bower install
    grunt
    grunt http-server

## To Do

1. Style it!
    1. Make it responsive!
1. Brownian motion "external force".
