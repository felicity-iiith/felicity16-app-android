angular.module('starter.services', [])

  .factory('Events', function ($http) {
    var events;
    var categories;
    var lastupdated;
    var urls = {
      events:"https://www.mukulhase.com/api"
    };
    // Might use a resource here that returns a JSON array
    var updateFirst = function () {
      return $http.get(urls.events).then(function (response) {
        updateEvents(response);
        updateTime(time.now());
        return events;
      });
    };
    var updateTime = function(up){
      lastupdated = up;
      window.localStorage["lastupdated"] = up;
    };
    function addCategory(name,path){
      $http.get(urls.events+path).then(function (response) {
        categories[name]=response;
        categories[name].path=path;
      });
    }
    function addEvent(name,path){
      $http.get(urls.events+path).then(function (response) {
        events[name]=response;
        events[name].category = path.split('/')[1];
      });
    }
    var updateEvents = function(up){
      events = up.page_data.events_data;
      var i;
      for(i in events){
        if(events[i].template=="category"){
          addCategory(events[i].data.name,events[i].data.path);
        }else if(events[i].template=="event") {
          addEvent(events[i].data.name,events[i].data.path);
        }
      }
      window.localStorage["events"] = events;
    };

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
    events = {
      categories: [
        {
          name: "Threads",
          id: 1,
          events: [
            {
              "id": 1,
              "title": "CodeCraft", // page title
              "tagline": "So, you think you can code?",
              "long_description": "Lorem ipsum",
              "event_start_time": 1451765833,
              "event_end_time": 1451852247,
              "event_venue": null // optional
            },
            {
              "id": 2,
              "title": "Cache-In", // page title
              "tagline": "So, you think you can craft?",
              "long_description": "Lorem ipsum",
              "event_start_time": 1451765833,
              "event_end_time": 1451852247,
              "event_venue": null // optional
            }
          ]
        }
      ]
    };

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
