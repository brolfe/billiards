define([
    'jquery',
    'jqui-widget'
], function( $ ){
    'use strict';

    var X = 0; // constants for X and Y position in arrays
    var Y = 1;

    $.widget('billiards.circle', {
        
        options: {
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

            this.$element.addClass('circle').css({
                width: this.options.size + 'px',
                height: this.options.size + 'px'
            });

            // Member vars
            this.$field = null;

            // TODO: check parent for dimensions and set max position?
            // should this object require that it is given the container?
            this._updatePosition();
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

            var size = this.$field.field('size');

            var leftX = this.options.px + this.options.vx / scale;
            var topY  = this.options.py + this.options.vy / scale;

            var rightX  = leftX + this.options.size;
            var bottomY = topY + this.options.size;
            
            var vx = this.options.vx + this.options.ax / scale;
            var vy = this.options.vy + this.options.ay / scale;

            if ( rightX > size[ X ] ) {
                rightX = size[ X ] - ( rightX % size[ X ] );
                leftX = rightX - this.options.size;
                vx = vx * -1;
            }
            
            if ( leftX < 0 ) {
                leftX = leftX * -1;
                vx = vx * -1;
            }

            if ( bottomY > size[ Y ] ) {
                bottomY = size[ Y ] - ( bottomY % size[ Y ] );
                topY = bottomY - this.options.size;
                vy = vy * -1;
            }
            
            if ( topY < 0 ) {
                topY = topY * -1;
                vy = vy * -1;
            }

            // TODO: come up with something more concrete with digestFrequency, scale, etc.
            // update position
            this.options.px = leftX;
            this.options.py = topY;
            
            this.options.vx = vx;
            this.options.vy = vy;

            this._updatePosition();
        },

        setField: function( $field ){
            this.$field = $field;
        }
    });
});
