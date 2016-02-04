var express = require('express');
var jade = require('jade');
var blogRouter = express.Router();
var fs = require('fs');
var path = require('path');
var models =require('../modules/models');
var util = require('../modules/util');

blogRouter.get('/', function (req, res) {
    var promise = req.query.tag ?
        models.findArticlesByTag(req.query.tag) : models.findAllArticles();

    promise.then(function (articles) {
        models.getTagLabels().then(function(tagLabels){
            res.render('blog-index', {
                articles: articles,
                formatTime: util.formatTime,
                tagLabels: tagLabels
            });
        }, function(){
            res.status(404).json('No Blogs Found!')
        });
    }, function () {
        res.status(404).json('No Blogs Found!')
    });
});

blogRouter.get('/:blogTitle', function (req, res) {
    if(req.params.blogTitle){
        models.findArticleById(req.params.blogTitle).then(function (article) {
            if(article == undefined){
                res.status(404).json('No Blog Found!');
            }else{
                var filePath = path.join(__dirname, '../views/blogs/' + req.params.blogTitle + '.jade');
                fs.stat(filePath, function (err, stat) {
                    err ? res.status(404).json('No Blog Found!')
                        : res.render('blog-content', {
                        article: article,
                        formatTime: util.formatTime,
                        content: jade.renderFile(filePath)
                    });
                })
            }
        }, function (err) {
            res.status(404).json('No Blog Found!')
        })
    }
});

module.exports = blogRouter;