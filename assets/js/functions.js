var headerHeight =  $("#header").outerHeight(),
    introHeight = $(window).height() - headerHeight;
$('#intro').height(introHeight);

// Initialize particles.js with financial theme
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": ["#2563EB", "#F59E0B", "#10B981"]
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#2563EB",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

$(document).ready(function() {

    var timelineBlock = $(".timeline_block"),
        timeline = $('.timeline'),
        timelineLine = $('.timeline_line'),
        lineProgress = $('.line_progress'),
        cardLogo = $('.card_logo_box'),
        timelineItem = $('.timeline_item');
    
    var windowOuterHeight = $(window).outerHeight(),
        window3_4 =  3*windowOuterHeight/4;
        posY = $(window).scrollTop(),
        oldPosY = -1;
    
    var timelineFlag = false,
        isIntroFlag = true;
    

    $(document).on('click', (e) => {
        if(e.target.id!='navbar-btn' && $('#navbar').hasClass('sidebar-active'))
            toggleSidebar();
        
    });
    
    $(window).on('scroll', () => {
        posY = $(window).scrollTop();
        updateFrame();
        updateIntroHeight();
    });

    $(window).on('resize', () => {
        introHeight = $(window).height() - headerHeight;
        $('#intro').height(introHeight);

        posY = $(window).scrollTop();
        updateFrame();
    });
    
    
    function updateFrame() {
        if(timelineFlag==false) requestAnimationFrame(updateWindow); 
        timelineFlag = true;
    }
    function updateWindow() {
        timelineFlag = false;
        if(posY !== oldPosY) oldPosY = posY; updateProgress();
    }

    function updateProgress() {
        
        timelineBlock.each(function() {
            
            var lastItemTop = $(this).find(timelineItem).last().find(cardLogo).offset().top,
            progressTop = $(this).find(lineProgress).offset().top,
            windowMid = posY - progressTop + window3_4;
            
            if(lastItemTop <= posY + window3_4) windowMid = lastItemTop - progressTop;
            $(this).find(lineProgress).css({height: windowMid + "px"});
    
            $(this).find(timelineItem).each( function() {
                var itemTop = $(this).find(cardLogo).offset().top;
                if(itemTop < posY + window3_4)
                    $(this).addClass('timeline_item_active');
                else $(this).removeClass('timeline_item_active');
            })

        });
    }


    function updateIntroHeight(){
        if (isIntroFlag==true && posY > introHeight) {
            isIntroFlag=false;
            $("#header").addClass("sticky");
            $('#intro').height(introHeight + headerHeight);
        }
        else if(isIntroFlag==false && posY < introHeight){
            isIntroFlag=true;
            $("#header").removeClass("sticky");
            $('#intro').height(introHeight);
        }
    }
    
    $('#navbar-btn').on('click', toggleSidebar);

    function toggleSidebar(){
        $('#navbar').toggleClass("sidebar-active");
        $('#navbar').toggleClass("sidebar-inactive");
    }

    $('.navbar-item').each(function (){
        $(this).on('click', (e) => {
            var offset = $($(this).attr('href')).offset();
            offset.top -= headerHeight;
            $('html, body').animate( {scrollTop: offset.top}, 1000);
        });
    });
});

function openInNewTab(url) {
    window.open(url, '_blank');
  }
  