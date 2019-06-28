// 등록 > removeStep
function eRemove(){
    var findItem = $('.eRemove');
    var findItemArea = findItem.parents('.removeStep');
    // var findItemButton =findItem.find('.btnRemove');

    findItem.on("mouseover", function () {
        findItemArea.addClass('hover');
    });
    findItem.on("mouseleave", function () {
        findItemArea.removeClass('hover');
    });
}


// 등록 mForm typeEdit
function edit() {
    $('.eEdit').click(function () {
        $(this).parents('li').addClass('edit');
    })
    $('.eSave').click(function () {
        $(this).parents('li').removeClass('edit');
    })
}

// 재료 추가
function eMaterial() {
    $('.eMaterial').click(function () {
        $(this).parents('.mButton').siblings('.typeMaterial').slideToggle();
    })
}