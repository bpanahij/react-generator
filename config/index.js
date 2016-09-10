
const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  globals: {
    'process.env'  : {
      'NODE_ENV' : JSON.stringify(ENV)
    },
    'NODE_ENV'     : ENV,
    '__DEV__'      : ENV === 'development',
    '__PROD__'     : ENV === 'production',
    '__TEST__'     : ENV === 'test',
    '__DEBUG__'    : ENV === 'development',
    '__COVERAGE__' : ENV === 'test',
    '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
  }
};