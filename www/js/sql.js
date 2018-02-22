//$ip="192.168.43.230";
$ip="192.168.102.144";
//-------------phase 4--------------------------
function saveData(user,address,lat,lng,info) {
  var url = "http://"+$ip+"/MIP/insertdata.php?user=" + user + "&address=" + address +
  "&info=" + info + "&lat=" + lat + "&lng=" + lng;
  downloadUrl(url);
}

function downloadUrl(url) {
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
    }
  };
  request.open('GET', url, true);
  request.send(null);
}


 function doNothing () {
}

//-------------------------phase 5-------------------------------
function displayImages(lat,lng) {
    var url = "http://"+$ip+"/MIP/connect.php?lat=" + lat + "&lng=" + lng;

    downloadUrlb(url, function(data) {
        var xml = data.responseXML;
        var markers = xml.documentElement.getElementsByTagName('Listphotos');
        Array.prototype.forEach.call(markers, function(markerElem) {
            var photo = markerElem.getAttribute('photo');
            document.getElementById("images").innerHTML+="<img src='"+photo+"'/>";
        });
    });
}


function downloadUrlb(url, callback) {
  var request = window.ActiveXObject ?
  new ActiveXObject('Microsoft.XMLHTTP') :
  new XMLHttpRequest;
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };
  request.open('GET', url, true);
  request.send(null);
}

//-------------------phase 6-----------------

function infomarkers(map){
    downloadUrlc('http://'+$ip+'/MIP/displayInfo.php', function(data) {
        var xml = data.responseXML;
        var info = xml.documentElement.getElementsByTagName('Listinfo');
        Array.prototype.forEach.call(info, function(markerElem) {
            var user = markerElem.getAttribute('username');
            var address = markerElem.getAttribute('address');
            var info = markerElem.getAttribute('info');

            var loc = new google.maps.LatLng(
            parseFloat(markerElem.getAttribute('lat')),
            parseFloat(markerElem.getAttribute('lng')));

            var infoWindow = new google.maps.InfoWindow;
            var infowincontent = document.createElement('div');
            var strong = document.createElement('strong');
            strong.textContent = "User : "+user;
            infowincontent.appendChild(strong);
            infowincontent.appendChild(document.createElement('br'));
            var text = document.createElement('text');
            text.textContent = "Address : "+ address
            infowincontent.appendChild(text);
            infowincontent.appendChild(document.createElement('br'));
            text= document.createElement('info');
            text.textContent = info
            infowincontent.appendChild(text);

            var marker = new google.maps.Marker({
                map: map,
                position: loc,
            });
            marker.addListener('click', function() {
            infoWindow.setContent(infowincontent);
            infoWindow.open(map, marker);
            });
        });
    });
}



function downloadUrlc(url, callback) {
    var request = window.ActiveXObject ?
        new ActiveXObject('Microsoft.XMLHTTP') :
        new XMLHttpRequest;

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
        }
    };

    request.open('GET', url, true);
    request.send(null);
}

function doNothing() {}


