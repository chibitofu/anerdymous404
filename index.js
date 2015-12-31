var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var dotenv = require('dotenv');
var Twitter = require('twitter');
var filter = require('profanity-filter');
var db = require('./models');
filter.seed('profanity');
filter.setReplacementMethod('grawlix');
dotenv.load();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views') );
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:false} ) );

// io.on('connection', function(socket){
//   socket.on('event', function(data){});
//   socket.on('disconnect', function(){});
// });

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.get('/', function(req, res){
  res.render('index');
});

app.post('/', function(req, res){
  db.tweet.findAll().then(function(tweet){
    if (tweet) {
      res.status(200, 'success').send(tweet);
    } else {
      res.status(500, 'error');
    }
    res.render('index', {tweet: tweet});
  });
});

app.post('/newTweet', function(req, res){
  // var lowerCaseTweet = req.body.tweet.toLowerCase();
  var newTweet = "";
  var lat = req.body.lat.toFixed(4);
  var lng = req.body.lng.toFixed(4);
  var tweetBroken = req.body.tweet.split(" ");
  for (var key in tweetBroken) {
    var cleanTweet = filter.clean(tweetBroken[key]);
    if (key !== 0) {
      newTweet += " " + cleanTweet;
    } else {
      newTweet += cleanTweet;
    }
  }

  client.post('statuses/update', {status: newTweet}, function(error, tweet, response){
    newTweetItem = {
      tweet: req.body.tweet,
      lat: lat,
      lng: lng
    };

    db.tweet.create(newTweetItem).then(function(){
      res.redirect('/');
    });
  });
});

// client.stream('statuses/filter', {track: 'nerd'}, function(stream) {
//   stream.on('data', function(tweet){
//     var tweets = tweet;
//     io.emit('tweets', tweets);
//   });
//   stream.on('error', function(error){
//   });
// });

app.listen(process.env.PORT||3000);
