var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

request('https://api.github.com/repos/jquery/jquery/contributors', function(err, res, body) {
  console.log(res);
});

