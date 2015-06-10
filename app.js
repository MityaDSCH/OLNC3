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
        else if (wScroll > aboutHeight && lastUpdated != 'background') {
            clearActiveNav();
            $('#nav-about').addClass('active');
            lastUpdated = 'background';
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
            $(window).scrollTo(0, 1100);
        }

        if ($(this).attr('id') == "nav-services") {
            $(window).scrollTo($('#services-section'), 1100);
        }

        if ($(this).attr('id') == "nav-about") {
            $(window).scrollTo($('#background-about'), 1100);
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