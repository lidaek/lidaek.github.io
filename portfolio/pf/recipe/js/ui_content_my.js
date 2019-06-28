// 레시피관리
function group() {
    $('.eGroup').click(function () {
        if ($(this).parents('.mGroup').hasClass('selected')) {
            $(this).parents('.mGroup').removeClass('selected');
        }else {
            $(this).parents('.mGroup').addClass('selected');
        }
    });
    $('.groupArea .eSetting').click(function () {
        var findItem =  $(this).parents('.groupArea').find('.mGroup');
        var findItemLi = findItem.find('.mForm.typeEdit li');

        $(this).toggleClass('active');
        if(findItem.hasClass('active')){
            $(this).parents('.groupArea').find('input').attr('disabled', false);
            findItem.removeClass('active');
            findItemLi.removeClass('edit');
        }else{
            $(this).parents('.groupArea').find('input').attr('disabled', true);
            findItem.addClass('active');
        }

    });
}

function eFoldGroup() {
    $('.eFoldGroup').click(function () {
       var $target = $(this);
        $(this).toggleClass('selected');
    });
}