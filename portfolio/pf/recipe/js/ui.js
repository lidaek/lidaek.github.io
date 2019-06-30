$(document).ready(function(){
    edit();
    clickEvent();
    mLayer();
    eSideExpand();
    eRemove();
    eDropDown();
    eSlideUp();
    eToggle();
    group();
    eDisabeld();
    eMaterial();
    eFold();
    eFoldGroup();
    eFaqAccordion();

    /*ePosClick*/
    $('body').delegate('.ePosTarget .ePosClick', 'click', function(e){
        var findTooltip = $(this).parents('.mTooltip');
        var findTarget = findTooltip.find('.tooltip');
        var propDisplay= findTarget.css('display');
        $(this).toggleClass('active');

        findTarget.fadeToggle();

        if(propDisplay == "none"){
            layerPosition($(this), "LRTB", e);
        }
        e.preventDefault();
    });

    $('body').delegate('.tooltip .eClose', 'click', function(e){
        var findTarget = $(this).parent('.tooltip');
        var findTargetsiblings = $(this).parent('.tooltip').siblings('.ePosClick ');

        findTarget.fadeOut();
        findTargetsiblings.removeClass('active');
        e.preventDefault();
    });
});

// 전역 > 아이템 한개씩 slideUP 효과
function eSlideUp() {
    $('.eSlideUp').each(function (i) {
        var $up = $(this);
        setTimeout(function () {
            $up.addClass('show');
        }, i * 200);
    });
}

// 전역 > 클릭시 드롭 다운
function eDropDown() {
    var findTarget = $(".eDropDown");
    findTarget.click(function () {
        $(this).parent().toggleClass('selected');
    });
}

// 전역 > 클릭시 selected 토글
function eToggle() {
    var findTarget = $(".eToggle").children();
    findTarget.click(function () {
        $(this).addClass('selected');
        $(this).siblings().removeClass('selected');
    });
}

// 전역 > mChannel 아코디언 타입
function clickEvent() {
    $('.eAccordion').click(function(){
        $(this).closest('.mChannel').toggleClass('selected');
        $(this).closest('.channelArea').siblings().find('.mChannel').removeClass('selected');
    });
    $('.eClick').click(function(){
        $(this).toggleClass('active');
        $(this).parent().toggleClass('selected');
    });
}

// 전역 > tab
$('body').delegate('.eTab a', 'click', function(e){
    var _li = $(this).parent('li').addClass('selected').siblings().removeClass('selected'),
        _target = $(this).attr('href'),
        _siblings = $(_target).attr('class'),
        _arr = _siblings.split(" "),
        _classSiblings = '.'+_arr[0];

    $(_target).show().siblings(_classSiblings).hide();

    // gExtend ctrl
    var mtab = $(this).parents('.mTab:first');
    if($(this).siblings('ul').length > 0){
        if(!mtab.hasClass('gExtend')){
            mtab.addClass('gExtend');
        }
    } else {
        if($(this).parents('ul:first').siblings('a').length <= 0){
            mtab.removeClass('gExtend');
        }
    }
    e.preventDefault();
});


// 전역 > 레이어 팝업 mLayer
function mLayer(){
    // 레이어 팝업 : 닫기
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
        var findTarget = $('.eLayerClick'),
            propClass = findTarget.hasClass('active');
        if(findTarget.length > 0 && propClass){
            findTarget.removeClass('active');
        }
        $.mLayer_close($(this));
        $('html').css('overflow','' );
        e.preventDefault();
    });

    // 레이어 팝업 : eLayerClick
    $('body').delegate('.eLayerClick', 'click', function(e){
        var findThis = $(this),
            findTarget = $($(this).attr('href')),
            propTop = findThis.offset().top+findThis.height()+5,
            propLeft = findThis.offset().left,
            propClass = findThis.hasClass('active');
        if(propClass){
            findTarget.hide();
        }else{
            findTarget.css({'top':propTop, 'left':propLeft}).show();
        }
        findThis.toggleClass('active');
        e.preventDefault();
    });

    // 레이어 팝업 : eModal
    $('body').delegate('.eModal', 'click', function(e){
        var findTarget = $($(this).attr('href'));
        //call dimmed layer position function
        dimmedLayerPosition(findTarget);
        //findTarget.addClass("typeModal");
        findTarget.parent().append('<div id="dimmed_'+ findTarget.attr('id') +'" class="dimmed"></div>');
        if($('.dimmed').length > 1 ){
            $('.dimmed').addClass('hide');
            var propZIndex = 110 + $('.dimmed').length;
            $(findTarget).css({'zIndex':propZIndex+5});
            $('#dimmed_'+ findTarget.attr('id')).css({ 'zIndex' : propZIndex }).removeClass('hide');
        }
        e.preventDefault();
    });

    // 레이어 팝업 : eModal dimmed
    function dimmedLayerPosition(target){
        if(!target.attr('fixed')){
            var findLayer = target,
                propWinWidth = $(window).width(),
                propWinHeight = $(window).height(),
                propWidth = findLayer.outerWidth(),
                propHeight = findLayer.outerHeight(),
                propWinScroll = $(window).scrollTop();

            if(findLayer.hasClass('typeFull')){
                findLayer.css('display', 'block')
                $('html').css('overflow', 'hidden')
            }
            else if(findLayer.hasClass('typePopup')){
                findLayer.css({'left':0, 'marginLeft':0});
            }else{
                if(propWinWidth < propWidth){
                    findLayer.css({'left':0, 'marginLeft':0});
                }
                else {
                    var propLeft = propWidth/2;
                    findLayer.css({'left':'50%', 'marginLeft':'-'+ propLeft +'px'});
                }
            }

            var propTop = (propWinHeight/2) - (propHeight/2) + propWinScroll;
            findLayer.css({'top':propTop});

            findLayer.show();
        }
    }
}


function layerPosition(_this, str, e){
    // 툴팁의 넓이 + offset좌표 의 값이 body태그의 width보다 클때 좌표값 왼쪽으로 이동

    var thisTarget = _this.parents('.mLayer') || _this.parents('#popup'),
        bodyTarget,
        offsetLeftNum = 0;

    if(thisTarget.length >= 1){
        bodyTarget = thisTarget;
        offsetLeftNum = bodyTarget.offset().left;
    }else{
        bodyTarget = $('#contents');
    }

    var bodyWidth = bodyTarget.width(),
        findTarget = $(_this.siblings('.ePosLayer')),
        targetWidth = findTarget.outerWidth(),
        offsetLeft = (_this.offset().left-offsetLeftNum),
        posWidth = targetWidth + offsetLeft;

    if(str == "LRTB"){
        if(bodyWidth < posWidth){
            findTarget.parents('.ePosTarget').addClass('posRight').removeClass('posLeft');
            if(findTarget.offset().left <= 5){
                findTarget.parents('.ePosTarget').addClass('posLeft').removeClass('posRight');
            }
        } else {
            findTarget.parents('.ePosTarget').addClass('posLeft').removeClass('posRight');
        }
    }

    // 툴팁의 top 값이 window height값보다 클때 좌표값 상단으로 이동
    var findFooter = $('#footer'),
        bodyTargetH,
        propFooterHeight = 0,
        offsetTopNum = 0;

    if(thisTarget.length >= 1){
        bodyTargetH = thisTarget.find('.wrap');
        propFooterHeight = 0;
        offsetTopNum = bodyTargetH.offset().top;
        propFooterHeight = 0;
    }else{
        bodyTargetH = $(window);

        if(findFooter.length >= 1){
            propFooterHeight = findFooter.outerHeight();
        }
    }

    var propwindowHeight = bodyTargetH.height()-propFooterHeight,
        targetHeight = findTarget.outerHeight(),
        propscrollTop = bodyTargetH.scrollTop();
    if(thisTarget.length >= 1){ propscrollTop = 0; }

    var offsetTop = (_this.offset().top-offsetTopNum),
        posHeight = (offsetTop-propscrollTop)+targetHeight+_this.height();

    if(propwindowHeight < posHeight){
        var propHeight = (offsetTop-propscrollTop) - targetHeight;
        var propHeadHeight = 0;
        if($('#header').length >= 1 && thisTarget.length < 1){
            propHeadHeight = $('#header').height();
        }

        if(propHeight > propHeadHeight){
            findTarget.parents('.ePosTarget').addClass('posTop').removeClass('posBottom');
        }else{
            findTarget.parents('.ePosTarget').addClass('posBottom').removeClass('posTop');
        }
    }else{
        findTarget.parents('.ePosTarget').addClass('posBottom').removeClass('posTop');
    }

    e.preventDefault();
}