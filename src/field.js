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
            scale:  10,  // pixels per cycle scale adjustment
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

        // add $circle to the field
        add: function( $circle ){
            // TODO get the circle's position and make sure it within the field
            this.circles.push( $circle );
            this.$element.append( $circle );
        },

        // remove numCircles number of circles from the field
        pop: function( numCircles ) {
            numCircles = numCircles || 1;
            for ( var i = 0; i < numCircles; i++ ) {
                this.circles.pop().remove();
            }
        },

        // return the number of circles in the field
        getNumCircles: function() {
            return this.circles.length;
        },

        // update each circle in the field
        digest: function(){

            // call digest on each circle
            _.each( this.circles, function( $c ){
                // false tells digest not to update the position on the DOM
                // since we will do that in batch
                $c.circle( 'digest', this.options.scale, false );
            }, this );

            // after all cicles have digested, adjust position/velocity accounting for boundary collisions
            _.each( this.circles, function( $c ){
                this._updateBoundaryCollision( $c );
            }, this );

            // next, adjust position/velocity accounting for circle collisions
            _.each( this.circles, function( $c1, index ) {
                // we want to compute collisions for every circle against every other circle
                // but we don't need to do repeats. i.e. if we have checked cicle 'a' against
                // circle 'b', we don't need to check 'b' against 'a'. Simple enough, right?
                // "index + 1" because a circle can't collide with itself. Duh.
                var otherCircles = this.circles.slice( index + 1, this.circles.length );

                _.each( otherCircles, function( $c2 ) {
                    this._updateCircleCollision( $c1, $c2 );
                }, this );

            }, this );

            // Now that we have done all the position calculations and adjustments,
            // update position on the dom
            _.each( this.circles, function( $c ){
                $c.circle('updatePosition');
            });

        },

        _updateCircleCollision: function( $c1, $c2 ) {
            /* jshint maxstatements:20 */
            var c1OuterPoints = $c1.circle('getOuterPoints');

            var isCollision = _.any( c1OuterPoints, function( pointsArray ) {
                return $c2.circle( 'doesContain', pointsArray );
            });

            if ( isCollision ) {
                if ( $c1.circle( 'existingCollision', $c2 ) || $c2.circle( 'existingCollision', $c1 ) ) {
                    // two objects cannot collide for multiple consecutive cycles
                    // otherwise they will just start trading momentum back and forth infinitely
                    return;
                }

                var c1v = $c1.circle('velocity');
                var c1m = $c1.circle('size');
                var c1px = c1v[ X ] * c1m; // p = momentum = m*v
                var c1py = c1v[ Y ] * c1m;

                var c2v = $c2.circle('velocity');
                var c2m = $c2.circle('size');
                var c2px = c2v[ X ] * c2m;
                var c2py = c2v[ Y ] * c2m;

                // swap x and y velocities
                $c1.circle('velocity', c2px / c1m, c2py / c1m );
                $c2.circle('velocity', c1px / c2m, c1py / c2m );

                // record that these two have collided so they dont collide for
                // multiple consecutive cycles
                $c1.circle('markCollision', $c2 );
                $c2.circle('markCollision', $c1 );
            } else {
                // make sure these are marked as not colliding
                $c1.circle('clearCollision', $c2 );
                $c2.circle('clearCollision', $c1 );
            }
        },

        _updateBoundaryCollision: function( $circle ) {
            /* jshint maxstatements:35 */

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
                // false tells position not to update the position on the DOM
                // since we will do that in batch
                $circle.circle( 'position', leftX, topY, false );
            }

        },

        size: function(){
            return [ this.options.width, this.options.height ];
        }
    });
        
});
