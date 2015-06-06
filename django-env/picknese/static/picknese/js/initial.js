/*
 * Initial Loading
 * --------------------------------------------------
 */
$(document).ready(function() {
    "use strict"; // Start of use strict
    
    // Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Initialize WOW.js Scrolling Animations
    new WOW().init();
});