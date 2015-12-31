// var socket = io.connect();

  // socket.on('tweets', function(tweet){
  //   $('#tweets').prepend('<p>' + tweet.text + '</p>');
  // });

$(document).ready(function(){
var mapData = {};
  window.onload = function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          console.log("Geolocation is not supported by this browser.");
      }
  };

  function showPosition(position) {
      $('.lat').val(position.coords.latitude);
      $('.lng').val(position.coords.longitude);
  }

  L.mapbox.accessToken = 'pk.eyJ1IjoiY2hpYml0b2Z1IiwiYSI6ImNpaXNkYzAycDAzNHZ2NG01Z3MxcmNjZWEifQ.j0WgZ0YRd36GE4cpJ7DxSQ';

  var map = L.mapbox.map('map', 'mapbox.dark', {
    scrollWheelZoom: false
  });

  $.ajax({
    url: '/',
    method: 'POST',
    success: function(data, status, obj){
      mapData = data;

      heat = L.heatLayer([], { maxZoom: 4 })
      .addTo(map);
      var boundsArr = [];
      mapData.forEach(function(coords){
        if (coords.lat && coords.lng) {
          boundsArr.push([coords.lat,coords.lng]);
          map.fitBounds(boundsArr);
        }
      });

      mapData.forEach(function(coords){
        if (coords.lat && coords.lng){
          heat.addLatLng(L.latLng(coords.lat,coords.lng));
        }

      });
    },
    error: function(err, status, message){
      console.log("Database error");
    }
  }).done(function(){

  });

});
