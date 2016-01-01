angular.module('starter.controllers', [])
  .controller('HomeCtrl', function ($scope, $stateParams, Events) {
  })
  .controller('CategoryCtrl', function ($scope, $stateParams, Events) {
    $scope.title = $stateParams.categoryid;
    $scope.events = Events.all()
  })
  .controller('EventsCtrl', function ($scope) {
    $scope.categories = [{name: "hi", id: 1}, {name: "bye", id: 2}];
  });
