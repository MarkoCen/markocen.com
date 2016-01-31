'use strict';

var db = require('./db');
var mongoose = require('mongoose');
var _ = require('lodash');
var articleCached = {
    time: Date.now(),
    data: []
};

var articleSchema = new mongoose.Schema({
    articalId: String,
    title: String,
    author: String,
    tags: [String],
    description: String,
    date: Number
});

var articles = db.model('articles', articleSchema, 'articles');

module.exports = {
    findAllArticles: findAllArticles,
    findArticleById: findArticleById,
    findArticlesByTag: findArticlesByTag,
    getTagLabels: getTagLabels
};

function __checkArticleCachedExpired(){
    return (Date.now() - articleCached.time > 1800000 || articleCached.data.length <= 0)
}

function __updateArticleCache(){
    return new Promise((resolve, reject) =>{
        articles.find({}, {}, { lean: true}).exec().then(function (results) {
            articleCached.data = results;
            articleCached.time = Date.now();
            resolve();
        }, function (err) {
            reject(err);
        })
    })
}

function getTagLabels(){
    return new Promise(function (resolve, reject) {

        function calcLabels(data){
            var tagLabels = {};
            if(_.isArray(data)){
                 _.chain(data)
                    .map(function(item){return item.tags})
                    .flatten()
                    .forEach(function(tag){
                        if(_.isNil(tagLabels[tag])){
                            tagLabels[tag] = 1;
                        }else{
                            tagLabels[tag] += 1
                        }
                    })
                    .value();
            }
            return tagLabels;
        }

        if(__checkArticleCachedExpired()){
            __updateArticleCache().then(function(){
                resolve(calcLabels(articleCached.data))
            }, function(err){
                reject(err);
            })
        }else{
            resolve(calcLabels(articleCached.data));
        }
    })
}

function findArticlesByTag(tag){
    return new Promise((resolve, reject) =>{
        articles.find(
            { $text: {
                $search: tag
            }}
            ,{}
            ,{ lean: true }
        ).exec().then(function (articles) {
            resolve(articles);
        }, function (err) {
            reject(err);
        })
    })
}

function  findArticleById(articleId){
    return new Promise((resolve, reject) =>{
        if(__checkArticleCachedExpired()){
            __updateArticleCache().then(function () {
                let article = _.find(articleCached.data, (a) =>{
                    return a.articleId === articleId;
                })
                resolve(article);
            }, function (err) {
                reject(err);
            })
        }else{
            resolve(_.find(articleCached.data, article =>{
                return article.articleId === articleId;
            }));
        }
    })
}

function findAllArticles(){
    return new Promise((resolve, reject) => {
        if(__checkArticleCachedExpired()){
            __updateArticleCache().then(function () {
                resolve(articleCached.data);
            }, function (err) {
                reject(err);
            })
        }else{
            resolve(articleCached.data);
        }
    })

}