;(function ($) {
    $('.top-header-panel .about').on('click', function () {
        $.scrollTo('.main-panel .avatar')
    });

    $('.top-header-panel .blog').on('click', function(){
        window.location.assign(window.location.href + "blog")
    });
})(window.$);