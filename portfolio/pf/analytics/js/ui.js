$(document).ready(function(){

// CMC_README: 수정 시작
    $("body").on("click", ".mButton.typeToggle button", function() {
// CMC_README: 수정 끝

        $(this).toggleClass('selected');

// CMC_README: 추가 시작
        if ($(this).hasClass("buttonPlatformTotal")) {
            if ($(this).hasClass("selected")) {
                $(".buttonPlatformList").addClass("selected");
            }
            else {
                $(".buttonPlatformList").removeClass("selected");
            }
        }

        /*var url = $(".mAccordion.selected .eDetailView").attr("action-url");
         var par = $("#frm_layoutw").serialize();
         $(".mAccordion.selected .buttonPlatformList.selected").each(function() {
         par += "&ver_ids[]=" + $(this).val();
         });
         var div = $(".mAccordion.selected .eDetailView").attr("action-div");
         io_submit_post_div(url, par, div);*/
// CMC_README: 추가 끝

    });

    // toolTip
    // 고정
    $('body').delegate('.mTooltip .eTip', 'click', function(e){
        mTooltipMouseEvent(this, e);
    });
    // mouseover
    $('body').delegate('.mTooltip .eTipHover', 'mouseover', function(e){
        mTooltipMouseEvent(this, e);
    });

    function mTooltipMouseEvent(_this, e){
        var findSection = $(_this).parents('.section:first'),
            findTarget = $($(_this).siblings('.tooltip')),
            findTooltip = $('.tooltip'),
            findHover = $(_this).hasClass('eTipHover'),
            findShow = $(_this).parents('.mTooltip:first').hasClass('show');

        if(findShow && !findHover){
            $('.mTooltip').removeClass('show');
            findTarget.hide();
            findSection.css({'zIndex':0, 'position':'static'});
        }else{
            $('.mTooltip').removeClass('show');
            $(_this).parents('.mTooltip:first').addClass('show');
            findSection.css({'zIndex':0, 'position':'static'});
            findSection.css({'zIndex':100, 'position':'relative'});

            // 툴팁의 넓이 + offset좌표 의 값이 body태그의 width보다 클때 좌표값 왼쪽으로 이동
            var bodyWidth = $('body').width(),
                targetWidth = findTarget.outerWidth(),
                offsetLeft = $(_this).offset().left,
                posWidth = targetWidth + offsetLeft;

            if(bodyWidth < posWidth){
                var propMarginLeft = (targetWidth+$(_this).width()+10);
                var propWidth = offsetLeft - targetWidth;
                if(propWidth > 0){
                    findTarget.addClass('posRight').css({'marginLeft': '-'+ targetWidth +'px' });
                }else{
                    findTarget.removeClass('posRight').css({'marginLeft': 0 });
                }
            } else {
                findTarget.removeClass('posRight').css({'marginLeft': 0 });
            }
            // 툴팁의 top 값이 window height값보다 클때 좌표값 상단으로 이동
            var findFooter = $('#footer');
            var propFooterHeight = 0;
            if(findFooter.length >= 1){
                propFooterHeight = findFooter.outerHeight();
            }
            var propwindowHeight = $(window).height()-propFooterHeight,
                targetHeight = findTarget.outerHeight(),
                propscrollTop = $(window).scrollTop();
            offsetTop = $(_this).offset().top,
                posHeight = (offsetTop-propscrollTop)+targetHeight+$(_this).height();

            if(propwindowHeight < posHeight){
                var propMarginTop = (targetHeight+$(_this).height()+10);
                var propHeight = (offsetTop-propscrollTop) - targetHeight;
                if(propHeight > 0){
                    findTarget.addClass('posTop').css({'marginTop': '-'+ propMarginTop +'px' });
                }else{
                    findTarget.removeClass('posTop').css({'marginTop': 0 });
                }
            }else{
                findTarget.removeClass('posTop').css({'marginTop': 0 });
            }

            findTooltip.hide();
            findTarget.show();

            if($('#tooltipSCrollView').length > 0){
                $('#tooltipSCrollView').remove();
            }
        }
        e.preventDefault();
    }

    // 동적
    $('body').delegate('.mTooltip .eTipScroll', 'click', function(e){
        $('#tooltipSCrollView').remove();

        var findShow = $(this).parents('.mTooltip:first').hasClass('show');
        if(findShow){
            $('.mTooltip').removeClass('show');
        }else{
            var tooltip = $(this).siblings('.tooltip').clone();
            var prevClass = $(this).parent('.mTooltip').attr('class');
            $('body').append('<div id="tooltipSCrollView" class="'+ prevClass +'" virtual="true">');
            $('#tooltipSCrollView').append(tooltip);

            $('.mTooltip').removeClass('show');
            $(this).parents('.mTooltip:first').addClass('show');

            var findThis = $(this),
                findTarget = $('#tooltipSCrollView').find('.tooltip'),
                propTargetWidth = findTarget.outerWidth(),
                propDocWidth = $(document).width(),
                propTop = findThis.offset().top+5,
                propLeft = findThis.offset().left,
                figure = propLeft + propTargetWidth,
                propMarginLeft = '-12px',
                propMarginTop = findThis.outerHeight();

            if(propDocWidth <= figure){
                propLeft = propLeft - propTargetWidth + 20;
                findTarget.addClass('posRight');
            } else {
                findTarget.removeClass('posRight');
            }
            findTarget.css({'top':propTop, 'left':propLeft, 'marginLeft':propMarginLeft, 'marginTop':propMarginTop}).show();

            $('.mTooltip .icon').each(function(i){
                var findScroll = $(this).hasClass('eTipScroll');
                if(!findScroll){
                    $(this).parent().removeClass('show');
                    $(this).parent().find('.tooltip').hide();
                }
            });
        }
        e.preventDefault();
    });

    $('body').delegate('.mTooltip .eClose', 'click', function(e){
        // 동적
        if($(this).parents('.mTooltip:first').attr('virtual')){
            $('#tooltipSCrollView').remove();
        } else {
            var findSection = $(this).parents('.section:first');
            var findTarget = $(this).parents('.tooltip:first');
            findTarget.hide();
            findSection.css({'zIndex':0, 'position':'static'});
        }
        $('.mTooltip').removeClass('show');
        e.preventDefault();
    });


    // tab(old)
    $.eTab = function(ul){
        $(ul).find('a').click(function(e){
            var _li = $(this).parent('li').addClass('selected').siblings().removeClass('selected'),
                _target = $(this).attr('href'),
                _siblings = '.' + $(_target).attr('class');
            $(_target).show().siblings(_siblings).hide();
            e.preventDefault();
        });
    }
    if ( window.call_eTab ) {
        call_eTab();
    };
    // tab(new)
    $('.mTab').each(function(){
        var selected = $(this).find('> ul > li.selected > a');
        if(selected.siblings('ul').length <= 0){
            $(this).removeClass('gExtend');
        }
    });

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

    $(".mSelect .selected").click(function(e){
        var findParent = $(this).parent(".mSelect");
        if(findParent.hasClass("open")){
            findParent.removeClass("open")
        } else {
            findParent.addClass("open")
        }
        e.preventDefault();
    });
    $(".option li a").click(function(e){
        var mSelectBox = $(".mSelect");
        if(mSelectBox.hasClass("open")){
            mSelectBox.removeClass("open")
        }
        e.preventDefault();
    });

    $('.btnViewtype').click(function () {
        if ($(this).hasClass('day')) {
            $(this).removeClass('day');
            $(this).text('플랫폼별 보기');
        }else {
            $(this).addClass('day');
            $(this).text('일자별 보기');
        }
        $(this).parent('li').siblings('li').removeClass('selected');
        $(this).parent('li').siblings('li').children('.more').text('펼치기');
        return false;
    });


    $('.eOenNav').click(function () {
        $('#wrap').addClass('openNav');
    });

    $('#navigation .btnClose').click(function () {
        $('#wrap').removeClass('openNav');
    });

    $('.eFold').click(function () {
        if ($(this).parent('li').hasClass('selected')) {
            $(this).parent('li').removeClass('selected');
            $(this).children('.more').text('펼치기');
        }else {
            $(this).parent('li').addClass('selected');
            $(this).children('.more').text('접기');
        }
        $(this).parent('li').siblings('li').removeClass('selected');
        $(this).parent('li').siblings('li').children('.more').text('펼치기');
        return false;
    });

    $('.dimmed').click(function () {
        $('#wrap').removeClass('openNav');
    });

// CMC_README: 추가 시작
    $("body").on("click", ".RMB", function() {
        $(this).parents(".mData").find("tbody:hidden").each(function(i) {
            if (i < 20) {
                $(this).show();
            }
            else {
                return false;
            }
        });

        if ($(this).parents(".mData").find("tbody:hidden").length == 0) {
            $(this).html("");
        }
    });
// CMC_README: 추가 끝

    var windowWidth = $(window).width();
    if(windowWidth < 768){

        //모바일 체크
        var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
        if (mobile) {
            // 유저에이전트를 불러와서 OS를 구분합니다.
            var userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.search("android") > -1){
                currentOS = "android";
            }else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1) || (userAgent.search("ipad") > -1)){
                currentOS = "ios";
            }else{
                currentOS = "else";
            }
        } else {
            // 모바일이 아닐 때
            currentOS = "nomobile";
        }

        var titleHeight = $('section').find('.eTitle').innerHeight(),
            mode = "none",
            maxHeight = document.body.offsetHeight - window.innerHeight,
            interval = null;

        setTimeout(startEvent, 500);

        function startEvent(){
            titleHeight = $('section').find('.eTitle').innerHeight();
            iosTitleClone();
            scrollEvent();
        }

        //디테일뷰 클릭시 클릭한 리스트 위치로 스크롤 이동
// CMC_README: 수정 시작
        $("body").on("click", ".eDetailView", function() {
// CMC_README: 수정 끝
            $(this).parents('.mAccordion').toggleClass('selected');
            $(this).parents('.mAccordion').siblings('.mAccordion').removeClass('selected');
            $(this).parents('section').siblings('section').children('.mAccordion').removeClass('selected');


// CMC_README: 추가 시작
            /*
             var url = $(this).attr("action-url");
             var par = $("#frm_layoutw, #frm_layoutw_segment").serialize();
             var div = $(this).attr("action-div");
             io_submit_post_div(url, par, div);
             */
// CMC_README: 추가 끝

            var target = $(this);
            interval = setInterval(function(){
                var id = target.parents('.mAccordion').find('.mChart').length;
                if(id >= 1){
                    clearInterval(interval);
                    interval = null;
                    eDetailViewClickEvent(target);
                }
            }, 100);
        });

        function eDetailViewClickEvent(target){
            var titleTop = $('.eTitle h3').innerHeight();
            var top = target.parents('.mAccordion').position().top - ($('.contents').position().top+titleTop);
            $('body').animate({scrollTop :top }, 'fast');

            if(currentOS == "ios"){
                var bol = target.parents('.mAccordion').hasClass('selected'),
                    index = (target.parents('section').index()-1),
                    len = $('.contents').find('section').length,
                    top = $('.contents').position().top;

                for(var i=0; i<len; i++){
                    if(i == index && bol){
                        $('.contents').find('section').eq(i).css({'margin-top':titleHeight});
                        $('.contents').find('section').eq(i).find('.eTitle').css({'top':(top-1)});
                    }else{
                        $('.contents').find('section').eq(i).css({'margin-top':''});
                        $('.contents').find('section').eq(i).find('.eTitle').removeClass('fixed').css({'top':''});
                    }
                    if(i == index){
                        var className = $('.contents').find('section').eq(i).attr('class');
                        $('.scrollTitle').addClass(className);
                        $('.scrollTitle .eTitle').eq(i).css({'z-index':'9'});
                    }else{
                        var className = $('.contents').find('section').eq(i).attr('class');
                        $('.scrollTitle').removeClass(className);
                        $('.scrollTitle .eTitle').eq(i).css({'z-index':'8'});
                    }
                }

                mode = "click";
                if(!bol){
                    scrollEvent("push");
                }
                /*
                 //  모바일 기기 테스트시
                 setTimeout(clickEvent, 500);
                 //clickEvent();
                 */

                //setTimeout(clickEvent, 500);
                clickEvent();

            }
        }

        function clickEvent(){
            mode = "none";
        }

        function iosTitleClone(){
            if(currentOS == "ios"){
                $('#container .contents').prepend('<div class="scrollTitle"></div>');
                $('section').each(function(i){
                    var cloneTarger = $(this).find('.eTitle').clone();
                    cloneTarger.addClass('clone');
                    $(this).siblings('.scrollTitle').append(cloneTarger);
                });
            }
        }

        //스크롤 이벤트할때 title position 설정 함수 호출
        $(this).scroll(function() {
            if(mode == "none"){
                scrollEvent();
            }
        });

        //스크롤 할때 title 위치 체크에따른 position 설정및 top 값 변경 함수.
        function scrollEvent(str){
            var scrolltop = $(window).scrollTop(),
                sectionLen = $('.contents').find('section').length,
                titleTarget = $('.contents').find('section').find('.eTitle'),
                top = $('.contents').position().top,
                sectionArr = [],
                nowTitle = 0;

            if(currentOS == "ios"){
                if(maxHeight <= scrolltop && str == "push"){
                    scrolltop = maxHeight;
                }else{
                    maxHeight = document.body.offsetHeight - window.innerHeight;
                }
            }
            var topPlus = top+scrolltop;

            for(var i = 0; i < sectionLen; i++){
                var sectionTop = $('.contents').find('section').eq(i).position().top;
                sectionArr[i] = sectionTop;
                if(sectionArr[i] < topPlus){
                    nowTitle = i;
                }
            }

            var cul = topPlus + titleHeight;
            for(var j = 0; j < sectionLen; j++){
                if(j == nowTitle){
                    if(currentOS == "ios"){
                        var className = $('.contents').find('section').eq(j).attr('class');
                        $('.scrollTitle').addClass(className);
                    }
                    $('.contents').find('section').eq(j).css({'margin-top':titleHeight});

                    if(sectionArr[(nowTitle+1)] <= cul && (sectionArr[(nowTitle+1)]+titleHeight+1) > cul){
                        var hum = titleHeight-(sectionArr[(nowTitle+1)]-topPlus),
                            topCul = (top - hum)+1;
                        $('.contents').find('section').eq(j).find('.eTitle').addClass('fixed').css({'top':topCul});
                        if(currentOS == "ios"){
                            $('.scrollTitle').css({'top':topCul});
                        }
                    }else{
                        $('.contents').find('section').eq(j).find('.eTitle').addClass('fixed').css({'top':(top-1)});
                        if(currentOS == "ios"){
                            $('.scrollTitle').css({'top':top});
                        }
                    }
                    if(currentOS == "ios"){
                        $('.scrollTitle .eTitle').eq(j).css({'z-index':'9','opacity':'1'});
                    }
                }else{
                    if(currentOS == "ios"){
                        var className = $('.contents').find('section').eq(j).attr('class');
                        $('.scrollTitle').removeClass(className);
                        $('.scrollTitle .eTitle').eq(j).css({'z-index':'8','opacity':'0'});
                    }
                    $('.contents').find('section').eq(j).css({'margin-top':''});
                    $('.contents').find('section').eq(j).find('.eTitle').removeClass('fixed').css({'top':''});
                }
            }
        }
        //mLayer
        function mLayer(){
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

    }else {
        var $mAccordion = $('.contents .mAccordion');
        if($mAccordion.hasClass('selected') === false){
            $mAccordion.eq(0).addClass('selected');
        }

// CMC_README: 수정 시작
        $("body").on("click", ".eDetailView", function() {
// CMC_README: 수정 끝
            $(this).parents('.mAccordion').toggleClass('selected');
            $(this).parents('.mAccordion').siblings('.mAccordion').removeClass('selected');
            $(this).parents('section').siblings('section').children('.mAccordion').removeClass('selected');

// CMC_README: 추가 시작
            /*var url = $(this).attr("action-url");
             var par = $("#frm_layoutw, #frm_layoutw_segment").serialize();
             var div = $(this).attr("action-div");
             io_submit_post_div(url, par, div);*/
// CMC_README: 추가 끝

        });
        $('.mLayer .eClose').click(function () {
            $(this).parents('.mLayer').css('display','none');
            $('.mSetting .eModal').removeClass('selected');
        });

        $('.mSetting .period').click(function () {
            if($(this).hasClass("selected")){
                $(this).removeClass("selected");
                $('.mLayer.period').css('display','none');
            }else{
                $(this).addClass("selected");
                $('.mSetting .btnSegment').removeClass("selected");
                $('#layerSegment').css('display','none');
                $('.mLayer.period').css('display','block');
            }
            return false;
        });
        $('.mSetting .btnSegment').click(function () {
            if($(this).hasClass("selected")){
                $(this).removeClass("selected");
                $('#layerSegment').css('display','none');
            }else{
                $(this).addClass("selected");
                $('.mSetting .period').removeClass("selected");
                $('.mLayer.period').css('display','none');
                $('#layerSegment').css('display','block');
            }
            return false;
        });

    }
});
