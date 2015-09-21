var myapp = angular.module('myapp', []);

myapp.controller('myappcontroller', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
    $scope.status = '[]';
    $scope.board = [];
    var playerTurn = true;
    var gameFinished = false;

    var nomove = '[]';

    var initBoard = function() {

        for( var i = 0; i < 3; i += 1 ){
            $scope.board.push( [nomove, nomove,nomove]);
        }
    };

    initBoard();

    var placeMove = function(r,c,p){
        if( gameFinished && !hasFreeSpaces() )
            return;

        if( !playerTurn && p == 'X') {
            console.log("error, not your turn");
            return;
        }

        if( $scope.board[c][r] == nomove ){
            $scope.board[c][r] = p;
        }
        else if( $scope.board[c][r] == 'X' || $scope.board[c][r] == 'O' )
            console.log('error: already moved');

        checkBoard();
    };

    var setWinMessage = function(msg) {
        console.log(msg);
        var winMsgBox = document.getElementById('msgbox');
        winMsgBox.innerHTML = '<h1 style="color:red">' + msg + '</h1>';
        gameFinished = true;
    };

    var hasFreeSpaces = function() {
        var nomove = '[]';
        for( var y = 0; y < 3; y += 1 ){
            for( var x = 0; x < 3; x += 1 ){
                if( $scope.board[y][x] === nomove )
                    return true;
            }
        }
        return false;
    }

    var checkBoard = function(){
        var xwin = 'XXX';
        var owin = 'OOO';

        var rdiag = '';
        var ldiag = '';
        for( var d = 0; d < 3; d += 1 ){
            ldiag += $scope.board[d][d];
            rdiag += $scope.board[(3-1)-d][d];
        }

        if( rdiag === xwin || ldiag === xwin ){
            setWinMessage('X Won');
        }

        if( rdiag === owin || ldiag === owin ){
            setWinMessage('O Won');
        }

        for( var y = 0; y < 3; y += 1 ){
            var colStr = '';
            var rowStr = '';
            for( var x = 0; x < 3; x += 1 ){
                rowStr += $scope.board[x][y];
                colStr += $scope.board[y][x];
            }

            if( colStr === xwin || rowStr === xwin ){
                setWinMessage('X Won');
            }

            if( colStr === owin || rowStr === owin ){
                setWinMessage('O Won');
            }
        }

        if( !gameFinished && !hasFreeSpaces() ){
            setWinMessage('noone won :c');
        }
    };

    $scope.post = function(r,c){
        if( !playerTurn ) return;
        if( $scope.board[c][r] != nomove ) return;

        placeMove(r,c, 'X');
        playerTurn = false;

        if( !gameFinished ) {
            $http.post('/api/move', {board: $scope.board}).success(function(res){
                $timeout( function() {
                    playerTurn = true;
                    placeMove(res.x, res.y, 'O');
                }, 750);
            });
        }
    }
}]);