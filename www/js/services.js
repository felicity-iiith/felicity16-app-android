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
            name:"CodeCraft"
          },
          {
            name:"Cache-In"
          }
        ]
      }
    ]
  };

  return {
    all: function() {
      return events;
    },
    remove: function(eventNumber) {
      events.splice(events.indexOf(eventNumber), 1);
    },
    get: function(eventNumber) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(eventNumber)) {
          return events[i];
        }
      }
      return null;
    }
  };
});
