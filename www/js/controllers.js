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
  })
  .controller('EventViewCtrl', function ($scope, $stateParams, Events) {
    var cat = Events.all().categories;
    var found = false;
    var event;
    for(var x in cat){
      for(var y in cat[x].events){
        if(cat[x].events[y].id == $stateParams.eventid){
          found = true;
          event = cat[x].events[y];
          break;
        }
      }
      if(found)break;
    }
    if(found){
      $scope.title = event.title;
      $scope.tagline = event.tagline;
      $scope.long_description = event.long_description
    }else{
      $scope.title = "not found";
      $scope.name = "not found";
    }
  });
