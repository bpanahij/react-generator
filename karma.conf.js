import {argv} from 'yargs'
import config from './config'
import webpackConfig from './webpack.config'
import _debug from 'debug'

const debug = _debug('app:karma');
debug('Create configuration.');

const karmaConfig = {
  basePath: './',
  files: [
    {
      pattern: `./src/test-bundler.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha', 'intl-shim'],
  reporters: ['mocha'],
  preprocessors: {
    [`src/test-bundler.js`]: ['webpack']
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'cheap-module-source-map',
    resolve: {
      alias: {
        sinon: 'sinon/pkg/sinon.js'
      }
    },
    plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    },
  },
  webpackMiddleware: {
    noInfo: true
  },
};

if (config.globals.__COVERAGE__) {
  karmaConfig.reporters.push('coverage');
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    include: new RegExp(config.dir_client),
    loader: 'isparta',
    exclude: /node_modules/
  }]
}

// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig);
