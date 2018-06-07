require("dotenv").config();

var utils = require("./utils");

const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const fs = require("fs");
const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

const nodeArgs = process.argv;

let liriCommand = process.argv[2];
let liriChoice = "";

for (let index = 3; index < nodeArgs.length; index++) {
  liriChoice += nodeArgs[index] + " ";
}

function randomCommand(command, choice) {
  switch (command) {
    case "my-tweets":
      utils.showTweets(client);
      break;
    case "spotify-this-song":
      utils.showSongsInfo(choice, spotify);
      break;
    case "movie-this":
      utils.showMovieInfo(choice);
      break;
    default:
      console.log("I don't understand this command");
  }
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
} else if (liriCommand === "do-what-it-says") {
  fs.readFile("./random.txt", "utf8", (err, data) => {
    if (err) throw err;
    const text = data.split(",");
    liriCommand = text[0].trim();
    liriChoice = text[1].trim();
    randomCommand(liriCommand, liriChoice);
  });
} else {
  console.log("I don't understand this command");
}
