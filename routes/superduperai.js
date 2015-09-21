var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
    res.send('api');
});

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