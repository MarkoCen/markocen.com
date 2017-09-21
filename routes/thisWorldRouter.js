const ThisWorldRouter = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');
const isImageUrl = require('is-image-url');
const isBase64 = require('is-base64');
const videoUrlParser = require('js-video-url-parser');

ThisWorldRouter.get('/url', ({query},res)=>{
    let url = query.url;
    const urlRegex = /^https?:\/\//;
    if(!url) return res.status(404).json(false);
    if(!urlRegex.test(url)) {
        url = 'http://' + url;
    }

    // if url is an image resource
    if(isImageUrl(url)) {
        return res.json({
            mediaType: 'image'
        })
    }

    // if url is base64 image
    if(isBase64(url)) {
        return res.json({
            mediaType: 'image'
        })
    }

    // if url is a video link
    const videoInfo = videoUrlParser.parse(url);
    if(videoInfo && videoInfo.mediaType === 'video') {
        return res.json({
            mediaType: 'video',
            embedUrl: buildEmbedUrl(videoInfo)
        })
    }

    // otherwise, parse the url response
    request.get(url, (err, {body})=>{
        if(err) {
            return res.status(500).json(false);
        }
        const $ = cheerio.load(body);
        const title = $('head > title').text().trim();
        const ogTitle = $('head > meta[property="og:title"]').length > 0 ? 
            $('head > meta[property="og:title"]').attr('content').trim() : title;
        const description = $('head > meta[name="description"]').length > 0 ?
            $('head > meta[name="description"]').attr('content').trim() : '';
        const ogDescription = $('head > meta[property="og:description"]').length > 0 ?
            $('head > meta[property="og:description"]').attr('content').trim() : description;
        const ogImage = $('head > meta[property="og:image"]').length > 0 ?
            $('head > meta[property="og:image"]').attr('content').trim() : '';
        res.json({
            title: ogTitle,
            description: ogDescription,
            image: ogImage,
            mediaType: 'html'
        })
    })
});

function buildEmbedUrl(videoInfo) {
    const provider = videoInfo.provider;
    switch(provider) {
        case 'youtube': {
            return `https://youtube.com/embed/${videoInfo.id}`;
        }
        case 'vimeo': {
            return `https://player.vimeo.com/video/${videoInfo.id}`;
        }
        case 'youku': {
            return `https://player.youku.com/embed/${videoInfo.id}`;
        }
    }
}

module.exports = ThisWorldRouter;