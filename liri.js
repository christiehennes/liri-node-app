require("dotenv").config();
const keys = require('./keys.js');
const $ = (require('jquery'));

debug = 0;


//Initalize Twitter
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

//Initalize Spotify 
var Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);

//Initalize OMDB
var request = require("request");


//Get the input from the user
let userInput = process.argv.slice(2);
if (debug){console.log(userInput);} 



//Process the user input with a switch statement 

let command = userInput[0];
let arg = userInput[1];

switch (command){

    case 'my-tweets':
    if(debug) console.log("in my tweets");

    client.get('statuses/user_timeline', {screen_name: 'christiehennes'}, function(error, tweets, response) {
        if(error) console.log(error);
        console.log(tweets);  // The favorites.
        console.log(response);  // Raw response object.
      });
        break;

    case 'spotify-this-song':
        if(debug) console.log("in spotify this song");

        spotify.search({ type: 'track', query: arg }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
            // console.log(JSON.stringify(data, null, " "));

            let songInfo = data.tracks.items[0];
            if(debug){console.log(JSON.stringify(songInfo, null, " "))};


            console.log(
                `
                Artist(s): ${songInfo.artists[0].name}
                Song Name: ${songInfo.name}
                Preview Link: ${songInfo.preview_url}
                Album: ${songInfo.album.name}
                `
            )





        });
        break;

    case 'movie-this':

    request('http://www.omdbapi.com/?t=' + arg + '&y=&plot=short&apikey=d7c89213', function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log(`
          Title: ${JSON.parse(body).Title}
          Year: ${JSON.parse(body).Year}
          IMDB Rating: ${JSON.parse(body).Ratings[0].Value}
          Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
          Country: ${JSON.parse(body).Country}
          Language: ${JSON.parse(body).Language}
          Plot: ${JSON.parse(body).Plot}
          Actors: ${JSON.parse(body).Actors}
          `);

        }
      });
        break;

    case 'do-what-it-says':
        break;

}


