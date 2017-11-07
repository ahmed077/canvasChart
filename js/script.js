/*global console, $, jQuery*/
$(function () {
    "use strict";
    function addGoal() {
    }
    $('#sort-projects').on('click', function (e) {
        $(this).hasClass('open') ? $(this).children('ul').slideUp(1000, function () {
            $(this).parent().removeClass('open');
        }).siblings('i').removeClass('fa-chevron-up').addClass('fa-chevron-down') :
                $(this).children('ul').hide().removeClass('hidden').slideDown(1000).end().addClass('open').children('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    });
});