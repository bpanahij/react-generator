'use strict';
const Generators = require('yeoman-generator');
let utils = require('../../utils/all');

class ComponentGenerator extends Generators.Base {

  constructor(args, options) {

    super(args, options);
    this.argument('name', {type: String, required: true});

    this.option('stateful', {
      desc: 'Create a stateless component instead of a full one',
      defaults: false
    });

    this.option('style', {
      desc: 'Create a component without creating an associated style',
      defaults: false
    });
  }

  writing() {
    const componentType = this.options.stateful ? 'Base' : 'Stateless';
    // Get the settings
    const settings = utils.yeoman.getAllSettingsFromComponentName(this.name);
    settings.hasStyle = this.options.style;
    if (this.options.hasStyle) {
      this.fs.copyTpl(
        this.templatePath(`yolt/styles/Component${settings.style.suffix}`),
        this.destinationPath(settings.style.path + settings.style.fileName),
        settings
      );
    }
    // Create the component
    this.fs.copyTpl(
      this.templatePath(`yolt/components/${componentType}.js`),
      this.destinationPath(settings.component.path + settings.component.fileName),
      settings
    );
    // Create the container
    this.fs.copyTpl(
      this.templatePath(`yolt/containers/container.js`),
      this.destinationPath(settings.component.path + 'container.js'),
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
  }
}

module.exports = ComponentGenerator;
