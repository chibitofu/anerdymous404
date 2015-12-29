var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Twitter = require('twitter');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views') );
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false} ) );

io.on('connection', function(socket){
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
});

var client = new Twitter({
  consumer_key:'J1nGeALxaEoJa2Y3AMRMIgURl',
  consumer_secret:'cVp09BMJ3BWndRUfrlHL3i1gk1ZDCRrbXSjIE0NyvbdzzuUDYw',
  access_token_key:'4658204454-tBQRWPKOxzKr67B8PNRxtymPGNDwSWKx5jb1n9q',
  access_token_secret:'CghPNWNb8RlLin6BxXwGdYHZfk4GkisEqzwjlZu9h0oL6'
});

var params = {screen_name: 'anerdymous404'};

app.get('/', function(req, res){
  client.stream('statuses/filter', {track: 'anerdymouse404'}, function(stream) {
    stream.on('data', function(tweet){
      var tweets = tweet;
      io.emit('tweets', tweets);
    });
    stream.on('error', function(error){
      throw error;
    });
  });

  res.render('index');
});

app.post('/newTweet', function(req, res){
  var newTweet = req.body.tweet;
  client.post('statuses/update', {status: newTweet}, function(error, tweet, response){
    console.log(tweet);
  });
});

server.listen(process.env.PORT||3000);
