var socket = io.connect();

  socket.on('tweets', function(tweet){
    $('#tweets').prepend('<p>' + tweet.text + '</p>');
  });

$(document).ready(function(){

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          console.log("Geolocation is not supported by this browser.");
      }
  }
  
  function showPosition(position) {
      $('.lat').val(position.coords.latitude);
      $('.lng').val(position.coords.longitude);
  }

});
