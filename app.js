var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var superduperai = require('./routes/superduperai');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', superduperai);

var files = {
    index: path.join(__dirname, '/public/', 'index.html')
}

app.get('/', function(req, res){
    res.sendFile(files.index);
});

var port = process.env.PORT || '3000';
app.listen(port, function(){
    console.log('listening 3000');
});