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
            return false
        }
        $('body').delegate('.mLayer .eClose', 'click', function(e){
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
            if(!target.attr('fixed')){
                var findLayer = target,
                    propWinWidth = window.innerWidth,
                    propWinHeight = $(window).height(),
                    propWidth = findLayer.outerWidth(),
                    propHeight = findLayer.outerHeight(),
                    propWinScroll = $(window).scrollTop();
                if(propWinHeight < propHeight){
                    window.scrollTo(0,0);
                    findLayer.css({'top':0});
                } else {
                    var propTop = (propWinHeight/2) - (propHeight/2) + propWinScroll;
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

    // toolTip
    function mTooltip(){
        // 고정
        $('.mTooltip').each(function(i){
            var bodyWidth = $('body').width(),
                targetWidth = $(this).outerWidth(),
                offsetLeft = Math.ceil($(this).offset().left),
                posWidth = ($(this).find('.tooltip').outerWidth()/2),
                chkWidth = bodyWidth - posWidth;

            if(chkWidth < offsetLeft){
                $(this).addClass('posRight');
            } else {
                if(offsetLeft < posWidth){
                    $(this).addClass('posLeft');
                }
            }
        });

        $('body').delegate('.mTooltip .icon', 'click', function(e){
            var findShow = $(this).parents('.mTooltip:first').hasClass('show');

            if(findShow){
                $('.mTooltip').removeClass('show');
            }else{
                $('.mTooltip').removeClass('show');
                $(this).parents('.mTooltip:first').addClass('show');
            }
        });
    }mTooltip();

    // mTab
    $(".eTab a").click(function(e){
        // 클릭한 li 에 selected 클래스 추가, 기존 li에 있는 selected 클래스는 삭제.
        var _li = $(this).parent("li").addClass("selected").siblings().removeClass("selected"),
            _target = $(this).attr("href"),
            _siblings = "." + $(_target).attr("class");

        //클릭한 탭에 해당하는 요소는 활성화, 기존 요소는 비활성화 함.
        $(_target).show().siblings(_siblings).hide();

        //preventDefault 는 a 태그 처럼 클릭 이벤트 외에 별도의 브라우저 행동을 막기 위해 사용됨.
        e.preventDefault();
    });


    var $frame = $('.mTab.typeNav.gScroll > div');
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
            prevPage: $wrap.find('.btnSwipePrev'),
            nextPage: $wrap.find('.btnSwipeNext')
        });

        $frame.sly('on', 'load move', fn);
        function fn(eventName){
            var preBol = $wrap.find('.btnSwipePrev').hasClass('disabled');
            var nextBol = $wrap.find('.btnSwipeNext').hasClass('disabled');
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

    // toggleArea
    $(".toggleArea .eToggle").click(function(e){
        var findParent = $(this).parents(".toggleArea:first");
        var findTarget = findParent.children(".mInfo");
        var findParentSibling = $(this).parents(".toggleArea:first").siblings(".toggleArea");

        if(findTarget.css("display") == "none"){
            findParent.addClass("selected");
            findParentSibling.removeClass("selected");
        } else {
            findParent.removeClass("selected");
        }
        e.preventDefault();
    });

    // mSelect
    $(".mSelect button").click(function(){
        $(this).parent().toggleClass('selected');
    });

    // mSetList typeCheck
    function addSelected(target) {
        var fParent = target.parent().parent();
        if(target.attr('checked') == "checked"){
            fParent.addClass('selected');
        } else {
            fParent.removeClass('selected');
        }
    }
    $(".mSetList.typeCheck > ul .fChk").click(function(){
        addSelected($(this));
    });
    $(".allChk").click(function(){
        var findRowChk = $(this).next().find('li').not('.disabled').find('.fChk');

        if($(this).parents().hasClass('mTitle') == true){
            findRowChk = $(this).parents('.mTitle').next().find('li').not('.disabled').find('.fChk');
        }

        if($(this).children('.fChk:checked').length > 0) {
            findRowChk.attr('checked', 'checked');
            $(this).children('span').text('전체해제');
        } else {
            findRowChk.removeAttr('checked');
            $(this).children('span').text('전체선택');
        }
        addSelected(findRowChk);
    });

    //사업자 정보 확장
    $('.address').click(function(){
        blockViewEvent(this, "address");
    });

    //family site 셀렉박스
    $('.familysite').click(function(){
        blockViewEvent(this, "familysite");
    });

    // 사업자 정보, family site 펼쳐있을경우 닫아줌.
    function autoCloseEvent(){
        var mode1 = $('.address dl').css("display");
        if(mode1 == "block"){
            blockViewEvent($('.address'), "address");
        }
        var mode2 = $('.familysite ul').css("display");
        if(mode2 == "block"){
            blockViewEvent($('.familysite'), "familysite");
        }
    }

    //사업자 정보 toggle ,펼칠경우 스크롤을 하단으로 지정해줌.
    function blockViewEvent(_this, str){
        if(str == "address"){
            var name = "dl";
            $(_this).toggleClass('selected');
            var hnum = $(document).height()+500;
            $('html, body').animate({scrollTop:hnum}, 'fast');
        }else{
            var name = "ul";
        }
        $(_this).children(name).slideToggle('fast','swing');
    }

    /* OpenNav_YJ */
    $('.eOpenNav').click(function(){
        $('#wrap').toggleClass('openNav');
        if ($(this).parents($('#wrap')).hasClass('openNav')){
            $(this).children().text('네비게이션 닫기');
        } else {
            $(this).children().text('네비게이션 열기');
        }
    });
    $('.eCloseNav').click(function(){
        $('#wrap').removeClass('openNav');
        if ($(this).parents($('#wrap')).hasClass('openNav')){
            $(this).children().text('네비게이션 닫기');
        } else {
            $(this).children().text('네비게이션 열기');
        }
    });

    /* Fold_YJ */
    $.fn.foldFunc = function(option){
        var opt = {
            btn : '.eFold',
            wrap : 'li',
            txt : '.icoFold'
        };
        opt = $.extend(opt, option);
        $(this).each(function(){
            var $btn = $(this).find(opt.btn);
            $btn.click(function(){
                $(this).parents(opt.wrap).toggleClass('selected');
                $(this).parents('li').siblings('li').removeClass('selected');
                $(this).parents('li').siblings('li').removeClass('expandMenu');
                if ($(this).parents(opt.wrap).hasClass('selected')){
                    $(this).children('span').text('접기');
                } else {
                    $(this).children('span').text('펼치기');
                }
                var num = $(this).parents('li').index();
                totalMenuCheck(num);
            });
        });
    };
    $('.lnb').foldFunc();
    $('.mAccordion').foldFunc();

    $('.eMenuToggle').click(function(){
        $(this).parents('.lnb>li').toggleClass('expandMenu');
        var num = $(this).parents('li').index();
        totalMenuCheck(num);
    });

    function totalMenuCheck(num){
        $('.eMenuToggle').each(function(i){
            if(i == num){
                if ($(this).parents('.lnb>li').hasClass('expandMenu')){
                    $(this).text('PC 제공 상품 접기');
                } else {
                    $(this).text('PC 제공 상품 보기');
                }
            }else{
                $(this).text('PC 제공 상품 보기');
            }
        });
    }

    /*메인 슬라이드*/
    var mainSlide = $(".mSlide .figure");
    if(mainSlide.length >= 1){
        var navMenuArr = [4, 3 ,2];
        var nowPageNum = 0;

        var mSlide = mainSlide.bxSlider({
            mode: 'horizontal',
            speed: 300,
            pager: false,
            auto: true,
            pause: 3000,
            autoHover: true,
            slideMargin: 0,
            onSlideAfter: function(e){
                nowPageNum = mSlide.getCurrentSlide();

                var pageNum,
                    cul,
                    arrPlus = 0;
                for(var j = 0; j<navMenuArr.length; j++){
                    var first = arrPlus;
                    arrPlus += navMenuArr[j];
                    var second = arrPlus;
                    if(nowPageNum >=first && nowPageNum < second){
                        pageNum = j;
                        cul = nowPageNum-first;
                    }
                }
                $('.paging').eq(pageNum).find('li').eq(cul).addClass('selected').siblings().removeClass('selected');
                $('.typeNav.gScrollClear li').eq(pageNum).addClass('selected').siblings().removeClass('selected');
                pageContrlEvent(pageNum);
            },
            onSliderResize: function(e){
                mainSlide.parent().css({'height':""});
            }
        });
        mainSlide.parent().css({'height':""});

        /*이전 슬라이드 이동*/
        $(".mSlide").find(".prev").click(function(e){
            mSlide.goToPrevSlide();
            return false;
        });

        /*다음 슬라이드 이동*/
        $(".mSlide").find(".next").click(function(e){
            mSlide.goToNextSlide();
            return false;
        });

        /* 메뉴 클릭 이벤트*/
        $('.typeNav.gScrollClear li').click(function(e){
            $(this).addClass('selected').siblings().removeClass('selected');

            var i = $(this).index();
            var moveNum = 0;
            if(navMenuArr.length > i){
                if(i <= 0){
                    moveNum = 0;
                }else{
                    for(var j = 0; j<i; j++){
                        moveNum += navMenuArr[j];
                    }
                }
                nowPageNum = moveNum;
                mSlide.goToSlide(moveNum);

                pageContrlEvent(i);
            }
        });

        /*하단 페이징 이벤트*/
        function pageContrlEvent(i){
            $('.mSlide').find('.paging').each(function(j){
                if(i == j){
                    $(this).show();
                }else{
                    $(this).hide();
                }
            });
        }

        /*페이징 클릭 이벤트*/
        $('.paging li').click(function(e){
            var fnum = ($(this).parents('.paging').index())-navMenuArr.length,
                num = $(this).index(),
                pNum = 0;
            if(fnum > 0){
                var plusNum = 0;
                for(var i=0; i<fnum; i++){
                    plusNum += navMenuArr[i];
                }
                pNum = plusNum+num
            }else{
                pNum = num;
            }
            mSlide.goToSlide(pNum);
        });
    }

    /*공지 사항 상하 슬라이드*/
    $(".web").find('.figure').bxSlider();
    var noticeSlide = $('.mNotice');
    if($('.mNotice').length >= 1){
        var noticeSlide = $('.mNotice').find('ul').bxSlider({
            mode: 'vertical',
            speed:500,
            auto: true,
            pause: 3000,
            slideMargin: 0,
            onSliderResize: function(e){
                noticeHeight();
            }
        });
        function noticeHeight(){
            var width = $('.mNotice').find('li').width();
            $('.mNotice').find('li').css({'width':(width-20)});
        }
    }
});
