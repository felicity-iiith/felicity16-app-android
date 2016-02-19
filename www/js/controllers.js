angular.module('starter.controllers', [])
  .controller('HomeCtrl', function ($scope, $stateParams, Events, $ionicSlideBoxDelegate,  $cordovaLocalNotification) {
    $scope.clear = function(){
      localStorage.clear();
      Events.clear();
    };
  })
  .controller('CategoryCtrl', function ($scope, $stateParams, Events) {
    var category=Events.categories()[$stateParams.categoryid];
    var events=Events.events();
    var eventsOfCategory=[];
    for (var key in events) {
      if (events.hasOwnProperty(key)) {
        if(events[key].category==category.path){
          eventsOfCategory.push(events[key]);
        }
      }
    }
    $scope.title = category.page_data.name;
    $scope.events = eventsOfCategory;
  })
  .controller('EventsCtrl', function ($scope, Events) {
    $scope.categories = Events.categories();
    $scope.isLoading = Events.isLoading();
    $scope.doRefresh = function(){
      Events.updateFirst();
    };
    setInterval(function(){
      $scope.isLoading = Events.isLoading();
      if(!Events.isLoading()){
        $scope.$broadcast('scroll.refreshComplete');
      }
    },1000);
  })
  .controller('AboutCtrl', function ($scope, Events) {

  })
  .controller('EventViewCtrl', function ($scope, $stateParams, Events) {
    var event = Events.event($stateParams.eventid);
    if(event){
      $scope.event = event;
      $scope.timeleft = new Date(event.page_data.end_time).toDateString();
    }else{
      $scope.event = {title:"Not Found"}
    }
  });
