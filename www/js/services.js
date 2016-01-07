angular.module('starter.services', [])

  .factory('Events', function ($http) {
    var events;
    var lastupdated;
    var urls = {
      events:"https://www.mukulhase.com/api/events",
      event:"",
      update:""
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
    var updateEvents = function(up){
      events = up;
      window.localStorage["events"] = up;
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
      all: function () {
        return events;
      },
      event: function (eventid) {
        var cat = events.categories;
        var found = false;
        var event;
        for (var x in cat) {
          for (var y in cat[x].events) {
            if (cat[x].events[y].id == eventid) {
              found = true;
              event = cat[x].events[y];
              break;
            }
          }
          if (found)break;
        }
        if (found) {
          return event;
        } else {
          return false;
        }
      }
    };
  });
