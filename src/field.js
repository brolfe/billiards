define([
    'underscore',
    'jquery',
    'jqui-widget'
], function( _, $ ){
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

        add: function( $circle ){
            // TODO get the circle's position and make sure it within the field
            this.circles.push( $circle );
            this.$element.append( $circle );
            $circle.circle( 'setField', this.$element );
        },

        // update each circle in the field
        digest: function( scale ){

            // call digest on each circle
            _.each( this.circles, function( $c ){
                $c.circle( 'digest', scale );
            }, this );

            // after all cicles have digested, adjust position/velocity accounting for boundary collisions
            _.each( this.circles, function( $c ){
                this._updateBoundaryCollision( $c, scale );
            }, this );

            // next, adjust position/velocity accounting for circle collisions

        },

        _updateBoundaryCollision: function( $circle, scale ) {
            /* jshint maxstatements:35 */
            scale = scale || 1;

            var fieldSize = this.size();
            var adjustmentMade = false; // do we need to update $circle?

            // get the right, left, top, and bottom position of the square (circle, whatever)
            var circlePos = $circle.circle('position');
            var leftX = circlePos[ X ];
            var topY  = circlePos[ Y ];

            var rightX  = leftX + $circle.circle('size');
            var bottomY = topY + $circle.circle('size');
            
            // get the velocity of the circle
            var circleVelocity = $circle.circle('velocity');
            var vx = circleVelocity[ X ];
            var vy = circleVelocity[ Y ];

            // if the right edge of the cicle exceeds the right edge of the field
            if ( rightX > fieldSize[ X ] ) {
                rightX = fieldSize[ X ] - ( rightX % fieldSize[ X ] );
                leftX = rightX - $circle.circle('size');
                vx = vx * -1;
                adjustmentMade = true;
            }
            
            // if the left edge of the cicle exceeds the left edge of the field
            if ( leftX < 0 ) {
                leftX = leftX * -1;
                vx = vx * -1;
                adjustmentMade = true;
            }

            // if the bottom edge of the cicle exceeds the bottom edge of the field
            if ( bottomY > fieldSize[ Y ] ) {
                bottomY = fieldSize[ Y ] - ( bottomY % fieldSize[ Y ] );
                topY = bottomY - $circle.circle('size');
                vy = vy * -1;
                adjustmentMade = true;
            }
            
            // if the top edge of the cicle exceeds the top edge of the field
            if ( topY < 0 ) {
                topY = topY * -1;
                vy = vy * -1;
                adjustmentMade = true;
            }

            if ( adjustmentMade ) {
                $circle.circle( 'velocity', vx, vy );
                $circle.circle( 'position', leftX, topY );
            }

        },

        size: function(){
            return [ this.options.width, this.options.height ];
        }
    });
        
});
