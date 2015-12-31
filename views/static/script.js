$(document).ready(function(){

//Grabs location data on page load if user agrees to it//
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

//Sets the map style and settings//
  var map = L.mapbox.map('map', 'mapbox.dark', {
    scrollWheelZoom: false
  });

//Recieves the coordinate data from the database on page load//
  $.ajax({
    url: '/',
    method: 'POST',
    success: function(data, status, obj){
      var mapData = data;
//Creates the heatmap layer//
      heat = L.heatLayer([], { maxZoom: 8 })
      .addTo(map);
      var boundsArr = [];

//Sets the map view area to fit all the coordinates by pushing an array into an array. Syntax is map.fitBounds([[lat,lng],[lat,lng]])//
      mapData.forEach(function(coords){
        if (coords.lat && coords.lng) {
          boundsArr.push([coords.lat,coords.lng]);
          map.fitBounds(boundsArr);
        }
      });
//Adds a heat map marker for each item in the database that has coordinates//
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
