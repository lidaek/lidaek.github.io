// 환경설정 > 채널 연결 관리
function eDisabeld() {
    var findItem =  $('.mConnect');
    if(findItem.hasClass('disabled')){
        findItem.children('input').attr('disabled', true);
        findItem.children('button').attr('disabled', true);
    }else{
    }
}