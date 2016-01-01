angular.module('starter.controllers', [])
  .controller('HomeCtrl', function ($scope, $stateParams, Events) {
  })
  .controller('CategoryCtrl', function ($scope, $stateParams, Events) {
    var category;
    var events=Events.all();
    for(var x in events.categories){
      if(events.categories[x].id==$stateParams.categoryid){
        category=events.categories[x];
        break;
      }
    }
    $scope.title = category.name;
    $scope.events = category.events;
  })
  .controller('EventsCtrl', function ($scope, Events) {
    $scope.categories = Events.all().categories;
  });
