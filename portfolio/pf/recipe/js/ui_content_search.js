function eFold() {
    $('.eFold').click(function () {
       var $target = $('.eFoldTarget');
        $(this).toggleClass('active');
        $target.toggleClass('expand');
    });
}