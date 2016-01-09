angular.module('starter.controllers', [])
  .controller('HomeCtrl', function ($scope, $stateParams, Events, $ionicSlideBoxDelegate) {
    $scope.slideHasChanged= function(x){};
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
    var event = Events.event($stateParams.eventid);
    if(event){
      $scope.event = event;
      $scope.timeleft = new Date(event.event_end_time).toDateString();
    }else{
      $scope.event = {title:"Not Found"}
    }
  });
