/**
 * Created by Marko Cen on 12/31/2015.
 */

var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', './views');

app.use(express.static('./public'));

app.listen(5555);

app.get('/', function (req, res) {
    res.render('main');
});

app.get('/test', function (req, res) {
    res.json({ test: 'testString'})
})