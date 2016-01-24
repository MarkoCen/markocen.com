;(function ($) {
    $('.blog-item').on('click', function (event) {
        if(event.target.className.indexOf('ctag') < 0){
            var articleId = this.getAttribute('data-article-id') || '';
            window.location.assign(window.location.origin + '/blog/' + articleId);
        }
    })
})(window.$);