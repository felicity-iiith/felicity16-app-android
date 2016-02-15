angular.module('starter.services', [])

  .factory('Events', function ($http) {
    var events = {};
    var categories = {};
    var list = {};
    var count = 0;
    var urls = {
      events: "http://felicity.iiit.ac.in/api"
    };
    if ("events" in window.localStorage) {
      events = window.localStorage["events"];
    }else{
      events = {};
    }
    if ("categories" in window.localStorage) {
      categories = window.localStorage["categories"];
    }else{
      categories = {};
    }
    if ("list" in window.localStorage) {
      list = window.localStorage["list"];
    }else{
      list = {};
    }
    // Might use a resource here that returns a JSON array
    var updateFirst = function () {
      return $http.get(urls.events+"?prev_id="+list.version_id).then(function (response) {
        updateEvents(response);
        return events;
      });
    };
    var addCategory = function (name, path) {
      $http.get(urls.events + "/" + path.split('/')[1]).then(function (response) {
        if (response.status == 200) {
          categories[name] = response.data;
          console.log(categories);
          categories[name].path = path.split('/')[1];
        }
        count--;
      });
    };
    var addEvent = function (name, path) {
      $http.get(urls.events + path).then(function (response) {
        if (response.status == 200) {
          events[name] = response.data;
          events[name].category = path.split('/')[1];
        }
        count--;
      });

    };
    var updateEvents = function (up) {
      if (up.status == 200) {
        events = up.data.page_data.events_data;
        var i;
        count = 0;
        for (i in events) {
          if (events[i].template == "category") {
            count++;
            addCategory(events[i].data.name, events[i].path);
          } else if (events[i].template == "event") {
            count++;
            addEvent(events[i].data.name, events[i].path);
          }
        }
        list = up.data;
        save();
      }
    };

    function save() {
      if (count == 0) {
        console.log("updated!!");
        window.localStorage["events"] = events;
        window.localStorage["categories"] = categories;
        window.localStorage["list"] = list;
      } else {
        setTimeout(save, 50);
      }
    }

    updateFirst();

    return {
      update: function () {
        //update here

      },
      "updateFirst": updateFirst,
      categories: function () {
        return categories;
      },
      category: function (category) {
        return categories[category];
      },
      events: function () {
        return events;
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
