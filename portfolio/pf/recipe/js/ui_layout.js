// 전역 > 사이드메뉴
function eSideExpand() {
    var findTarget = $("#wrap");
    $('.eMenu').click(function () {
        $('#wrap').toggleClass('sideExpand');
        findTarget.parent().append('<div id="dimmed_'+ findTarget.attr('id') +'" class="dimmed"></div>');

        $('.dimmed').on('click', function() {
            dimmedClose();
        });
    })
    $('#sidebar .eClose').on('click', function() {
        dimmedClose();
    })
}
function dimmedClose(){
    var findDimmed = $("#dimmed_wrap");
    $('#wrap').removeClass('sideExpand');
    $('.dimmed').removeAttr('onclick');
    findDimmed.remove();
}

//mobile help page move
var findHelp = $('#layerRegister');
if(findHelp.length > 0){
    var findLayerPager = findHelp.find('.registerHelp .pager'),
        figureTotal = findHelp.find('.mTab.typeVer li').length,
        figureAdd;

    initNum();

    findLayerPager.find('.btnNext').click(function(e){
        figureAdd++;
        if(figureTotal < figureAdd){
            figureAdd = 1;
        }
        btnClickEvent();
    });
    findLayerPager.find('.btnPrev').click(function(e){
        figureAdd--;
        if(figureAdd == 0){
            figureAdd = figureTotal
        }
        btnClickEvent();
    });

    function btnClickEvent(){
        findHelp.find('.tabCont').hide();
        var findIdName = "#tabCont1_"+figureAdd;
        findHelp.find(findIdName).show();

        var figure = figureAdd-1;
        findHelp.find('.mTab.typeVer li').eq(figure).addClass('selected').siblings().removeClass('selected');
    }

    function initNum(){
        findHelp.find('.tabCont').each(function(i){
            var flag = $(this).css('display');
            if(flag == "block"){
                figureAdd = (i+1);
            }
        });
    }

    $(window).resize(function(){
        initNum();
        btnClickEvent();
    });
}