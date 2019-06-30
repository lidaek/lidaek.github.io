$(document).ready(function(){

    mLayer();
    mTab();
    mBoard();
    mymenu();
    lnb();
    eDropdown();

    $('.eCreate').click(function () {
        var parent = $(this).parents('.mTitle');
        parent.siblings('.mBox').toggleClass('gHidden');
    });

    /* gResult 있을 시 */
    $.eLayer = function(){
        ePlayEvent(".mLayer");
    }();

    $.eContainer = function(){
        ePlayEvent("#container");
    }();

    function ePlayEvent(str){
        var findTarget = $(str);
        findTarget.find('.gResult').each(function(i){
            $(this).parents(str).css('background', '#f7f7f7');
        });
    }

    // 라디오버튼과 체크박스 선택시 강조효과
    /* for checked radio */
    $("input[type=radio]").each(function(){

        if ( $(this).is(":checked")) {
            $(this).addClass("checked");
        }

        $(this).click(function() {
            var $this = $(this),
                sClickRadio = $this.attr("name");
            $(this).addClass("checked");

            if (!$this.is(':checked')) return;

            $("input[type=radio][name=" + sClickRadio + "]").removeClass("checked");
            $this.addClass("checked");
        });
    });

    /* for checked checkbox */
    $("input[type=checkbox]").each(function() {
        var $this = $(this);

        $this.click(function(){
            var $this = $(this),
                sMethod = $this.is(":checked") ? 'addClass' : 'removeClass';
            $this[sMethod]("checked");
        });
    });

    $("input[disabled=disabled]").each(function(){
        $(this).removeClass("checked");
    });


    $(".eOpen").click(function () {
        $(this).parent().toggleClass("open");
    })

    /*ePosClick*/
    $('body').delegate('.ePosTarget .ePosClick', 'click', function(e){
        var findTooltip = $(this).parents('.mTooltip');
        var findTarget = findTooltip.find('.tooltip');
        var propDisplay= findTarget.css('display');

        findTarget.fadeToggle();

        if(propDisplay == "none"){
            layerPosition($(this), "LRTB", e);
        }
        e.preventDefault();
    });

    $('body').delegate('.tooltip .eClose', 'click', function(e){
        var findTarget = $(this).parent('.tooltip');
        findTarget.fadeOut();
        e.preventDefault();
    });

    // table : rowChk
    $('body').delegate('.eChkColor .rowChk', 'click', function(){
        var findChkTarget = $(this).parent('td').parent('tr');
        var findRowspan = parseInt(findChkTarget.children().attr('rowspan'));
        if(findRowspan > 1){
            var figureNum = $(this).parents('tbody tr').index();
            chkTrHover($(this), figureNum, findRowspan);
        }else{
            if($(this).is(':checked')){
                $(this).parents('tr:first').addClass('selected');
            } else {
                $(this).parents('tr:first').removeClass('selected');
            }
        }
    });
    //chk rowspan hover color
    function chkTrHover(findTarget, figureNum, findRowspan){
        var findTisTarget = $('.eChkColor').find('tbody tr:not(tbody table tr)');
        for(var i = figureNum; i< (figureNum + findRowspan) ; i++){
            if(findTarget.is(':checked')){
                findTisTarget.eq(i).addClass('selected');
            }else{
                findTisTarget.eq(i).removeClass('selected');
            }
        }
    }

    // table : allCheck
    $('body').delegate('.mBoard .allChk', 'click', function(){
        var findThis = $(this),
            findTable = $(this).parents('table:first'),
            findMboard = $(this).parents('.mBoard:first'),
            findColspan;

        if(findTable.hasClass('eChkBody')){
            var findRowChk = findTable.find('.rowChk').not(':disabled');
            if(findThis.is(':checked')){
                findRowChk.attr('checked', true);
            } else {
                findRowChk.attr('checked', false);
            }
        } else {
            if(findMboard.hasClass('typeHead')){
                var findNext = findMboard.next();
                var findRowChk = findNext.find('.rowChk').not(':disabled');
            } else {
                var findRowChk = findTable.find('.rowChk').not(':disabled');
            }
            if(findThis.is(':checked')){
                findRowChk.each(function(){
                    $(this).attr('checked', true);
                    if($(this).parents('table:first').hasClass('eChkColor')){
                        $(this).parents('tr:first').addClass('selected');
                    }
                });
            } else {
                findRowChk.each(function(){
                    $(this).attr('checked', false);
                    if($(this).parents('table:first').hasClass('eChkColor')){
                        $(this).parents('tr:first').removeClass('selected');
                    }
                });
            }

            //allchk colspan selected
            if(findMboard.hasClass('typeHead')){
                findColspan = findMboard.next();
            }else{
                findColspan = findTable;
            }
            var findNoRowChk = findColspan.find('tbody tr:not(tbody table tr)').each(function(i){
                if(!$(this).children().children().hasClass('rowChk')){
                    if(findThis.is(':checked')){
                        findColspan.find('tbody tr:not(tbody table tr)').eq(i).addClass('selected');
                    }else{
                        findColspan.find('tbody tr:not(tbody table tr)').eq(i).removeClass('selected');
                    }
                }
            });
        }
    });



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

    //IE10이하 업그레이드
    var agent = navigator.userAgent.toLowerCase();
    var agentStr = navigator.userAgent;

    function upgradeBrowser() {
        if (agent.indexOf('msie') != -1) {
            if (agentStr.indexOf('Trident/7.0') > -1) {
                if (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) {
                    $('body').attr('id', 'unsupported');
                }else{
                    alert('호환성 보기를 해제하세요.');
                }
            }else{
                var rv = getInternetExplorerVersion();
                if(rv < 10){ // IE10 미지원인 경우 11로 변경
                    $('body').attr('id', 'unsupported');
                    if(rv <= 8){
                        $('body').addClass('ie8');
                    }
                }
            }
        }else{
            var filter = 'win16|win32|win64|mac';
            if(navigator.platform){
                if(0 <= filter.indexOf(navigator.platform.toLowerCase())){
                    var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
                    var is_safari = navigator.userAgent.indexOf('Safari') > -1;
                    var is_safari3 = navigator.userAgent.indexOf('applewebkit/5') > -1;
                    if ((is_chrome)&&(is_safari)) {is_safari=false;}
                    if(is_safari || is_safari3) {
                        $('body').attr('id', 'unsupported');
                    }
                }
            }
        }


        var findDis = $('.unsupported').css('display');
        if(findDis != "none"){
            $('.unsupported .close').click(function(){
                $('.unsupported').remove();
                $('body').attr('id', '');
            });
            $('.unsupported .check').click(function(){
                var target = $(this);
                closePop(target);
            });
        }
    }


    if (getCookie("unsupportedsave") != "done"){
        upgradeBrowser();
    }

    function getInternetExplorerVersion() {
        var rv = -1; // Return value assumes failure.
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp('MSIE ([0-9]{1,}[\.0-9]{0,})');
            if (re.exec(ua) != null)
                rv = parseFloat(RegExp.$1);
        }
        return rv;
    }


    //팝업 닫기
    function closePop(target) {
        var hasName = target.hasClass('selected');
        if (!hasName) {
            setCookie("unsupportedsave", "done", 1);
        }
        $('.unsupported').remove();
        $('body').attr('id', '');
    }

    //로컬 쿠키 저장
    function setCookie(name, value, expiredays) {
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
    }

    //로컬 쿠기 저장된 데이터 가져오기
    function getCookie(name) {
        var nameOfCookie = name + "=";
        var x = 0;
        while (x <= document.cookie.length) {
            var y = (x + nameOfCookie.length);
            if (document.cookie.substring(x, y) == nameOfCookie) {
                if ((endOfCookie = document.cookie.indexOf(";", y)) == -1) {
                    endOfCookie = document.cookie.length;
                }
                return unescape(document.cookie.substring(y, endOfCookie));
            }
            x = document.cookie.indexOf(" ", x) + 1;
            if (x == 0) break;
        }
        return "";
    }

});

//lnb
function lnb() {
    //왼쪽 대메뉴
    $(".eFold").click(function () {
        var parent = $(this).parent();
        var sub = $('.children li');

        if (parent.hasClass('selected')) {
            parent.removeClass("selected");
        }else {
            parent.siblings().removeClass("selected")
            parent.addClass("selected");
        }
    })
}

//mymenu
function mymenu(){
    var findMenu = $('.eMymenu');

    findMenu.find('.message').on("mouseover", function () {
        $(this).parent().addClass('selected');
    });

    findMenu.on("mouseleave", function () {
        $(this).removeClass('selected');
    });
}

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
        var findTarget = $(this).parent().hasClass('tooltip');
        if(!findTarget){
            $.mLayer_close($(this));
            e.preventDefault();
        }
    });
    // mLayer : eLayerClick
    $('body').delegate('.eLayerClick', 'click', function(e){
        var findThis = $(this),
            findTarget = $($(this).attr('href')),
            propTargetWidth = findTarget.outerWidth(),
            propTargetHeight = findTarget.outerHeight(),
            propDocWidth = $(document).width(),
            propDocHeight = $(document).height(),
            propTop = findThis.offset().top,
            propLeft = findThis.offset().left,
            figure = propLeft + propTargetWidth,
            propMarginLeft = 0;

        var propFooterHeight = $('body').find('#footer').outerHeight();
        if(propFooterHeight == null){
            propFooterHeight = 0;
        }
        propTargetHeight = propTargetHeight+propFooterHeight+20;

        if((propDocHeight-propTop) < propTargetHeight){
            if(propDocHeight < propTargetHeight) {
                propTop = -20;
            } else {
                propTop = propDocHeight - propTargetHeight - 10;
            }
        }

        if(propDocWidth <= figure){
            if(propTargetWidth > propLeft){
                propMarginLeft = '-' + ( propTargetWidth / 2 ) + 'px';
                propLeft = '50%';
            } else {
                propLeft = propLeft - propTargetWidth + 20;
            }
        }
        findTarget.css({'top':propTop+50, 'left':propLeft, 'marginLeft':propMarginLeft}).show();
        e.preventDefault();
    });
    // eModal : dimmed layer position
    function dimmedLayerPosition(target){
        if(!target.attr('fixed')){
            var findLayer = target,
                propWinWidth = $(window).width(),
                propWinHeight = $(window).height(),
                propWidth = findLayer.outerWidth(),
                propHeight = findLayer.outerHeight(),
                propWinScroll = $(window).scrollTop();

            if(propWinWidth < propWidth){
                findLayer.css({'left':0, 'marginLeft':0});
            } else {
                var propLeft = propWidth/2;
                findLayer.css({'left':'50%', 'marginLeft':'-'+ propLeft +'px'});
            }

            var propTop = (propWinHeight/2) - (propHeight/2) + propWinScroll;
            findLayer.css({'top':propTop});

            findLayer.show();
        }
    }
    // eModal : show
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
}

//mTab
function mTab() {
    $('.eTab').each(function(){
        var selected = $(this).find('> ul > li.selected > a');
        if(selected.siblings('ul').length <= 0){
            $(this).removeClass('gExtend');
        }
    });
    $('body').delegate('.eTab a', 'click', function(e){
        var _li = $(this).parent('li').addClass('selected').siblings().removeClass('selected'),
            _target = $(this).attr('href'),
            _siblings = $(_target).attr('class');
        if(_siblings){
            var _arr = _siblings.split(" "),
                _classSiblings = '.'+_arr[0];
            $(_target).show().siblings(_classSiblings).hide();
        }
        e.preventDefault();
    });
}

//mBoard
function  mBoard() {
    $('.eBoard tbody tr').hover(function () {
        $(this).toggleClass('hover').css('cursor', 'pointer');
    })
}

//eDropdown
function  eDropdown() {
    $('.eDropdown').click(function () {
        $(this).parent().toggleClass('selected');
        e.preventDefault();
    })
}


