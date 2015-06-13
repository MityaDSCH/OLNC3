var main = function() {
    
    if ($(window).width() >= 1080) {
        $('nav').removeClass('hidden');
    }
    
    $(window).scroll(function() {
    
        var wScroll = $(this).scrollTop();
        
        //navbar hiding 
        if (wScroll > $('#home-section').offset().top) {
            $("nav").removeClass("hidden");
        }
        
        else if ($(window).width() < 1080) {
            $("nav").addClass("hidden");
        }
        
        //navbar text hilighting
        var servicesHeight = $('#services-section').offset().top - window.innerHeight/3;
        var aboutHeight = $('#about-section').offset().top - window.innerHeight/3;
        var lastUpdated = 'home';

        if (wScroll > servicesHeight && wScroll < aboutHeight && lastUpdated != 'services') {
            clearActiveNav();
            $('#nav-services').addClass('active');
            lastUpdated = 'services';
        }
        
        else if (wScroll > aboutHeight && lastUpdated != 'about') {
            clearActiveNav();
            $('#nav-about').addClass('active');
            lastUpdated = 'about';
        }
        
        else {
            clearActiveNav();
            $('#nav-home').addClass('active');
            lastUpdated = 'home';
        }
        
    });
    
    //nav-bar item triggers
    $(".nav-text").click(function(){
        
        //Scrolling triggers for home, services, and about
        if ($(this).attr('id') == "nav-home") {
            console.log('hi');
            $(window).scrollTo(0, {
                duration: 1100, 
                over: {top:-.01}
            });
        }

        if ($(this).attr('id') == "nav-services") {
            $(window).scrollTo($('#services-section'), {
                duration: 1100, 
                over: {top:-.01}
            });
        }

        if ($(this).attr('id') == "nav-about") {
            $(window).scrollTo($('#about-section'), {
                duration: 1100, 
                over: {top:-.01}
            });
        }
        
        //display modal for contact
        if ($(this).attr('id') == "nav-contact") {
            $('#modal').removeClass("hidden");
            $('#overlay').removeClass("hidden");
        }

    });  
    
    //remove modal
    $("#overlay").click(function() {
         if (!$('#overlay').hasClass("hidden") && !$('#modal').hasClass("hidden")) {
            $('#overlay').addClass("hidden");
            $('#modal').addClass("hidden");
        }
    });
    
};

function clearActiveNav() {
    if ($('#nav-home').hasClass('active')){
        $('#nav-home').removeClass('active');
    }
    if ($('#nav-services').hasClass('active')){
        $('#nav-services').removeClass('active');
    }
    if ($('#nav-about').hasClass('active')){
        $('#nav-about').removeClass('active');
    }
}

$(document).ready(main);