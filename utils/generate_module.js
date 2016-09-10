process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
var chalk = require('chalk');
var suppose = require('suppose');

console.log(chalk.styles.bgGreen.open);
console.log(' Type component name [Enter]\n');
process.stdin.on('data', function (text) {
  console.log(' working...');
  console.log(chalk.styles.bgGreen.close);
  suppose('yo', ['crm:module', text])
    .when(/Overwrite/).respond('a\n')
    .on('error', function (err) {
      process.stdout.write(err.message);
    })
    .end(function (code) {
      console.log(chalk.bgGreen(' Generated the component: ' + text));
      done();
    })
});

function done() {
  process.exit();
}
