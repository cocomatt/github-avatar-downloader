var request = require('request');

function printBody(body) {
  console.log(body);
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
    contributors.forEach(function(contributor) {
      printBody(contributor.avatar_url);
    });
  });
}

console.log('Welcome to the GitHub Avatar Downloader!');

getRepoContributors("jquery", "jquery", printBody);
