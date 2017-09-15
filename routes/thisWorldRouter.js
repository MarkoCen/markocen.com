const ThisWorldRouter = require('express').Router();
const request = require('request');
const cheerio = require('cheerio');

ThisWorldRouter.get('/url', ({query},res)=>{
    let url = query.url;
    if(!url) return res.status(404).json(false);
    if(url.lastIndexOf('http', 0) !== 0) {
        url = 'http://' + url;
    }
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
            image: ogImage
        })
    })
});

module.exports = ThisWorldRouter;