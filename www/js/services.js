angular.module('starter.services', [])

  .factory('Events', function ($http) {
    var events={};
    var categories={};
    var lastupdated;
    var urls = {
      events:"http://felicity.iiit.ac.in/api"
    };
    // Might use a resource here that returns a JSON array
    var updateFirst = function () {
      return $http.get(urls.events).then(function (response) {
        updateEvents(response);
        updateTime(new Date());
        return events;
      });
    };
    var updateTime = function(up){
      lastupdated = up;
      window.localStorage["lastupdated"] = up;
    };
    var addCategory =function(name,path){
      $http.get(urls.events+path).then(function (response) {
        categories[name]=response.data;
        categories[name].path=path.split('/')[1];
      });
    };
    var addEvent =function(name,path){
      $http.get(urls.events+path).then(function (response) {
        events[name]=response.data;
        events[name].category = path.split('/')[1];
      });
    };
    var updateEvents = function(up){
      console.log(up);
      events = up.data.page_data.events_data;
      var i;
      for(i in events){
        if(events[i].template=="category"){
          addCategory(events[i].data.name,events[i].path);
        }else if(events[i].template=="event") {
          addEvent(events[i].data.name,events[i].path);
        }
      }
      window.localStorage["events"] = events;
    };
    updateFirst();
/*
    if ("lastupdated" in window.localStorage) {
      lastupdated = window.localStorage["events"];
      events = JSON.parse(window.localStorage["events"]);
    }else {
      updateFirst();
    }
    if ("events" in window.localStorage) {
      events = JSON.parse(window.localStorage["events"]);
    }else {
      events ={};
    }
*/
    return {
      update: function () {
        //update here

      },
      "updateFirst": updateFirst,
      categories: function() {
        return categories;
      },
      category: function (category) {
        return categories[category];
      },
      event: function (eventid) {
        if (events.hasOwnProperty(eventid)) {
          return events[eventid];
        } else {
          return false;
        }
      }
    };
  });
