define([
    'jquery',
    'jqui-widget'
], function( $ ){
    'use strict';

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
                width: this.size() + 'px',
                height: this.size() + 'px'
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

            // update postion / velocity
            this.options.px += this.options.vx / scale;
            this.options.py += this.options.vy / scale;
    
            this.options.vx += this.options.ax / scale;
            this.options.vy += this.options.ay / scale;

            this._updatePosition();
        },

        size: function() {
            return this.options.size;
        },

        setField: function( $field ){
            this.$field = $field;
        }
    });
});
