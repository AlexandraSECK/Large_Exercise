//$ip="192.168.43.230"; // S5
$ip="192.168.102.144"; // CampusNet
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
