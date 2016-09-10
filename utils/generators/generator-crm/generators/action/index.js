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

/**
 * Create main files from templates
 * @param settings
 */
function createRootFiles(settings) {
  if (!fs.existsSync(settings.store.constants)) {
    // Create the constants file
    this.fs.copyTpl(
      this.templatePath(`yolt/constants.js`),
      this.destinationPath(settings.store.constants),
      settings
    );
  }
  if (!fs.existsSync(settings.store.actions)) {
    // Create the constants file
    this.fs.copyTpl(
      this.templatePath(`yolt/actions.js`),
      this.destinationPath(settings.store.actions),
      settings
    );
  }
  if (!fs.existsSync(settings.store.reducers)) {
    // Create the constants file
    this.fs.copyTpl(
      this.templatePath(`yolt/reducers.js`),
      this.destinationPath(settings.store.reducers),
      settings
    );
  }
  if (!fs.existsSync(settings.store.state)) {
    // Create the constants file
    this.fs.copyTpl(
      this.templatePath(`yolt/state.js`),
      this.destinationPath(settings.store.state),
      settings
    );
  }
}

class ActionGenerator extends Generators.Base {

  constructor(args, options) {
    super(args, options);
    this.argument('reducerRoot', {type: String, required: true});
    this.argument('name', {type: String, required: true});
    this.option('thunk', {
      desc: 'Create a thunk action; it uses other action\'s reducers (perfect for async actions).',
      defaults: false
    });
  }

  writing() {
    const thunk = this.options.thunk;
    const settings = utils.yeoman.getAllSettingsFromActionName(this.name, this.reducerRoot);
    createRootFiles.bind(this)(settings);

    if (thunk) {
      // thunks don't own a single action type, they reuse other action types, so no constants
      // Create the action
      this.fs.copyTpl(
        this.templatePath(`yolt/actions/thunk.js`),
        this.destinationPath(settings.action.path + settings.action.fileName),
        settings
      );
      // Thunks don't own a reducer, so no constants are needed
      // Wire up the action
      checkWrite(this.fs, settings.store.actions, [(lines) => {
        const importLine = `import {${settings.action.functionName}} from './actions/${settings.action.functionName}';`;
        const exportLine = `export {${settings.action.functionName}};`;
        lines = setOnTop(lines, importLine);
        return setOnBottom(lines, exportLine)
      }]);
    } else {
      // Wire up the constants
      checkWrite(this.fs, settings.store.constants, [(lines) => {
        const constLine = `export const ${settings.action.constantName} = '${settings.store.reducerRoot}/${settings.action.constantName}';`;
        return setOnBottom(lines, constLine)
      }]);
      // Create the action
      this.fs.copyTpl(
        this.templatePath(`yolt/actions/action.js`),
        this.destinationPath(settings.action.path + settings.action.fileName),
        settings
      );
      // Create the reducer
      this.fs.copyTpl(
        this.templatePath(`yolt/reducers/reducer.js`),
        this.destinationPath(settings.reducer.path + settings.reducer.fileName),
        settings
      );
      // Create the test
      this.fs.copyTpl(
        this.templatePath(`yolt/test.js`),
        this.destinationPath(settings.test.path + settings.test.fileName),
        settings
      );
      // Wire up the action
      checkWrite(this.fs, settings.store.actions, [(lines) => {
        const importLine = `import {${settings.action.functionName}} from './actions/${settings.action.functionName}';`;
        const exportLine = `export {${settings.action.functionName}};`;
        lines = setOnTop(lines, importLine);
        return setOnBottom(lines, exportLine)
      }]);
      // Write the reducers
      checkWrite(this.fs, settings.store.reducers, [(lines) => {
        const importLine = `import {${settings.reducer.functionName}} from './reducers/${settings.reducer.functionName}';`;
        const handlerLine = `ACTION_HANDLERS = {...ACTION_HANDLERS, ...${settings.reducer.functionName}};`;
        lines = setOnTop(lines, importLine);
        return setOnBottom(lines, handlerLine)
      }]);
      // Wire up entire reducer root
      checkWrite(this.fs, settings.store.createRootReducer, [(lines) => {
        const importLine = `import {${settings.store.reducerRoot}Reducer} from './${settings.store.reducerRoot}/reducers';`;
        const reducerLine = `reducers.push((store) => injectReducer(store, {key: "${settings.store.reducerRoot}", reducer: ${settings.store.reducerRoot}Reducer}));`;
        lines = setOnTop(lines, importLine);
        return setOnBottom(lines, reducerLine)
      }]);
    }
  }
}


module.exports = ActionGenerator;
