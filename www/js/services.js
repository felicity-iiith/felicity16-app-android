angular.module('starter.services', [])

.factory('Events', function() {
  // Might use a resource here that returns a JSON array
  var events = {
    categories:[
      {
        name:"Threads",
        id:1,
        events:[
          {
            "id":1,
            "title": "CodeCraft", // page title
            "tagline": "So, you think you can code?",
            "long_description": "Lorem ipsum",
            "event_start_time": 1451765833,
            "event_end_time": 1451852247,
            "event_venue": null // optional
          },
          {
            "id":2,
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
    update: function() {
      //update here
    },
    all: function() {
      return events;
    }
  };
});
