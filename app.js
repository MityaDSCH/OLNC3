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
        
        //slide out nav options and slide in contact info
        if ($(this).attr('id') == "nav-contact") {


            $(".nav-text").each(function(i) {

                var navElement = $(this);

                //add fadeOutLeft animate.css tag the nav element, staggered by 150ms
                setTimeout(function(){
                    navElement.addClass('animated fadeOutLeft');
                }, 150*(i+1));

                //display: none the element after 1500ms
                setTimeout(function() {
                    navElement.hide();
                }, 1500)
                
            });

            //begin animating in the contact elements after 1500ms
            setTimeout(function(){

                $($(".contact-text").get().reverse()).each(function(i){

                    var contactElement = $(this);

                    console.log(contactElement.text);

                    contactElement.addClass('animated fadeInLeft')

                    setTimeout(function(i){
                        contactElement.show();
                    }, 150*(i+1));

                })

            }, 1500);
            
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