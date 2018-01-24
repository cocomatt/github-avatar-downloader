var request = require('request');
var fs = require('fs');

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode, response.statusMessage);
      console.log('Downloading image...');
    })
    .on('end', function() {
      console.log('Download complete.');
    })
    .pipe(fs.createWriteStream(filePath));
}

//this is the callback fumction
function printContributors(body) {
  body.forEach(function(object) {
    console.log('Login: ', object.login, '; ', object.avatar_url);
    downloadImageByURL(object.avatar_url, './avatars/' + object.login + '.jpg');
  });
}

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };
  request(options, function(err, res, body) {
    var contributors = JSON.parse(body);
    cb(contributors);
  });
}

var owner = process.argv.slice(2)[0];
var name = process.argv.slice(2)[1];

console.log('Welcome to the GitHub Avatar Downloader!');

if ((typeof owner !== 'string') || (typeof name !== 'string')) {
  console.log('Please enter a Repo Owner and and Repo Name.');
} else {
  getRepoContributors(owner, name, printContributors);
}
