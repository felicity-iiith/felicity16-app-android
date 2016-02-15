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
      events = JSON.parse(window.localStorage["events"]);
    }else{
      events = {};
    }
    if ("categories" in window.localStorage) {
      categories = JSON.parse(window.localStorage["categories"]);
    }else{
      categories = {};
    }
    if ("list" in window.localStorage) {
      list = JSON.parse(window.localStorage["list"]);
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
        if (response.data != "") {
          categories[name] = response.data;
          console.log(categories);
          categories[name].path = path.split('/')[1];
        }
        count--;
      });
    };
    var addEvent = function (name, path) {
      $http.get(urls.events + path).then(function (response) {
        if (response.data != "") {
          events[name] = response.data;
          events[name].category = path.split('/')[1];
        }
        count--;
      });

    };
    var updateEvents = function (up) {
      if (up.data != "") {
        console.log(up);
        list = up.data;
        var events_data = list.page_data.events_data;
        var i;
        count = 0;
        for (i in events_data) {
          if (events_data[i].template == "category") {
            count++;
            addCategory(events_data[i].data.name, events_data[i].path);
          } else if (events_data[i].template == "event") {
            count++;
            addEvent(events_data[i].data.name, events_data[i].path);
          }
        }
        save();
        console.log(events);
      }
    };

    function save() {
      if (count == 0) {
        console.log("updated!!");
        window.localStorage["events"] = JSON.stringify(events);
        window.localStorage["categories"] = JSON.stringify(categories);
        window.localStorage["list"] = JSON.stringify(list);
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
