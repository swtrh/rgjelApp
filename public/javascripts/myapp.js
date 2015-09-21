var myapp = angular.module('myapp', []);

myapp.controller('myappcontroller', ['$scope', function($scope){
    $scope.place = 'world';
}]);