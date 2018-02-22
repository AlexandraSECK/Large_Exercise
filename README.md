# Large_Exercise
Name of the application : geoloc

The app is divided into different pages. Each page corresponds to a phase or a step of a phase.

Phase 1: Corresponding to Display, Your position and the home page of the app. I used the google maps API to get data and to display the map. My code is based on the documentation of the API.

source:

- https://developers.google.com/maps/documentation/javascript/geocoding
- https://developers.google.com/maps/documentation/javascript/markers 
- https://developers.google.com/maps/documentation/javascript/geolocation

Phase 2: Corresponding to distances. For calculate the distance the user need to put 2 markers into the map by clicking into it. Then they can click into the the button to display the distance. If the user want to put make another research they need to click into another button to delete the markers. To compute the distance I used the geometry library and the function computeDistanceBetween that gives the distance in meters.

source:
- https://developers.google.com/maps/documentation/javascript/geometry

Phase 3: Corresponding to directions. For get the directions it's the same as for the phase 2 but it's display the path and the directions (driving).

source:
https://developers.google.com/maps/documentation/javascript/examples/directions-travel-modes
https://developers.google.com/maps/documentation/javascript/directions

Phase 4: This phase cannot be tested because the database is on my computer. I use mysql for the database,wampserver and php files located in the server. The php files are on the directory "phpdatabase". 
When a information is send, it is stored into my database.

source:
- https://developers.google.com/maps/documentation/javascript/mysql-to-maps

