;(function ($) {
    $('.top-header-panel .about').on('click', function () {
        $.scrollTo('.main-panel .avatar')
    });

    $('.top-header-panel .blog').on('click', function(){
        window.location.assign(window.location.href + "blog")
    });

    $('.intro .nav li').on('click', function(event){
        var $target = $(this);
        var aClassName = $(this).
        $('.intro .nav li').removeClass('active');
        $('.intro .tab-content div').removeClass('active');

        $target.addClass('active')
        $('.intro .tab-content div')

    })
})(window.$);