
//메인 > visual
var figureNowNum = 0,
    strArrow = "L",
    flagButton = true,
    visualSlider = $('.mVisual').children().hasClass('mSlider');
if(visualSlider){
   mainVisualSlider();
}

function mainVisualSlider(){
    var findTarget = $('.mVisual'),
        arrNum = [],
        flag = true,
        figureLen = findTarget.find('.pagination .num').length;
    var newSlider = findTarget.find('.mSlider').lightSlider({
        pager:false,
        item:1,
        thumbItem:6,
        slideMargin: 0,
        speed:800,
        easing:"cubic-bezier(0.25, 0, 0.25, 1)",
        touchSpeedBol:true,
        touchspeed:200,
        auto:true,
        pause:6000,
        pauseOnHover: true,
        touchHover:true,
        loop:true,
        controls:false,
        onSliderLoad: function() {
            findTarget.find('.mSlider').removeClass('cS-hidden');
        },
        onBeforeSlide: function() {
            var figureCount = (newSlider.getCurrentSlideCount()-1);
            figureNowNum = figureCount;

            findTarget.find('.pagination .num').eq(figureCount).addClass('selected').siblings().removeClass('selected');
            if(flag){
                var cul = Math.abs(figureNowNum-figureCount);
                if(figureNowNum > figureCount && !flagButton){
                    if(cul >= (figureLen-1)){
                        strArrow = "L"
                    }else{
                        strArrow = "R"
                    }
                }else{
                    if(flagButton){
                        strArrow = "L"
                    }else{
                        if(cul >= (figureLen-1)){
                            strArrow = "R"
                        }else{
                            strArrow = "L"
                        }
                    }
                }
            }
            opacityCssControl(0, "M");
        },
        onAfterSlide: function() {
            var figureCount = (newSlider.getCurrentSlideCount()-1);
            figureNowNum = figureCount;
            flagButton = true;
        },
        onUpdateSlide: function(el, distance) {
            if(distance > 0){
                strArrow = "R";
            }else{
                strArrow = "L";
            }
            var figureCount = (newSlider.getCurrentSlideCount()-1),
                figureCul = 1-(Math.abs(distance)/200);

            arrNum[figureCount] = figureCul.toFixed(2);
            opacityCssControl(arrNum[figureCount]);
            flag = false;
        },
        onTouchEnd:function(el, distance) {
            var figureCul = 1-(Math.abs(distance)/200);
            if(figureCul > 0.8){
                opacityCssControl(1, "M");
            }
            flag = true;
        }
    });

    findTarget.find('.pagination .num').on('click', function(e) {
        flagButton = false;

        var num = $(this).index()+1;
        newSlider.goToSlide(num);

        e.preventDefault();
    });

    // 메인 > 자세히 보기
    /*$('.eToggle').click(function () {
        var parents = $(this).parents('.feature')
        if(parents.hasClass('expand')){
            $(this).parents('.feature').removeClass('expand').end().text('자세히 보기');
        }else{
            $(this).parents('.feature').addClass('expand').end().text('접기');
        }
    });*/

    $('.mExplanation li').each(function(i){
        if(i == figureNowNum){
            $(this).css('opacity', 1);
        }else{
            $(this).css('opacity', 0);
        }
        arrNum.push(0);
    });

    $(window).resize(function() {
        var propWinWidth = $(this).width(),
            propHeigth = findTarget.height(),
            propSliderHeight = 0;

        if (propWinWidth < 768) {   // 모바일
            propSliderHeight = 200;
            $('.lSSlideWrapper').addClass('mCss');
        }else{                      // PC
            propSliderHeight = 503;
            $('.lSSlideWrapper').removeClass('mCss');
        }
        findTarget.find('.lightSlider').css('height', propSliderHeight);
    }).resize();
}

function opacityCssControl(figureNum, str){
    var findTarget = $('.mVisual'),
        figureLen = findTarget.find('.pagination .num').length,
        figureReNum,
        figure = 1-figureNum;

    if(strArrow == "L"){
        figureReNum = (figureNowNum+1);
        if(figureReNum >= figureLen){
            figureReNum = 0;
        }
    }else{
        figureReNum = (figureNowNum-1);
        if(figureReNum < 0){
            figureReNum = figureLen-1;
        }
    }

    //console.log("strArrow=="+strArrow+" ,figureNowNum==="+figureNowNum+" ,figureReNum=="+figureReNum+" ,str=="+str);
    if(str == "M"){
        for(var i= 0; i<figureLen; i++){
            if(i == figureNowNum){
                $('.mExplanation li').eq(i).velocity({ opacity: 1, duration: 0.05 });
            }else{
                $('.mExplanation li').eq(i).velocity({ opacity: 0, duration: 0.05 });
            }
        }
        //$('.mExplanation li').eq(figureNowNum).velocity({ opacity: figureNum, duration: 0.05 });
        //$('.mExplanation li').eq(figureReNum).velocity({ opacity: figure, duration: 0.05 });
    }else{
        $('.mExplanation li').eq(figureNowNum).css('opacity', figureNum);
        $('.mExplanation li').eq(figureReNum).css('opacity', figure);
    }
}

