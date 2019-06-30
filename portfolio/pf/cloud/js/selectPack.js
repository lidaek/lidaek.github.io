;(function ($) {
    'use strict';

    $.fn.selectPack = function () {
        var methods = {
            /*@private*/
            _eInit: function (options) {
                return this.each(function () {
                    var findThis = $(this);
                    methods._eSetup.apply(this, Array.prototype.slice.call(arguments, 1));
                });
            },
            /*@private*/
            _eSetup: function () {
                var findThis = $(this);
                objStart._eCreate(findThis);
            }
        };

        var objStart = {
            /*@private*/
            _eCreate: function (findThis) {
                var propClass = "mSelect",
                    propDisabled = findThis.attr('disabled'),
                    propStyle = findThis.attr('style'),
                    propWidthSize = propStyle,
                    propPercent = null;

                if(propStyle){
                    propWidthSize = parseInt(propStyle.replace(/[^0-9]/g,''));
                    propPercent = propStyle.indexOf("%");
                }

                /*
                if(!propClass){
                    findThis.removeAttr('design').removeAttr('class');
                    propClass = "selectDesign";
                } else {
                    findThis.removeAttr('design').removeAttr('class');
                }
                */

                var propSelect = propClass;
                if(propDisabled){ propSelect = propClass + ' disabled'; }

                if(propWidthSize){
                    if(propPercent && propPercent > 0){
                        findThis.wrap('<div class="'+ propSelect +'" style="width:'+propWidthSize+'%;"  />');
                    }else{
                        findThis.wrap('<div class="'+ propSelect +'" style="width:'+propWidthSize+'px;"  />');
                    }
                }else{
                    findThis.wrap('<div class="'+ propSelect +'" />');
                }
                findThis.before('<p class="now" />');
                findThis.before('<button type="button">옵션 변경</button>');
                findThis.before('<ul class="option" style="overflow-x:hidden;" />');


                var propWrap = findThis.parent(),
                    propPtag = findThis.siblings('p'),
                    propUl = findThis.siblings('ul'),
                    propButton = findThis.siblings('button');

                findThis.find('option').each(function(i){
                    var strText = $(this).text(),
                        propSelected = $(this).attr("selected");
                    if(propSelected){
                        propPtag.text(strText);
                        propUl.append('<li class="selected"><a href="#none">'+ strText +'</a></li>');
                    }else{
                        if(i == 0){
                            propPtag.text(strText);
                            propUl.append('<li class="selected"><a href="#none">'+ strText +'</a></li>');
                        }else{
                            propUl.append('<li><a href="#none">'+ strText +'</a></li>');
                        }
                    }
                });
                objStart._eHandler(findThis, propDisabled, propWrap, propPtag, propButton);
            },
            /*@private*/
            _eHandler: function(findThis, propDisabled, propWrap, propPtag, propButton) {
                propButton.click(function(e){
                    if(!propDisabled){
                        objStart._toggle(propWrap);
                    }
                    e.preventDefault();
                });
                propPtag.click(function(e){
                    if(!propDisabled){
                        objStart._toggle(propWrap);
                    }
                    e.preventDefault();
                });
                /*propWrap.mouseleave(function(e){
                    objStart._hide(propWrap);
                    e.preventDefault();
                });*/
                propWrap.find('a').each(function(){
                    $(this).click(function(e){
                        var strText = $(this).text();
                        objStart._change(propWrap, strText);
                        objStart._toggle(propWrap);
                        $(this).parent().addClass("selected").siblings().removeClass('selected');
                        e.preventDefault();
                    });
                });
            },
            /*@private*/
            _toggle : function(propWrap){
                var propList = propWrap.find('ul');
                if(propWrap.hasClass('show')){
                    propWrap.removeClass('show');
                    //propList.hide();
                } else {
                    propWrap.addClass('show');
                    //propList.show();
                }
            },
            /*@private*/
            _hide : function(propWrap){
                propWrap.removeClass('show');
                //propWrap.find('ul').hide();
            },
            /*@private*/
            _change : function(propWrap, strText){
                propWrap.find('p').text(strText);
                propWrap.find('select').val([strText]);
            }
        }

        return methods._eInit.apply(this, arguments);

    };

})(jQuery);

$(function(){
    'use strict';

    $('.fSelect').each(function(){
        $(this).selectPack();
    });
});