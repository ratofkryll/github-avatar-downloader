var request = require('request');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors (repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': secrets.GITHUB_TOKEN
    }
  };
  var parsedBody = [];
  request (options, function (err, res, body) {
    parsedBody = JSON.parse(body);
    // console.log(parsedBody[0].login + '\'s Avatar URL: ' + parsedBody[0].avatar_url)
    cb(err, parsedBody);
  });
}

function downloadImageByURL (url, filepath) {
  
}

getRepoContributors ('jquery', 'jquery', function (err, result) {
  console.log('Errors: ', err);
  result.forEach(function (user) {
    console.log('Results: ', user.avatar_url);
  });
  // console.log('Results: ', result[0].login + '\'s Avatar URL: ' + result[0].avatar_url);
});
