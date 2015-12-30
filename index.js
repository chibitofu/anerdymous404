var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var dotenv = require('dotenv');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Twitter = require('twitter');
var filter = require('profanity-filter');
filter.seed('profanity');
filter.setReplacementMethod('word');
dotenv.load();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views') );
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false} ) );

io.on('connection', function(socket){
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
});

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var params = {screen_name: 'anerdymous404'};

app.get('/', function(req, res){
  client.get('search/tweets', {q: 'anerdymous404'}, function(error, tweets, response){
    if(!error){
      var tweet = tweets.statuses;
      console.log(tweet);
      res.render('index', {tweet: tweet});
    }
  });
});

app.post('/newTweet', function(req, res){
  filter.seed('profanity');
  filter.setReplacementMethod('word');
  var lowerCaseTweet = req.body.tweet.toLowerCase();
  var newTweet = filter.clean(lowerCaseTweet);
  client.post('statuses/update', {status: newTweet}, function(error, tweet, response){
    console.log(tweet);
    res.redirect('/');
  });
});

client.stream('statuses/filter', {track: 'nerd'}, function(stream) {
  stream.on('data', function(tweet){
    var tweets = tweet;
    io.emit('tweets', tweets);
  });
  stream.on('error', function(error){
  });
});

server.listen(process.env.PORT||3000);
