var main = function() {
    
    if ($(window).width() >= 1060) {
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
        var contactHeight = $('#contact-section').offset().top - window.innerHeight/1.3;
        var lastUpdated = 'home';

        //services is active
        if (wScroll > servicesHeight && wScroll < aboutHeight && lastUpdated != 'services') {
            clearActiveNav();
            $('#nav-services').addClass('active');
            lastUpdated = 'services';
            removeCredit();
        }
        
        //about is active
        else if (wScroll > aboutHeight && wScroll < contactHeight && lastUpdated != 'about') {
            clearActiveNav();
            $('#nav-about').addClass('active');
            lastUpdated = 'about';
            removeCredit();
        }

        //contact is active
        else if (wScroll > aboutHeight && lastUpdated != 'contact') {
            clearActiveNav();
            $('#nav-contact').addClass('active');
            lastUpdated = 'contact';
            showCredit();
        }
        
        else {
            clearActiveNav();
            $('#nav-home').addClass('active');
            lastUpdated = 'home';
            removeCredit();
        }
        
    });
    
    //nav-bar item triggers
    $(".nav-text").click(function(){
        
        //Scrolling triggers for home, services, and about
        if ($(this).attr('id') == "nav-home") {
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

        if ($(this).attr('id') == "nav-contact") {
            $(window).scrollTo($('#contact-section'), {
                duration: 1100, 
                over: {top:-.01}
            });
        }
        
    });  

    $("#pull-tab").click(function() {
        toggleFooter();
    });

    //resize contact section
    resizeContact($("#contact-section"));
    $(window).resize(function() {
        window.setTimeout(function() {
            resizeContact($("#contact-section"));
        }, 1600);
    });
    
};

function resizeContact(contactSection) {
    var contWidth = parseInt(contactSection.css('width'));
    contactSection.css('height', contWidth/3.5*2);
}

function clearActiveNav() {
    $('#nav-home').removeClass('active');
    $('#nav-services').removeClass('active');
    $('#nav-about').removeClass('active');
    $('#nav-contact').removeClass('active');
}

function showCredit() {
    $('#pull-tab').removeClass('fadeOutLeft');
    $('#pull-tab').addClass('fadeInLeft');
}

function removeCredit() {
    $('#pull-tab').removeClass('fadeInLeft');
    $('#pull-tab').addClass('fadeOutLeft');
    $('footer').removeClass('shift-up');
    $('#body-container').removeClass('shift-up');
}

function toggleFooter() {
    $('footer').toggleClass('shift-up');
    $('#body-container').toggleClass('shift-up');
}

$(document).ready(main);