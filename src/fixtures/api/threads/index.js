const fakeDatabase = require('./../fixture.json');

export const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const mockDataFetch = () => {
  return delay(500).then(() => {
    return fakeDatabase.data
  })
};
