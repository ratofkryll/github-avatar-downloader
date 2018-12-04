var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

var owner = process.argv[2];
var repo = process.argv[3];

// Checks if avatars directory exists. If not, creates it.
if (!fs.existsSync('./avatars')) {
  fs.mkdirSync('./avatars');
};

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
    cb(err, parsedBody);
  });
};

function downloadImageByURL (url, filepath) {
  request.get(url)
  .on('error', function (err) {
    console.log('Error: ', err.statusCode)
  })
  .pipe(fs.createWriteStream(filepath));
  console.log('Download complete!')
};

getRepoContributors (owner, repo, function (err, result) {
  console.log('Errors: ', err);
  result.forEach(function (user) {
    console.log(`Downloading ${user.login}'s avatar...`)
    downloadImageByURL(user.avatar_url, `./avatars/${user.login}.jpg`)
  });
});
