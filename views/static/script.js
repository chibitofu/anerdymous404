var socket = io.connect();

  socket.on('tweets', function(tweet){
    $('#tweets').prepend('<p>' + tweet.text + '</p>');
    console.log(tweet.text);
  });
