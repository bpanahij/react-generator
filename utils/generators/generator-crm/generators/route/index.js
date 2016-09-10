'use strict';
const Generators = require('yeoman-generator');
let utils = require('../../utils/all');
const _ = require('underscore.string');
let fs = require('fs');

function checkWrite(yoFS, filePath, modifications) {
  // Set the constant
  let lines = _.lines(yoFS.read(filePath));
  modifications.forEach((modification) => {
    lines = modification(lines);
  });
  yoFS.write(filePath, lines.join("\n"));
}

function setOnTop(lines, importLine) {
  if (lines.indexOf(importLine) < 0) {
    lines.unshift(importLine);
  }
  return lines;
}

function setOnBottom(lines, importLine) {
  if (lines.indexOf(importLine) < 0) {
    lines.push(importLine);
  }
  return lines;
}

class ActionGenerator extends Generators.Base {

  constructor(args, options) {
    super(args, options);
    this.argument('path', {type: String, required: true});
    this.argument('component', {type: String, required: true});
  }

  writing() {
    const thunk = this.options.thunk;
    const settings = utils.yeoman.getAllSettingsFromRouteName(this.path, this.component);

    // Create the action
    this.fs.copyTpl(
      this.templatePath(`yolt/route/route.js`),
      this.destinationPath(settings.route.path + settings.route.fileName),
      settings
    );
  }
}


module.exports = ActionGenerator;
