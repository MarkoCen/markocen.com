;(function ($) {


    $('.blog-item').on('click', function (event) {
        if(event.target.className.indexOf('ctag') < 0){
            var articleId = this.getAttribute('data-article-id') || '';
            window.location.assign(window.location.origin + '/blog/' + articleId);
        }
    });

    $('.search-submit').on('click', function(event){
        var queryString = $('#search-input').ele[0].value;
        window.location.assign(window.location.origin + '/blog?tag=' + queryString);
    });

    $('#search-input').on('keypress', function(event){
        if(event.keyCode === 13){
            var queryString = event.target.value;
            window.location.assign(window.location.origin + '/blog?tag=' + queryString);
        }
    })

    $('.tag-label .tag-name').on('click', function(event){
        var queryString = this.innerHTML;
        window.location.assign(window.location.origin + '/blog?tag=' + queryString);
    })
})(window.$);