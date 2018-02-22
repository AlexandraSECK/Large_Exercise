/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        

    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
       //this.receivedEvent('deviceready');
         console.log("navigator.geolocation works well");
            //document.getElementById("oui").addEventListener("click", test); 

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();



//-----------------phase 1 a------------------------------

function getlatandlng(){
    var geocoder = new google.maps.Geocoder();
    var address=document.getElementById("address");
    geocoder.geocode( { 'address': address.value}, function(results, status) {
        if (status ==='OK') { //ERROR OR NOT
            if (results[0]) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                document.getElementById("result").innerHTML='Address : '+address.value+'<br/> Latitude : ' + latitude + '<br/>' + ' Longitude : ' + longitude;
            }
            else {
                alert('Your coordinates cannot be find.');
            }
        }
        else {
            alert('Your coordinates cannot be find.');
        }
    });
}


//-----------------phase 1 b------------------------------------

var marker; //marker in the map
var mark=false; // If there is a marker in the map

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 65.0120888, lng: 25.4650772}
    });
    var geocoder = new google.maps.Geocoder();
    document.getElementById('submitmarker').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });
}



function geocodeAddress(geocoder, map) {
    if(mark==true){
        marker.setMap(null); // hide the marker
        mark=false;
    }
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) { // Address
        if (status === 'OK') {
            if(results[0]){
                map.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                mark=true;
            }
            else{
                alert('Your coordinates cannot be find.');
            }
        }
        else {
            var latlngStr = address.split(',', 2);
            var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
            geocoder.geocode({'location': latlng}, function(results, status) { //LatLong
                if (status === 'OK') {
                    if (results[1]) {
                        map.setCenter(results[0].geometry.location);
                        map.setZoom(11);
                        marker = new google.maps.Marker({
                            position: latlng,
                            map: map
                        });
                        mark=true;
                    }
                    else{
                        alert('Your coordinates cannot be find.');
                    }
                }
                else{
                    alert('Your coordinates cannot be find :' + status);
                }
            });
        }
    });  
}


//-----------------------phase 1 c & d---------------------------------------

function userposition() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 65.0120888, lng: 25.4650772},
        zoom: 8
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        document.getElementById("userpos").innerHTML="Latitude: "+pos.lat +" Longitude : "+ pos.lng;
        marker = new google.maps.Marker({
            position: pos,
            map: map
        });
        map.setCenter(pos);
        }, function() { 
            errorgeol(true); // Browser doesn't support Geolocation
        });
    } else {
        errorgeol(false);
    }
}
      

function errorgeol(val){
    if(val==true){
        alert('The geolocation is not supported by your mobile');
    }
    else{
        alert('The Geolocation failed');
    }
}



//-------------------phase 2------------------------------------

var tabmarkers=[]; //array of markers
var nbmarkers=0;
var map;

function distance() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 65.0120888, lng: 25.4650772 }
    });
    map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
    });
}

function placeMarker(latLng, map) {
    if(nbmarkers!=2){
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
        nbmarkers++;
        if(tabmarkers[0]==null){
            tabmarkers[0]=marker;
        }
        else{
            tabmarkers[1]=marker;
        }
    }
    else{
        alert('There is already 2 markers, if you want to change click into erase');
      }    
}

function deleteMarkers() {
    for (var i = 0; i < 2; i++) {
        tabmarkers[i].setMap(null);
    }
    tabmarkers = [];
    nbmarkers=0;
}

      
function computeDistance(){
    if(tabmarkers[0]!=null && tabmarkers[1]!=null){
        var pos1=tabmarkers[0].position;
        var pos2=tabmarkers[1].position;
        var distance = google.maps.geometry.spherical.computeDistanceBetween( pos1, pos2);
        distance=distance/1000;
        document.getElementById("latLong").innerHTML="<br/> Distance: "+distance.toPrecision(3) +"km.";
    }
    else{
      alert("You need to put 2 markers into the map.");
    }
}



//---------------------------------phase 3--------------------------
function direction() {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: 65.0120888, lng: 25.4650772}
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('right-panel'));
    map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
    });
    document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    if(nbmarkers!=2)
        alert('You need to put 2 markers.')
    directionsService.route({
        origin: {lat: tabmarkers[0].position.lat(), lng: tabmarkers[0].position.lng()},  
        destination: {lat: tabmarkers[1].position.lat(), lng: tabmarkers[1].position.lng()},           
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            alert('Directions request failed due to ' + status);
        }
    });
    deleteMarkers();
    nbmarkers=0;
}

//-------------phase 4------------------------------------------------------------------------
function sendinfo(){
    var location=document.getElementById("location").value;
    var comment=document.getElementById("commentary").value;
    var user=document.getElementById("user").value;
    var latitude,longitude;
    if(location!="" && comment!=""){
        var geocoder = new google.maps.Geocoder();
        var latlngStr = location.split(',', 2);
        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                if (results[1]) {
                    var address=results[1].formatted_address;
                }
                latitude=Number(latlngStr[0]);
                longitude=Number(latlngStr[1]);
                saveData(user,address,latitude.toPrecision(4),longitude.toPrecision(4),comment);
                alert('Your commentary has been send');      
            }
            else{
                geocoder.geocode( { 'address': location}, function(results, status) {
                    if (status === 'OK') { //ERROR OR NOT
                        if (results[0]) {
                            latitude = results[0].geometry.location.lat();
                            longitude = results[0].geometry.location.lng();
                            saveData(user,location,latitude.toPrecision(4),longitude.toPrecision(4),comment);
                            alert('Your commentary has been send');
                        }
                        else{
                            alert('The coordinates do not seems to exist.');
                        }
                    }
                    else{
                        alert('Unable to detect your coordinates.');
                    }
                });
            }
        });
    }
}


//-------------phase 5------------------------------------
function foundImages(){
    var address=document.getElementById("address").value;
    var latitude,longitude;
    if(address!=""){
        var geocoder = new google.maps.Geocoder();
        var latlngStr = address.split(',', 2);
        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                latitude=parseFloat(latlngStr[0]);
                longitude=parseFloat(latlngStr[1]);
                document.getElementById("images").innerHTML="";
                displayImages(latitude.toPrecision(4),longitude.toPrecision(4));
            }
            else{
                geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status === 'OK') { //ERROR OR NOT
                        if (results[0]) {
                            latitude = results[0].geometry.location.lat();
                            longitude = results[0].geometry.location.lng();
                            document.getElementById("images").innerHTML="";
                            displayImages(latitude.toPrecision(4),longitude.toPrecision(4));
                        }
                        else{
                            alert('The coordinates do not seems to exist.');
                        }
                    }
                    else{
                        alert('Unable to detect your coordinates.');
                    }
                });
            }
        });
    }
}

//--------------phase 6----------------------------------------


function findInfo() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(65.0120888,25.4650772),
          zoom: 6
        });
        infomarkers(map);
      }


