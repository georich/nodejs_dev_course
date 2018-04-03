const utils = require('./utils');

it('should add two numbers', () => {
  let res = utils.add(33, 11);

  if (res !== 44) {
    throw new Error(`Expected 44, but got ${res}`);
  }
});

it('should square a number', () => {
  let res = utils.square(9);

  if (res !== 81) {
    throw new Error(`Expected 81, but got ${res}`);
  }
});
