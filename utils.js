const urlencode = require('urlencode');
const request = require("request");
module.exports = {
  showSongsInfo: (song = "The Sign") => {
    spotify.search(
      {
        type: "track",
        query: song
      },
      (err, data) => {
        if (err) {
          return console.log("Error occurred: " + err);
        }

        console.log(JSON.stringify(data));
      }
    );
  },

  showTweets: client => {
    client.get("statuses/user_timeline", (err, tweets, response) => {
      if (!err) {
        for (let tweet of tweets) {
          console.log(
            `
              tweet: ${tweet.text}
              tweet date and time: ${tweet.created_at}`
          );
        }
      } else {
        console.log(err);
      }
    });
  },

  showMovieInfo: (movie) => {
    movie = urlencode(movie);
    console.log(movie)
    let url = 'http://www.omdbapi.com/?t='+movie+'&y=&plot=short&apikey=trilogy'
    request(
      url,
      function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        }
      }
    );
  }
};
