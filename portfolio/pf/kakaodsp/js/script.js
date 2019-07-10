//임시스크립트 

//OS별 클래스 제어
var DUI = {};
DUI.check = {
    siteCode : window.LOCALE ? window.LOCALE : '',  
    os : (function () {
        var agent = navigator.userAgent;
        var osList = {
            'mac' : agent.match(/macintosh/i),
            'window' : agent.match(/windows/i),
        };

        for (prop in osList) {
            if (osList[prop]) {
                return prop;
            }
        }

    })()
};


$(function(){
	//os체크
	if(DUI.check.os == 'mac') {
	    $("html").addClass("os_mac");
	}

	//상단 GNB 메뉴 컨트롤
	$("#kakaoGnb .gnb_comm > li").on( "click", function(){ 
		
		//다른서브메뉴닫기
		$("#kakaoGnb .gnb_comm > li").removeClass("open");
		$(".select_account").removeClass("opt_open");
		$(".list_userinfo > li").removeClass("on");
		
		$(this).addClass("open");
	});
	
	//광고계정셀렉트메뉴
	$(".select_account").on( "click", function() {
		
		//다른서브메뉴닫기
		$("#kakaoGnb .gnb_comm > li").removeClass("gnb_on");
		$(".list_userinfo > li").removeClass("on");
		
		$(this).toggleClass("opt_open");
		
		$(".select_account .link_option").on( "click", function() {
			var textShow = $('.link_selected');
			var data = $(this).find('.txt_option').text();
			$(this).parents('.select_account').find(textShow).text(data);
			$(this).parents('.list_opt').find('li').removeClass("on");
			$(this).parent().addClass("on");
		});
	});
	
	//상단 User 메뉴 컨트롤
	$(".list_userinfo > li").on( "click", function(){ 
		
		//다른서브메뉴닫기
		$("#kakaoGnb .gnb_comm > li").removeClass("gnb_on");
		$(".select_account").removeClass("opt_open");
		$(".list_userinfo > li").removeClass("on");
		
		$(this).addClass("on");
	});
	    
		
	//셀렉트메뉴
	$(".opt_select").on( "click", function() {
		$(this).toggleClass("opt_open");
		
		$(".opt_list .link_option").on( "click", function() {			
			$(this).parents('.opt_list').find('li').removeClass("on");
			$(this).parent().addClass("on");
		});
		
	});
	$(".opt_select").hover(function(){
		$(this).addClass("over");
	}, function(){
		$(this).removeClass("over");
	});
	
	//인풋_텍스트
	$(".box_inptxt .inp_txt").on( "click", function() {
		$(this).parent().parent('.box_inptxt').addClass("on");
		$(this).on( "blur", function() {
			var text = $(this).val().length;
			if(text === 0){
				$(this).parent().parent().removeClass("on");
			}else{
				$(this).parent().parent().addClass("on");
			}
		});	
	});
	
	$(".box_inptxt").hover(function(){
		$(this).addClass("over");
	}, function(){
		$(this).removeClass("over");
	});
	
	//textarea
	$(".box_textarea .tf_area").on( "click", function() {
		$(this).parent('.box_textarea').addClass("on");
		$(this).on( "blur", function() {
			var text = $(this).val().length;
			if(text === 0){
				$(this).parent().removeClass("on");
			}else{
				$(this).parent().addClass("on");
			}
		});	
	});
	
	$(".box_textarea2 .tf_area").on( "click", function() {
		$(this).parent('.box_textarea2').addClass("on");
		$(this).on( "blur", function() {
			var text = $(this).val().length;
			if(text === 0){
				$(this).parent().removeClass("on");
			}else{
				$(this).parent().addClass("on");
			}
		});	
	});
	
	$(window).resize(function(e){	
		var width = $(window).width();
		var height = $(window).height();
		
		//레이어
//		var basicSizeT = $('.basic_layer').height();
//		var basicSizeM = $('.basic_layer').width();
//		var basicTop = basicSizeT / 2;
//		var basicLeft = basicSizeM / 2;
//		
//		$('.basic_layer').css( "margin-top", "-"+basicTop + "px" );
//		$('.basic_layer').css( "margin-left", "-"+basicLeft + "px" );
		
		var basicSizeT2 = $('.basic_layer2').height();
		var basicSizeM2 = $('.basic_layer2').width();
		var basicTop2 = basicSizeT2 / 2;
		var basicLeft2 = basicSizeM2 / 2;
		$('.basic_layer2').css( "margin-top", "-"+basicTop2 + "px" );
		$('.basic_layer2').css( "margin-left", "-"+basicLeft2 + "px" );
		
		if($('.basic_layer2').length>1){
			$('.basic_layer2').css( "margin", + 0 + "px" );
		}
		
		
		//소재설정 컨텐츠 높이값 계산
		var materialcontT = $('.materialcont_wrap').height();
		if($('.materialcont_wrap').length>0){
			$('.materialcont_wrap').css( "height", +materialcontT + "px" );
		}
		if($('.materialcont_wrap.scroll_ing').length>0){
			$('.materialcont_wrap.scroll_ing').css("height","auto");
		}
		
	});
	$(window).trigger('resize');
});