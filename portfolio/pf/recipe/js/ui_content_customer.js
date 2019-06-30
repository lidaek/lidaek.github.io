// 환경설정 > 채널 연결 관리
function eFaqAccordion() {
    var findTarget = $(".eFaqAccordion li .link");
    findTarget.click(function () {
        if ($(this).parent('li').hasClass('selected')) {
            $(this).parent('li').removeClass('selected');
            $(this).siblings('.content').slideUp();
        }else {
            $(this).parent('li').addClass('selected');
            $(this).siblings('.content').slideDown();
        }
        return false;
    });
};