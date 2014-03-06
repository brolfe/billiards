define([
    'jquery',
    'jqui-widget'
], function( $ ){
    'use strict';

    var X = 0; // constants for X and Y position in arrays
    var Y = 1;

    $.widget('billiards.field', {
        options: {
            width:  500, // width in px
            height: 300  // height in px
        },

        _create: function(){
            this.$element = this.element; // Use the $prefix naming convention

            this.$element.addClass('field').css({
                width: this.options.width + 'px',
                height: this.options.height + 'px'
            });

            // Member variables
            this.circles = [];
        },

        add: function( circle ){
            // TODO get the circle's position and make sure it within the field
            this.circles.push( circle );
            this.$element.append( circle );
        },

        // update each circle in the field
        digest: function( scale ){

            _.each( this.circles, function( $c ){

                // call digest on each circle
                $c.circle( 'digest', scale );

                // then get its new position and velocity
                var pos = $c.circle('position');
                var vel = $c.circle('velocity');

                // TODO should we be checking that next digest will exceed the boundary?

                // and check for collisions with the boundaries of the field

                // if the circle's position exceeds the max width AND it has a positive x velocity
                if ( pos[ X ] >= this.options.width && vel[ X ] > 0 ) {
                    // reverse x velocity
                    $c.circle('velocity', vel[ X ] * -1, vel[ Y ] );
                }
                
                // if the circle's position exceeds the min width AND it has a negative x velocity
                if ( pos[ X ] < 0 && vel[ X ] < 0 ) {
                    // reverse x velocity
                    $c.circle('velocity', vel[ X ] * -1, vel[ Y ] );
                }
                
                // if the circle's position exceeds the max height AND it has a positive y velocity
                if ( pos[ Y ] >= this.options.height && vel[ Y ] > 0 ) {
                    // reverse y velocity
                    $c.circle('velocity', vel[ X ], vel[ Y ] * -1 );
                }
                
                // if the circle's position exceeds the min height AND it has a negative y velocity
                if ( pos[ Y ] < 0 && vel[ Y ] < 0 ) {
                    // reverse y velocity
                    $c.circle('velocity', vel[ X ], vel[ Y ] * -1 );
                }

            }, this );

        }
    });
        
});
