$(function() {

    
    //$('.content__list').pagepiling();

    /* $('.wrapper').pagepiling({
        sectionSelector: '.section',
    }); */

    function introCheck() {
        $.each($('._check-load img'), function() {
            if($(this).width() == 0) return false;
        });
    }
    
    function introInterval() {
        if(introCheck() != false) {

            $('._check-load').addClass('loaded');
            
    
            clearInterval(introIntervalId);
        }
    }
    let introIntervalId = setInterval(introInterval, 100);
    

    let header = $('.header'), body = $('body'), burger = $('.header__mobile-btn-nav'), nav = $('.header__nav');

    

    burger.on('click', function() {

        $([burger, nav, body]).toggleClass('_nav-active');

    });

    body.on('click', function(e) {
        //console.log($('.header__nav--list').has(e.target).length == 0);
        if($('.header__nav--list').has(e.target).length == 0 && $('.header__mobile-btn-nav').has(e.target).length == 0) $('.header__mobile-btn-nav, body, .header__nav').removeClass('_nav-active');

        if($('.header__account').has(e.target).length == 0) $('.header__account').removeClass('_active');
    });

    var rellax = new Rellax('.rellax', {
        center: true
      });

    

      $('.btn-to-scroll').on('click', function() {

        let toScroll = $($(this).attr('href')).offset().top;

        $('html, body').animate({
            scrollTop: toScroll - header.height()
        }, 1500);

      });

      


    $('.header__account--avatar').on('click', function() {
        if(windowSize() <= 992) $('.header__account').toggleClass('_active');
    });

    function windowSize(arg) {
        return $(window).width();
    }
    let resize769 = [769];
    if(windowSize() >= 769) resize769[1] = true; else resize769[1] = false;



    function sectionCounterFunc() {
        let arr = [], i = 0;
        
        $.each($('.section'), function() {
            arr[i] = [$(this).attr('id'), $(this).offset().top, false];
            i++;
        });

        return arr;
    }


    let sectionCounterList;


    function mediaEvents(w) {
        
        if(w <= 992 && $('.header__account--list').find('.header__account--name').length == 0) {
            $('.header__account--name').prependTo('.header__account--list')
        } else if(w >= 992 && $('.header__account--list').find('.header__account--name').length != 0) {
            $('.header__account--name').prependTo('.header__account--menu');
        } else if(w >= 992) {

            sectionCounterList = sectionCounterFunc();

        }
        
        if(w <= resize769[0] && resize769[1] == false) {
            resize769[1] = true;
            rellax.destroy();

        } else if(w >= resize769[0] && resize769[1] == true) {
            resize769[1] = false;
            rellax.refresh();

        }



        /* $('html').css('--window-width', if() {

        }); */
        //console.log(h);
        /* let value;
        if(w > h) {
            if((w + 200) > h) value = (w - h); else value = (w - h);
            
            $('html').css('--window-width', `${h / 1.5}px`);
        } else {
            let value = (h - w) / 2;
            $('html').css('--window-width', `${h / 1.5}px`);
        } */
    }
    mediaEvents(windowSize());
    $(window).resize(function() {
        mediaEvents(windowSize());
    })


    let sectionCounter = $('.section'), sectionCounterCheck, sectionCounterCheckFuncIf;

        function sectionCounterPos() {
            let sectionCounterPos = header.offset().top / ($(window).height() / 2) * 100;

            if(sectionCounterPos <= 100) {
                $('.section-counter').css('transform', `translate(0,-${sectionCounterPos}%`)
            } else {
                $('.section-counter').css('transform', `translate(0,-100%`)
            }
        }

        function sectionCounterCheckFunc(arg) {
            
            for(let i = 0; i >= sectionCounterCheck.length; i++) {
                if(sectionCounterCheck[i] >= arg) sectionCounterCheckFuncIf = true;
            }

        }
        
        
        function windowScroll() {

            sectionCounterPos();

            if(windowSize() >= 992) {
                for(let i = sectionCounter.length - 1; i >= 0; i--) {

                    if(sectionCounterList[i][1] <= header.offset().top + header.height() + 5) {
                        
                        if(sectionCounterCheck != sectionCounterList[i][1]) {
    
                            sectionCounterCheck = sectionCounterList[i][1];
    
                            $(`.section-counter__item._active`).removeClass('_active');
    
                            $(`.section-counter__item[href="#${sectionCounterList[i][0]}"`).addClass('_active');
    
                        }
                        break;
                        
                    }
                }
            }
            

        }
        windowScroll();
        $(window).scroll(function() {
            windowScroll();
        });

    function hHeader(settings) {

        let header = settings.elemName,
            distance = settings.distance,
            scrollPrev = 0, ifHeaderTopClass, ifHeaderTopDistance,
            scrollDown = distance,
            distanceHide = settings.distanceHide,
            distanceShow = settings.distanceShow,
            scrolled = $(window).scrollTop(),
            scrollDownCheck = false,
            scrollTop = 0,
            scrollTopCheck = false,
            scrollToTop = false,
            scrollToDown = false;





        scrollDown = distanceHide;

        ifHeaderTopClass = settings.ifHeaderTop[0];
        ifHeaderTopDistance = settings.ifHeaderTop[1];

        //var headerHeight = $(header).height();


        function ifHeaderTop() {
            if (scrolled <= ifHeaderTopDistance) {
                header.addClass(ifHeaderTopClass);
            }
            else if (scrolled > ifHeaderTopDistance) {
                header.removeClass(ifHeaderTopClass);
            }
        }

        ifHeaderTop();

        if (typeof settings.loaded == 'string') {
            let classLoaded = settings.loaded;
            header.addClass(classLoaded);
        }
        else if (settings.loaded == true && typeof settings.loaded == 'boolean') {
            header.addClass('loaded');
        }

        /* $(window).resize(function () {
            mediaEvents();
        }); */
        function btnToTop() {
            if (scrolled < 150) {
                $('.btn-to-top').addClass('hide');
            }
        }
        btnToTop();

        
        
        

        

        
        $(window).scroll(function () {

            let sectionCounterPos = header.offset().top / ($(window).height() / 2) * 100;

            if(sectionCounterPos <= 100) {
                $('.section-counter').css('transform', `translate(0,-${sectionCounterPos}%`)
            }

            
            
            scrolled = $(window).scrollTop();
            if (scrolled == 0) {
                $(header).removeClass(settings.classToHide);
                scrollTopCheck = true;
            }
            if (scrolled == Math.trunc(body.height() - $(window).height())) {
                $('.btn-to-top').removeClass(settings.classToHide);
            }
            ifHeaderTop();
            btnToTop();

            if (scrolled > 100 && scrolled > scrollPrev) {
                if (scrollToDown == false) {
                    scrollToTop = false;
                    scrollDown = scrolled + distanceHide;
                    scrollDownCheck = false;
                    scrollToDown = true;
                }

            } else if (scrollToTop == false) {

                scrollToDown = false;
                scrollTop = scrolled - distanceShow;
                scrollTopCheck = false;
                scrollToTop = true;
            }

            scrollPrev = scrolled;
            if (scrolled >= scrollDown && scrollDownCheck == false) {
                // hide elem
                $(header).addClass(settings.classToHide);
                
                $('.btn-to-top').addClass(settings.classToHide);
                
                scrollDownCheck = true;
            }
            if (scrollTop >= scrolled && scrollTopCheck == false) {
                // show elem
                $(header).removeClass(settings.classToHide);
                $('.btn-to-top').removeClass(settings.classToHide);
                
                scrollTopCheck = true;
            }

            if (scrolled >= ($('.wrapper').height() - 100 - $(window).height())) {
                $('.btn-to-top').removeClass(settings.classToHide);
            }

            let activeHeaderOnMouse = false;
            body.on('mousemove', function (e) {
                if (e.clientY <= 15 && header.hasClass('hide') && activeHeaderOnMouse == false) {
                    activeHeaderOnMouse = true;
                    $(header).removeClass(settings.classToHide);
                    scrollDown = scrolled + distanceHide;
                    scrollDownCheck = false;
                    /* if($('.sticky-wrapper').hasClass('is-sticky')) {
                
                        $('.filter').addClass('_is-sticky').css('transition', 'transform .25s ease-in-out').css('transform', `translate(0px, ${headerHeight}px)`);
                    } */
                }
            })

        });
        setTimeout(function () {
            $(header).fadeIn(200)
        }, 400)

    }

    hHeader({
        elemName: $(header),
        classToHide: 'hide',
        distanceHide: 200,
        distanceShow: 100,
        ifHeaderTop: ['top', 0],
        classAnchorForTop: true,
        loaded: 'loaded'
    });


    new WOW(
        {
            mobile: true,
        }).init();


});

