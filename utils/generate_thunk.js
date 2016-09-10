process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
var chalk = require('chalk');
var suppose = require('suppose');

console.log(chalk.styles.bgGreen.open);
console.log(' Type {store} {thunk} [Enter]\n i.e. messages addMessage [Enter]\n');
process.stdin.on('data', function (text) {
  console.log(' working...');
  console.log(chalk.styles.bgGreen.close);
  var arguments = ['crm:action'];
  var userParams = text.split(' ');
  var flags = ['--thunk'];
  suppose('yo', arguments.concat(userParams).concat(flags))
    .when(/Overwrite/).respond('a\n')
    .on('error', function (err) {
      process.stdout.write(err.message);
    })
    .end(function (code) {
      console.log(chalk.bgGreen(' Generated the action: ' + text));
      done();
    })
});

function done() {
  process.exit();
}
