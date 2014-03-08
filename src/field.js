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

        add: function( $circle ){
            // TODO get the circle's position and make sure it within the field
            this.circles.push( $circle );
            this.$element.append( $circle );
            $circle.circle( 'setField', this.$element );
        },

        // update each circle in the field
        digest: function( scale ){

            _.each( this.circles, function( $c ){

                // call digest on each circle
                $c.circle( 'digest', scale );

            }, this );

        },

        size: function(){
            return [ this.options.width, this.options.height ];
        }
    });
        
});
