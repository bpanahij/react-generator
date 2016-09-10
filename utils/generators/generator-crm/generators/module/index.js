'use strict';
const Generators = require('yeoman-generator');
let utils = require('../../utils/all');
const _ = require('underscore.string');
let fs = require('fs');

function addToPackageDeps(yoFS, key, value) {
  const filePath = __dirname + '/../../../../../package.json';
  let packageJSON = JSON.parse(yoFS.read(filePath));
  packageJSON.dependencies[key] = value;
  yoFS.write(filePath, JSON.stringify(packageJSON, null, ' '));
}

class ComponentGenerator extends Generators.Base {

  constructor(args, options) {

    super(args, options);
    this.argument('name', {type: String, required: true});

    this.option('stateful', {
      desc: 'Create a stateless component instead of a full one',
      defaults: false
    });
  }

  writing() {
    const componentType = this.options.stateful ? 'Base' : 'Stateless';
    // Get the settings
    const settings = utils.yeoman.getAllSettingsFromModuleName(this.name);
    // Create the style
    this.fs.copyTpl(
      this.templatePath(`yolt/styles/Component${settings.style.suffix}`),
      this.destinationPath(settings.style.path + settings.style.fileName),
      settings
    );
    // Create the component
    this.fs.copyTpl(
      this.templatePath(`yolt/components/${componentType}.js`),
      this.destinationPath(settings.component.path + settings.component.fileName),
      settings
    );
    // Create the component
    this.fs.copyTpl(
      this.templatePath(`yolt/root/index.js`),
      this.destinationPath(settings.component.path + 'index.js'),
      settings
    );
    // Create the unit test
    this.fs.copyTpl(
      this.templatePath(`yolt/tests/Base.js`),
      this.destinationPath(settings.test.path + settings.test.fileName),
      settings
    );

    addToPackageDeps(this.fs, settings.component.className, settings.component.path);
  }
}

module.exports = ComponentGenerator;
