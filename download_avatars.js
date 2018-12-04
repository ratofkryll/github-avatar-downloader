var request = require('request');
var fs = require('fs');
var secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

if (!fs.existsSync('./avatars')) {
  fs.mkdirSync('./avatars');
}

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
  request.get(url)
  .on('error', function (err) {
    console.log('Error: ', err.statusCode)
  })
  .on('response', function (response) {
    console.log(`
      Response Status Code: ${response.statusCode}\n
      Response Status Message: ${response.statusMessage}\n
      Response Headers: ${response.headers['content-type']}
    `);
  })
  .pipe(fs.createWriteStream(filepath));
}

getRepoContributors ('jquery', 'jquery', function (err, result) {
  console.log('Errors: ', err);
  // result.forEach(function (user) {
  //   console.log('Results: ', user.avatar_url);
  // });
  // console.log('Results: ', result[0].login + '\'s Avatar URL: ' + result[0].avatar_url);
});

downloadImageByURL('https://avatars2.githubusercontent.com/u/2741?v=3&s=466', 'avatars/kvirani.jpg');
