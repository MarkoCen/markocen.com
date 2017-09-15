module.exports = function () {

    var express = require('express');
    var constants = require('./constants');
    var path = require('path');
    var compression = require('compression');
    var cors = require('cors');
    var app = express();

    app.use(compression());

    app.use(express.static('./public'));

    app.set('view engine', 'jade');
    app.set('views', './views');

    var blogRouter = require('../routes/blogRouter');
    var thisWorldRouter = require('../routes/thisWorldRouter');
    app.use('/blog', blogRouter);
    app.use('/tw', cors(), thisWorldRouter);

    app.get('/', function (req, res) {
        res.render('main');
    });

    app.listen(constants.SERVER_PORT, function(){
        console.log('SERVER LISTENING PORT ' + constants.SERVER_PORT);
    });
}