$(document).ready(function(){
    //mLayer
    function mLayer(){
        // mLayer : close
        $.mLayer_close = function(target){
            var findParent = target.parents('.mLayer:first');
            var findDimmed = $('#dimmed_' + findParent.attr('id'));
            findParent.hide();
            if(findDimmed){
                if($('.dimmed').length > 1){
                    $('.dimmed').removeClass('hide');
                }
                findDimmed.remove();
            }
            return false;
        }
        $('body').delegate('.mLayer .eClose', 'click', function(e){
            $('body').removeClass('hidden')
            $.mLayer_close($(this));
            e.preventDefault();
        });
        // mLayer : eLayerClick
        $('body').delegate('.eLayerClick', 'click', function(e){
            var findThis = $(this),
                propBtnWidth = findThis.outerWidth(),
                findTarget = $($(this).attr('href')),
                propTargetWidth = findTarget.outerWidth(),
                propDocWidth = $(document).width(),
                propTop = findThis.offset().top+30,
                propLeft = findThis.offset().left,
                figure = propLeft + propTargetWidth,
                propMarginLeft = 0;
            findTarget.css({'top':propTop}).show();
            e.preventDefault();
        });
        // eModal : dimmed layer position
        function dimmedLayerPosition(target){
            $('body').addClass('hidden')
            if(!target.attr('fixed')){
                var findLayer = target,
                    propWinWidth = window.innerWidth,
                    propWinHeight = $(window).height(),
                    propWidth = findLayer.outerWidth(),
                    propHeight = findLayer.outerHeight();
                    //propWinScroll = $(window).scrollTop()
                if(propWinHeight < propHeight){
                    window.scrollTo(0,0);
                    findLayer.css({'top':0});
                } else {
                    var propTop = (propWinHeight/2) - (propHeight/2);
                    findLayer.css({'top':propTop});
                }
                findLayer.show();
            }
        }
        // eModal : show
        $('body').delegate('.eModal', 'click', function(e){
            var findTarget = $($(this).attr('href'));
            //call dimmed layer position function
            dimmedLayerPosition(findTarget);
            findTarget.parent().append('<div id="dimmed_'+ findTarget.attr('id') +'" class="dimmed"></div>');
            if($('.dimmed').length > 1 ){
                $('.dimmed').addClass('hide');
                var propZIndex = 110 + $('.dimmed').length;
                $(findTarget).css({'zIndex':propZIndex+5});
                $('#dimmed_'+ findTarget.attr('id')).css({ 'zIndex' : propZIndex }).removeClass('hide');
            }
            e.preventDefault();
        });
    }mLayer();

    // mTab
    $(".eTab a").click(function(e){
        var _li = $(this).parent("li").addClass("selected").siblings().removeClass("selected"),
            _target = $(this).attr("href"),
            _siblings = "." + $(_target).attr("class");
        $(_target).show().siblings(_siblings).hide();
        e.preventDefault();
    });


    var $frame = $('.mTab.typeNav.gSwipe .inner');
    var $wrap = $frame.parent();
    var $ogrMinWidth = $frame.find('ul li').css("min-width");
    var startMenuNum = 0;

    $frame.find('ul li').each(function(i){
        var hasBol = $(this).hasClass('selected');
        if(hasBol){
            startMenuNum = i;
        }
    });

    function slyCall(){
        $frame.sly(false); //sly destroy

        var frameWidth = $frame.find('ul li').width();
        if(frameWidth <= 81){frameWidth = 81 };
        $frame.find('ul li').css({"min-width":frameWidth});

        if(startMenuNum > 0){
            startMenuNum = startMenuNum-1;
        }

        // Call Sly on frame
        $frame.sly({
          horizontal: 1,
          itemNav: 'basic',
          smart: 1,
          mouseDragging: 1,
          touchDragging: 1,
          releaseSwing: 1,
          startAt: startMenuNum,
          scrollBy: 1,
          speed: 300,
          elasticBounds: 1,
          easing: 'easeOutExpo',
          dragHandle: 1,
          dynamicHandle: 1,
          clickBar: 1,
          prevPage: $wrap.find('.btnPrev'),
          nextPage: $wrap.find('.btnNext')
        });

        $frame.sly('on', 'load move', fn);
        function fn(eventName){
            var preBol = $wrap.find('.btnPrev').hasClass('disabled');
            var nextBol = $wrap.find('.btnNext').hasClass('disabled');
            if(!preBol && !nextBol){
                $frame.addClass('btnMargin');
            }else{
                $frame.removeClass('btnMargin');
            }
        }
    }

    $(window).resize(function(){
        if($frame){
            $frame.find('ul li').css({"min-width":$ogrMinWidth});
            slyCall();
        }
    }).resize();


    // footer > address
    $('.address').click(function(){
        blockViewEvent(this, "address");
    });

    // footer > family site
    $('.familysite').click(function(){
        blockViewEvent(this, "familysite");
    });

    // footer > 사업자 정보 toggle ,펼칠경우 스크롤을 하단으로 지정해줌.
    function blockViewEvent(_this, str){
        if(str == "address"){
            var name = 'div.info';
            $(_this).toggleClass('selected');
            var hnum = $(document).height()+500;
            $('html, body').animate({scrollTop:hnum}, 'fast');
        }else{
            var name = "ul";
        }
        $(_this).children(name).slideToggle('fast','swing');
    }

    //sidebar
    $('.eOpenNav').click(function(){
        $('body').toggleClass('hidden');
        $('#wrap').toggleClass('openNav');
        if ($(this).parents($('#wrap')).hasClass('openNav')){
            $(this).children().text('대메뉴 닫기');
        } else {
            $(this).children().text('대메뉴 열기');
        }
    });
    $('.eCloseNav').click(function(){
        $('body').removeClass('hidden');
        $('#wrap').removeClass('openNav');
        if ($(this).parents($('#wrap')).hasClass('openNav')){
            $(this).children().text('대메뉴 닫기');
        } else {
            $(this).children().text('대메뉴 열기');
        }
    });

    //sidebar > lnb > eFold
    function eFold() {
        $('.eFold').click(function () {
            $(this).parent('li').toggleClass('selected');
        });
    }
    eFold();

    // main > quick menu
    function eQuickMenu() {
        $('.quickMenu .eClose').click(function () {
            $(this).parents('.quickMenu').removeClass('open');
        });

        $('.eQuickMenu').click(function () {
            if($(this).parents('.quickMenu').hasClass('open')){
                $(this).parents('.quickMenu').removeClass('open');
            }else{
                $(this).parents('.quickMenu').addClass('open');
            };
        });
    }
    eQuickMenu();

    // main > key visual slide
    $(".mSlide").slick({
        infinite:true,
        arrows:true,
        dots:true,
        dotsClass:'paging',
        centerMode:true,
        autoplay:true,
        swipeToSlide:true,
        autoplaySpeed:2000,
        speed:1000,
        prevArrow: '<button type="button" class="btnSlide prev">이전 보기</button>',
        nextArrow: '<button type="button"  class="btnSlide next">다음 보기</button>'
    });

    // main > notice
    $(".mNotice .notice").slick({
        infinite:true,
        autoplay:true,
        swipeToSlide:true,
        autoplaySpeed:2000,
        speed:1000,
        vertical:true,
        prevArrow:false,
        nextArrow:false
    });

    // main > head scroll
    $(window).scroll(function () {
        scrollEvent();
    });
    function scrollEvent(){
        var headerHeight = 0; //$('#header').height();
        if(headerHeight < $(window).scrollTop()){
            $('#header').addClass('fixed');
        }else{
            $('#header').removeClass('fixed');
        }
    }

    function eExpand() {
        var expandItem = $('.eExpandItem');

        expandItem.hide();
        $('.eExpand').click(function () {
            var parent = $(this).parents('.foldArea');
            if (parent.hasClass('selected')){
                expandItem.slideUp();
                $(this).parents('.foldArea').removeClass('selected');
                if(parent.hasClass('inquire')){
                    $(this).html('추가정보 입력 열기 <i class="icoAngle down theme1"></i>');
                }else{
                    $(this).html('상세보기 <i class="icoAngle down theme1"></i>');
                }

            } else {
                expandItem.slideDown();
                $(this).parents('.foldArea').addClass('selected');
                if(parent.hasClass('inquire')){
                    $(this).html('추가정보 입력 접기 <i class="icoAngle up theme1"></i>');
                }else{
                    $(this).html('접기 <i class="icoAngle up theme1"></i>');
                }

            }

        })
    }
    eExpand();

});
