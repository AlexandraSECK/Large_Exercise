# Large_Exercise

Name of the application : geoloc

The app is divided into different pages. Each page corresponds to a phase or a step of a phase.
The app need the camera plugin and the geolocation plugin.

Phase 1: Corresponding to Display, Your position and the home page of the app. 
I used the google maps API to get data and to display the map.
My code is based on the documentation of the API.

source:
- https://developers.google.com/maps/documentation/javascript/geocoding
- https://developers.google.com/maps/documentation/javascript/markers
- https://developers.google.com/maps/documentation/javascript/geolocation


Phase 2: Corresponding to distances. For calculate the distance the user need to put 2 markers into the map by clicking into it. Then they can click into the the button to display the distance. If the user want to put make another research they need to click into another button to delete the markers. 
To compute the distance I used the geometry library and the function computeDistanceBetween that gives the distance in meters.

source: 
- https://developers.google.com/maps/documentation/javascript/geometry
