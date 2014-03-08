define([
    'jquery',
    'jqui-widget'
], function( $ ){
    'use strict';

    // TODO move to constants module?
    var X = 0; // constants for X and Y position in arrays
    var Y = 1;

    var colors = [ 'red', 'blue', 'green', 'black', 'orange', 'pink' ];

    var getLimitedRandom = function( limit, allowNegative ) {
        var rand = Math.floor( ( Math.random() * 10000 ) % limit );
        if ( allowNegative && Math.random() > 0.5 ) {
            rand = rand * -1;
        }
        return rand;
    };

    $.widget('billiards.circle', {
        
        options: {
            // can be passed an array specifying position bounds
            // and the circle will init itself with a bunch of
            // random initial conditions
            random: null,

            // simulate brownian motion -- zero initial v, constantly random a
            brownian: null,

            color: null,
            size: 10, // size in px

            px: 0, // position x
            py: 0, // position y

            vx: 0, // velocity x (in px per cycle)
            vy: 0, // velocity y

            ax: 0, // acceleration x (in px per cycle per cycle)
            ay: 0  // acceleration y
        },
        
        _create: function(){
            this.$element = this.element; // Use the $prefix naming convention

            if ( this.options.random ) {
                this._initRandomInitialConditions( this.options.random );
            }

            if ( this.options.brownian ) {
                // brownian simulation starts with zero velocity
                this.options.vx = 0;
                this.options.vy = 0;
            }

            this.$element.addClass('circle').css({
                width: this.size() + 'px',
                height: this.size() + 'px',
                'background-color': this.options.color
            });

            // TODO: check parent for dimensions and set max position?
            // should this object require that it is given the container?
            this._updatePosition();
        },

        // create random initial conditions
        _initRandomInitialConditions: function( config ) {
            this.options.px = getLimitedRandom( config.field[ X ] );
            this.options.py = getLimitedRandom( config.field[ Y ] );

            this.options.vx = getLimitedRandom( 20, true );
            this.options.vy = getLimitedRandom( 20, true );
            
            if ( config.constantVelocity !== true ) {
                this.options.ax = getLimitedRandom( 3, true );
                this.options.ay = getLimitedRandom( 3, true );
            }

            this.options.color = colors[ getLimitedRandom( colors.length ) ];
        },

        // update postion on the element
        _updatePosition: function(){
            this.$element.css({
                top: this.options.py,
                left: this.options.px
            });
        },

        // set/get the position on the element
        position: function( x, y ){
            // if no parameters, treat as a getter
            if ( !x && !y ) {
                return [ this.options.px, this.options.py ];
            }

            // else this is a setter
            this.options.px = x;
            this.options.py = y;

            this._updatePosition();
        },

        // set/get the velocity on the element
        velocity: function( x, y ){
            // if no parameters, treat as a getter
            if ( !x && !y ) {
                return [ this.options.vx, this.options.vy ];
            }

            // else this is a setter
            this.options.vx = x;
            this.options.vy = y;
        },

        // set/get the acceleration on the element
        acceleration: function( x, y ){
            // if no parameters, treat as a getter
            if ( !x && !y ) {
                return [ this.options.ax, this.options.ay ];
            }

            // else this is a setter
            this.options.ax = x;
            this.options.ay = y;
        },

        // Update position and velocity for one digest cycle
        digest: function( scale ){
            scale = scale || 1;

            // update postion / velocity
            this.options.px += this.options.vx / scale;
            this.options.py += this.options.vy / scale;
    
            if ( this.options.brownian ) {
                // brownian motion has constantly random acceleration
                this.options.ax = getLimitedRandom( this.options.brownian, true );
                this.options.ay = getLimitedRandom( this.options.brownian, true );
            }

            this.options.vx += this.options.ax / scale;
            this.options.vy += this.options.ay / scale;

            this._updatePosition();
        },

        size: function() {
            return this.options.size;
        },
    
        // returns a bool indicating whether the given points are contained in the circle
        doesContain: function( pointsArray ) {
            var x = pointsArray[ X ];
            var y = pointsArray[ Y ];

            // TODO create a getEdges helper function?
            var leftX   = this.options.px;
            var rightX  = leftX + this.options.size;
            var topY    = this.options.py;
            var bottomY = topY + this.options.size;

            return x >= leftX && x <= rightX && y >= topY && y <= bottomY;
        },

        getOuterPoints: function() {
            var size = this.size();
            return [
                [ this.options.px, this.options.py ],
                [ this.options.px + size, this.options.py ],
                [ this.options.px, this.options.py + size ],
                [ this.options.px + size, this.options.py + size ],
            ];
        }

    });
});
