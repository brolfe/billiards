define([
    'jquery',
    'jqui-widget'
], function( $ ){
    'use strict';

    $.widget('billiards.circle', {
        _create: function(){
            this.$element = this.element; // Use the $prefix naming convention
            this.$element.addClass('circle');
        }
    });
})
