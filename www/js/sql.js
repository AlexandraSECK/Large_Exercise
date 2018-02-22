$ip="192.168.43.230";
//$ip="192.168.102.144";
//$ip="10.4.2.11";
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

function saveImage(address,lat,lng,photo) {
  var url = "http://"+$ip+"/MIP/insertphoto.php?address=" + address +
  "&photo=" + photo + "&lat=" + lat + "&lng=" + lng;
  downloadUrl(url);
}



