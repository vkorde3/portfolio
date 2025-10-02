/**
 * Main Functions and Interactions
 * Handles navigation, scrolling, animations, and dark mode
 *
 * Timeline reveal strictly depends on scroll via IntersectionObserver.
 */

// Turn on for dev logs
var TIMELINE_DEBUG = false;

// Initialize variables
var headerHeight = $("#header").outerHeight() || 0,
    introHeight = $(window).height() - headerHeight;

// If #intro exists set height (safe if it doesn't)
if ($('#intro').length) $('#intro').height(introHeight);

// ============================================
// DOCUMENT READY
// ============================================
$(document).ready(function() {
    initializeDarkMode();
    initializeTimeline();
    initializeNavigation();
    initializeParticles();
    initializeContactForm();

    // Run other initial animations
    if (typeof revealTimeline === 'function') revealTimeline();

    // Force reveal for timeline items already in view
    $('.timeline_item').each(function() {
        var $this = $(this);
        var off = $this.offset();
        if (!off) return;
        if (off.top < $(window).scrollTop() + $(window).height()) {
            $this.addClass('timeline_item_active');
        }
    });
});

// ============================================
// DARK MODE FUNCTIONALITY
// ============================================
function initializeDarkMode() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    $('#theme-toggle').on('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        $('body').css('transition', 'all 0.3s ease');
        setTimeout(() => $('body').css('transition', ''), 300);
    });
}

function updateThemeIcon(theme) {
    const icon = $('#theme-toggle i');
    if (!icon.length) return;
    if (theme === 'dark') {
        icon.removeClass('fa-moon').addClass('fa-sun');
    } else {
        icon.removeClass('fa-sun').addClass('fa-moon');
    }
}

// ============================================
// TIMELINE AND SCROLL ANIMATIONS
// ============================================
function initializeTimeline() {
    var $timelineBlocks = $(".timeline_block");

    if (!$timelineBlocks.length) {
        if (TIMELINE_DEBUG) console.log('initializeTimeline: no timeline blocks found');
        return;
    }

    var posY = $(window).scrollTop(),
        oldPosY = -1,
        windowOuterHeight = $(window).outerHeight() || window.innerHeight,
        window3_4 = 3 * windowOuterHeight / 4;

    var timelineFlag = false,
        isIntroFlag = true;

    var timelineObserver = null;

    function setupTimelineObserver() {
        if (!('IntersectionObserver' in window)) {
            if (TIMELINE_DEBUG) console.warn('IntersectionObserver not supported — falling back to scroll-based reveal');
            $(window).on('scroll', revealTimeline);
            revealTimeline();
            return;
        }

        if (timelineObserver) timelineObserver.disconnect();

        var options = {
            root: null,
            rootMargin: '0px 0px -15% 0px',
            threshold: 0.01
        };

        timelineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                var target = entry.target;
                if (entry.isIntersecting) {
                    target.classList.add('timeline_item_active');
                    if (TIMELINE_DEBUG) console.log('timeline observer: add active', target);
                } else {
                    target.classList.remove('timeline_item_active');
                    if (TIMELINE_DEBUG) console.log('timeline observer: remove active', target);
                }
            });
        }, options);

        document.querySelectorAll('.timeline_item').forEach(function(el) {
            timelineObserver.observe(el);
        });

        if (TIMELINE_DEBUG) console.log('timelineObserver set, observed items:', document.querySelectorAll('.timeline_item').length);
    }

    function updateProgress() {
        $timelineBlocks.each(function() {
            var $block = $(this);
            var $lastCard = $block.find('.timeline_item').last().find('.card_logo_box');
            var $progress = $block.find('.line_progress');

            if (!$lastCard.length || !$progress.length) {
                if (TIMELINE_DEBUG) console.log('updateProgress: missing lastCard or progress in a block');
                return;
            }

            var lastOffset = $lastCard.offset();
            var progressOffset = $progress.offset();
            if (!lastOffset || !progressOffset) return;

            var lastItemTop = lastOffset.top;
            var progressTop = progressOffset.top;
            var windowMid = posY - progressTop + window3_4;

            if (lastItemTop <= posY + window3_4) {
                windowMid = lastItemTop - progressTop;
            }

            if (windowMid < 0) windowMid = 0;
            $progress.css({ height: windowMid + "px" });
        });
    }

    function updateFrame() {
        if (!timelineFlag) requestAnimationFrame(updateWindow);
        timelineFlag = true;
    }

    function updateWindow() {
        timelineFlag = false;
        if (posY !== oldPosY) {
            oldPosY = posY;
            updateProgress();
        }
    }

    function revealTimeline() {
        var triggerBottom = $(window).height() * 0.85;
        $('.timeline_item').each(function() {
            var $this = $(this);
            var $cardItem = $this.find('.card_item');
            if (!$cardItem.length) $cardItem = $this.find('.card_logo_box');

            if ($cardItem.length) {
                var off = $cardItem.offset();
                if (!off) return;
                var itemTop = off.top - $(window).scrollTop();
                if (itemTop < triggerBottom) {
                    $this.addClass('timeline_item_active');
                } else {
                    $this.removeClass('timeline_item_active');
                }
            }
        });
    }

    function attachMutationObservers() {
        $timelineBlocks.each(function() {
            var $block = $(this);
            var $list = $block.find('.timeline_list');
            if (!$list.length) return;

            var mo = new MutationObserver(function(mutations) {
                var added = false;
                mutations.forEach(function(m) {
                    if (m.addedNodes && m.addedNodes.length) added = true;
                });
                if (added) {
                    if (TIMELINE_DEBUG) console.log('MutationObserver detected addedNodes in timeline_list — re-setup observer');
                    setupTimelineObserver();
                    posY = $(window).scrollTop();
                    updateProgress();
                }
            });

            mo.observe($list[0], { childList: true, subtree: false });
        });
    }

    setupTimelineObserver();
    attachMutationObservers();

    posY = $(window).scrollTop();
    updateProgress();
    if (typeof revealTimeline === 'function') revealTimeline();

    $(window).on('scroll', function() {
        posY = $(window).scrollTop();
        updateFrame();
        updateIntroHeight();
        if (!('IntersectionObserver' in window)) revealTimeline();
    });

    $(window).on('resize', function() {
        headerHeight = $("#header").outerHeight() || 0;
        introHeight = $(window).height() - headerHeight;
        if ($('#intro').length) $('#intro').height(introHeight);

        windowOuterHeight = $(window).outerHeight() || window.innerHeight;
        window3_4 = 3 * windowOuterHeight / 4;

        posY = $(window).scrollTop();
        updateFrame();
        setupTimelineObserver();
        if (!('IntersectionObserver' in window)) revealTimeline();
    });

    function updateIntroHeight() {
        if ($('#intro').length === 0) return;
        if (isIntroFlag && posY > introHeight) {
            isIntroFlag = false;
            $("#header").addClass("sticky");
            $('#intro').height(introHeight + headerHeight);
        } else if (!isIntroFlag && posY < introHeight) {
            isIntroFlag = true;
            $("#header").removeClass("sticky");
            $('#intro').height(introHeight);
        }
    }
}

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================
function initializeNavigation() {
    $(document).on('click', function(e) {
        if (e.target.id != 'navbar-btn' && $('#navbar').hasClass('sidebar-active')) {
            toggleSidebar();
        }
    });

    $('#navbar-btn').on('click', toggleSidebar);

    $('.navbar-item').each(function() {
        $(this).on('click', function(e) {
            var href = $(this).attr('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                var target = $(href);
                if (target.length) {
                    var offset = target.offset();
                    if (offset) {
                        offset.top -= headerHeight;
                        $('html, body').animate({ scrollTop: offset.top }, 800);
                    }
                }
                if ($('#navbar').hasClass('sidebar-active')) toggleSidebar();
            }
        });
    });
}

function toggleSidebar() {
    $('#navbar').toggleClass("sidebar-active");
    $('#navbar').toggleClass("sidebar-inactive");
}

// ============================================
// PARTICLES.JS INITIALIZATION
// ============================================
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
                opacity: { value: 0.5 },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, out_mode: 'out' }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
                modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
function initializeContactForm() {
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();

        const mailtoLink = 'mailto:vishakha.subodh.korde@gmail.com?subject=' + encodeURIComponent(subject) +
                           '&body=' + encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message);

        window.location.href = mailtoLink;
        alert('Opening your email client. Thank you for reaching out!');
        this.reset();
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function openInNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

function scrollToElement(elementId) {
    const element = $(elementId);
    if (element.length) {
        const offset = element.offset();
        if (offset) {
            offset.top -= headerHeight;
            $('html, body').animate({ scrollTop: offset.top }, 800);
        }
    }
}

function animateOnScroll() {
    $('.fade-in').each(function() {
        const off = $(this).offset();
        if (!off) return;
        const elementTop = off.top;
        const windowBottom = $(window).scrollTop() + $(window).height();
        if (elementTop < windowBottom - 100) $(this).addClass('animated');
    });
}

$(window).on('scroll', animateOnScroll);

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS (other elements)
// ============================================
if ('IntersectionObserver' in window) {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('fade-in');
        });
    }, observerOptions);

    document.querySelectorAll('.category, .contact-info, .contact-form').forEach(el => {
        observer.observe(el);
    });
}
