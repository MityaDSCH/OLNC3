var main = function() {
    
    $(window).scroll(function() {
        
        var wScroll = $(this).scrollTop();
        
        if (wScroll > $('#home-section').offset().top) {
            $("nav").removeClass("hidden");
        }
        else {
            $("nav").addClass("hidden");
        }
        
    });
    
};

$(document).ready(main);