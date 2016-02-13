angular.module('starter.controllers', [])
  .controller('HomeCtrl', function ($scope, $stateParams, Events, $ionicSlideBoxDelegate) {
    $scope.slideHasChanged= function(x){};
  })
  .controller('CategoryCtrl', function ($scope, $stateParams, Events) {
    var category=Events.categories()[$stateParams.categoryid];
    var events=Events.events();
    for (var key in events) {
      if (events.hasOwnProperty(key)) {
        if(events[key].category==);
      }
    }
    $scope.title = category.name;
    $scope.events = category.events;
  })
  .controller('EventsCtrl', function ($scope, Events) {
    $scope.categories = Events.categories();
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
