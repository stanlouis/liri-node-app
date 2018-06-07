require("dotenv").config();

var utils = require("./utils");

const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const inquirer = require("inquirer");
const fs = require("fs");
const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

const nodeArgs = process.argv;

const liriCommand = process.argv[2];
let liriChoice = "";

for (let index = 3; index < nodeArgs.length; index++) {
  liriChoice += nodeArgs[index] + " ";
}

if (liriCommand === "my-tweets") {
  utils.showTweets(client);
} else if (liriCommand === "spotify-this-song") {
  if (liriChoice === "") {
    utils.showSongsInfo("The Sign", spotify);
  } else {
    utils.showSongsInfo(liriChoice, spotify);
  }
} else if (liriCommand === "movie-this") {
  if (liriChoice === "") {
    utils.showMovieInfo("Mr. Nobody");
  } else {
    utils.showMovieInfo(liriChoice);
  }
}
