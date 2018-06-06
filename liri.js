require("dotenv").config();

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require('request');
const inquirer = require('inquirer');
const fs = require('fs');
const keys = require('./keys.js');

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

const nodeArgs = process.argv;

const liriCommand = process.argv[2];
let liriChoice = "";

for (let index = 3; index < nodeArgs.length; index++) {
  liriChoice = liriChoice + " " + nodeArgs[index];
}

const showTweets = () => {
  client
    .get('statuses/user_timeline', function (err, tweets, response) {

      if (!err) {
        for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].text);
        }
      } else {
        console.log(err)
      }
    });

}

function showSongsInfo(song = "The Sign") {
  spotify
    .search({
      type: 'track',
      query: song
    }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      console.log(JSON.stringify(data));
    });
}

console.log(liriChoice);

if (liriCommand === 'my-tweets') {
  showTweets();
} else if (liriCommand === 'spotify-this-song') {
  showSongsInfo(liriChoice);
}