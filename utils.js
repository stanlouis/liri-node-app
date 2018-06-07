const urlencode = require("urlencode");
const request = require("request");
const tags = require("common-tags");

module.exports = {
  showSongsInfo: (song, spotify) => {
    spotify.search(
      {
        type: "track",
        query: song
      },
      (err, data) => {
        if (err) {
          return console.log("Error occurred: " + err);
        }
        var info = data.tracks.items[0];
        console.log(tags.stripIndents`
          Artist(s) name: ${info.artists[0].name}
          Song's name: ${info.name}
          Song's link: ${info.preview_url}
          Song's Album: ${info.album.name}
        `);
      }
    );
  },

  showTweets: client => {
    client.get("statuses/user_timeline", (err, tweets, response) => {
      if (!err) {
        for (let tweet of tweets) {
          console.log(
            tags.stripIndents`
              tweet: ${tweet.text}
              tweet date and time: ${tweet.created_at}`
          );
        }
      } else {
        console.log(err);
      }
    });
  },

  showMovieInfo: movie => {
    movie = urlencode(movie);
    let url =
      "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(url, function(error, response, body) {
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
        const bodyObj = JSON.parse(body);
        const output = tags.stripIndents`
          Movie's title: ${bodyObj.Title}
          Movie's title: ${bodyObj.Year}
          Movie's IMDB rating: ${bodyObj.imdbRating}
          Movie's Rotten Tomatoes rating: ${bodyObj.Ratings[1]["Value"]}
          Movie's country: ${bodyObj.Country}
          Movie's language: ${bodyObj.Language}
          Movie's plot: ${bodyObj.Plot}
          Movie's actors: ${bodyObj.Actors}
          `;
        console.log(output);
      }
    });
  }
};
