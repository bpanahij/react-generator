'use strict';

const path = require('path');
const configUtils = require('./config');
const _ = require('underscore.string');

// Needed directory paths
const baseName = path.basename(process.cwd());

/**
 * Get the base directory
 * @return {String}
 */
let getBaseDir = () => {
  return baseName;
};

/**
 * Get all settings (paths and the like) from components name
 * @param {String} componentName The components name
 * @return {Object} Component settings
 */
let getAllSettingsFromComponentName = (componentName) => {
  const style = 'css';
  let cleanedPaths = getCleanedPathName(componentName);
  let componentParts = cleanedPaths.split('/');
  let componentBaseName = _.capitalize(componentParts.pop());
  let componentPartPath = componentParts.join('/');
  let componentFullName = _.classify(_.replaceAll(componentName, '/', '_'));
  let styleSettings = configUtils.getChoiceByKey('style', style);
  let componentPath = configUtils.getChoiceByKey('path', 'component');
  let settings;
  settings = {
    style: {
      webpackPath: `./${componentBaseName}${styleSettings.suffix}`,
      path: `${componentPath.path}/${componentPartPath}/${componentBaseName}/`,
      fileName: `${componentBaseName}${styleSettings.suffix}`,
      className: 'main',
      suffix: styleSettings.suffix
    },
    component: {
      webpackPath: `components${componentPartPath}/${componentBaseName}/${componentBaseName}.js`,
      path: `${componentPath.path}/${componentPartPath}/${componentBaseName}/`,
      fileName: `${componentBaseName}.js`,
      className: `${componentBaseName}`,
      displayName: `${componentFullName}`,
      suffix: '.js'
    },
    test: {
      path: `${componentPath.path}/${componentPartPath}/${componentBaseName}/`,
      fileName: `${componentBaseName}.test.js`
    }
  };

  return settings;
};

/**
 * Get all settings (paths and the like) from components name
 * @param {String} componentName The components name
 * @return {Object} Component settings
 */
let getAllSettingsFromModuleName = (componentName) => {
  const style = 'scss';
  let cleanedPaths = getCleanedPathName(componentName);
  let componentParts = cleanedPaths.split('/');
  let componentBaseName = _.capitalize(componentParts.pop());
  let componentPartPath = componentParts.join('/');
  let componentFullName = _.classify(_.replaceAll(componentName, '/', '_'));
  let styleSettings = configUtils.getChoiceByKey('style', style);
  let componentPath = configUtils.getChoiceByKey('path', 'module');
  let settings;
  settings = {
    style: {
      webpackPath: `./${componentBaseName}${styleSettings.suffix}`,
      path: `${componentPath.path}/${componentBaseName}/`,
      fileName: `${componentBaseName}${styleSettings.suffix}`,
      className: 'main',
      suffix: styleSettings.suffix
    },
    component: {
      webpackPath: `components${componentBaseName}/${componentBaseName}.js`,
      path: `${componentPath.path}/${componentBaseName}/`,
      fileName: `${componentBaseName}.js`,
      className: `${componentBaseName}`,
      displayName: `${componentFullName}`,
      suffix: '.js'
    },
    test: {
      path: `${componentPath.path}/${componentBaseName}/`,
      fileName: `${componentBaseName}.test.js`
    }
  };

  return settings;
};


/**
 * Get all settings (paths and the like) from actions name
 * @param {String} actionName The actions name
 * @param reducerRoot
 * @returns {{style: {webpackPath: string, path: string, fileName: string, className: string, suffix: (string|*|string)}, component: {webpackPath: string, path: string, fileName: string, className: string, displayName: string, suffix: string}, test: {path: string, fileName: string}}|*}
 */
let getAllSettingsFromActionName = (actionName, reducerRoot) => {
  let cleanedPaths = getCleanedPathName(actionName);
  let actionParts = cleanedPaths.split('/');
  let actionBaseName = _.camelize(actionParts.pop());
  let actionPathParts = actionParts.join('/');
  let statePath = configUtils.getChoiceByKey('path', 'store');
  let actionPath = `${statePath.path}/${reducerRoot}/actions`;
  let testPath = `${statePath.path}/${reducerRoot}/tests`;
  let reducerPath = `${statePath.path}/${reducerRoot}/reducers`;
  let constantName = _.underscored(actionName).toUpperCase();
  let settings;
  settings = {
    action: {
      path: `${actionPath}/${actionPathParts}/`,
      fileName: `${actionBaseName}.js`,
      functionName: `${actionBaseName}`,
      constantName: `${constantName}`,
      suffix: '.js'
    },
    test: {
      path: testPath,
      fileName: `/${actionBaseName}.test.js`,
    },
    reducer: {
      path: `${reducerPath}/${actionPathParts}/`,
      fileName: `${actionBaseName}.js`,
      functionName: `${actionBaseName}`,
      constantName: `${constantName}`,
      suffix: '.js'
    },
    store: {
      reducerRoot: reducerRoot,
      createRootReducer: 'src/store/createRootReducer.js',
      constants: `${statePath.path}/${reducerRoot}/constants.js`,
      actions: `${statePath.path}/${reducerRoot}/actions.js`,
      reducers: `${statePath.path}/${reducerRoot}/reducers.js`,
      state: `${statePath.path}/${reducerRoot}/state.js`
    }
  };

  return settings;
};

/**
 * @param route
 * @param componentName
 */
let getAllSettingsFromRouteName = (route, componentName) => {
  let cleanedPaths = getCleanedPathName(componentName);
  let componentPath = configUtils.getChoiceByKey('path', 'component');
  let componentParts = cleanedPaths.split('/');
  let componentBaseName = _.capitalize(componentParts.pop());
  let componentPartPath = componentParts.join('/');
  let componentFullName = _.classify(_.replaceAll(componentName, '/', '_'));
  let routePath = configUtils.getChoiceByKey('path', 'route');
  let settings;
  settings = {
    route: {
      path: `${routePath.path}/`,
      componentPath: `${componentPath.path}/${componentPartPath}/${componentBaseName}/`,
      fileName: `${componentBaseName}Route.js`,
      className: `${componentBaseName}`,
      route: route,
      suffix: '.js'
    },
    test: {
      path: `${routePath.path}/${componentBaseName}/`,
      fileName: `${componentBaseName}.test.js`
    }
  };

  return settings;
};



/**
 * Get a cleaned path name for a given path
 * @param {String} path
 * @param {String} suffix [optional]
 * @return {String}
 */
let getCleanedPathName = (path, suffix) => {
  if (!suffix) {
    suffix = '';
  }
  // If we have filesystem separators, use them to build the full path
  let pathArray = path.split('/');
  // Build the full components name
  return pathArray.map((path) => {
      return _.camelize(_.slugify(_.humanize(path)));
    }).join('/') + _.capitalize(suffix);
};

/**
 * Get the css/less/whatever style name to use
 * @param  {String} path
 * @return {String}
 */
let getComponentStyleName = (path) => {
  let fileName = path.split('/').pop().toLowerCase();
  return _.slugify(_.humanize(fileName)) + '-component';
};

/**
 * Get a js friendly application name
 * @param  {String} appName The input application name [optional]
 * @return {String}
 */
let getAppName = (appName) => {
  // If appName is not given, use the current directory
  if (appName === undefined) {
    appName = getBaseDir();
  }
  return _.slugify(_.humanize(appName));
};

/**
 * Get the wanted destination path
 * @param  {String} name Name of the file
 * @param  {String} type The type to use (e.g. action, store, ...)
 * @param  {Suffix} suffix The suffix to use for the file (e.g. Store, Actions, ...)
 * @return {String} Final path
 */
let getDestinationPath = (name, type, suffix) => {
  let cleanedPaths = getCleanedPathName(name, suffix);
  let fsParts = cleanedPaths.split('/');
  let actionBaseName = _.capitalize(fsParts.pop());
  let partPath = fsParts.join('/');
  let fsPath = configUtils.getChoiceByKey('path', type).path;
  let parts = [fsPath];
  if (partPath.length > 0) {
    parts.push(partPath);
  }
  parts.push(actionBaseName);
  let fullPath = parts.join('/');
  return `${fullPath}.js`;
};

/**
 * Get the destinations class name
 * @param  {String} name Name of the file
 * @param  {String} type The type to use (e.g. action, store, ...)
 * @param  {Suffix} suffix The suffix to use for the file (e.g. Store, Actions, ...)
 * @return {String} The javascript class name to use
 */
let getDestinationClassName = (name, type, suffix) => {
  let fixedName = getDestinationPath(name, type, suffix);
  return _.capitalize(fixedName.split('/').pop().split('.js')[0]);
};

module.exports = {
  getBaseDir,
  getAllSettingsFromComponentName,
  getAllSettingsFromActionName,
  getAppName,
  getCleanedPathName,
  getComponentStyleName,
  getDestinationPath,
  getDestinationClassName,
  getAllSettingsFromModuleName,
  getAllSettingsFromRouteName
};
