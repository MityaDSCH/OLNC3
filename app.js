var main = function() {
    
    $(window).scroll(function() {
    
        var wScroll = $(this).scrollTop();
        
        //navbar hiding 
        if (wScroll > $('#home-section').offset().top) {
            $("nav").removeClass("hidden");
        }
        else {
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
    
    //scrolls window to appropriate main element when corresponding nav
    //is clicked.
    $('.nav-text').click(function(){

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