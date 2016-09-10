process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
var chalk = require('chalk');
var suppose = require('suppose');

console.log(chalk.styles.bgGreen.open);
console.log(' Type {route} {component} [Enter]\n i.e. inbox Inbox [Enter]\n');
process.stdin.on('data', function (text) {
  console.log(' working...');
  console.log(chalk.styles.bgGreen.close);
  var arguments = ['crm:route'];
  var userParams = text.split(' ');
  suppose('yo', arguments.concat(userParams))
    .when(/Overwrite/).respond('a\n')
    .on('error', function (err) {
      process.stdout.write(err.message);
    })
    .end(function (code) {
      console.log(chalk.bgGreen(' Generated the route: ' + text));
      done();
    })
});

function done() {
  process.exit();
}
