var express = require('express');
var mongoClient = require('mongodb').MongoClient;

var router = express.Router();

router.get('/', function(req,res,next){
    res.send('api');
});


var mon = function() {
    var mongoURL = '...';
    mongoClient.connect(mongoURL, function(err, db){
        if( err ) console.log('errrrr', err );

        console.log('connected to db');

        db.collection('games').insertOne( {ins: 'abc'}, {w: 1}, function(err, doc){
            if( err ){
                console.log('error storing message in db: ', err );
                db.close();
            }
            else{
                db.close();
                console.log('message stored');
                res.send('message response');
            }
        });
    });
}



router.route( '/move').post(function(req, res, next){
    var board = req.body.board;

    var nomove = '[]';

    var possibleTurns = [];
    for( var x = 0; x < board.length; x += 1 ){
        for( var y = 0; y < board[x].length; y += 1 ){
            if( board[y][x] == nomove ){
                possibleTurns.push({x:x, y:y});
            }
        }
    }

    if( possibleTurns.length === 0 ){
        res.send({msg: 'done'});
    }

    var turn = Math.floor(Math.random() * possibleTurns.length);
    var resTurn = possibleTurns[turn];

    res.send(resTurn);
});

module.exports = router;