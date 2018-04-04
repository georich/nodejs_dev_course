const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {

  describe('#add', () => {
    it('should add two numbers', () => {
      let res = utils.add(33, 11);
    
      expect(res).toBe(44);
      expect(typeof res).toBe('number');
      // if (res !== 44) {
      //   throw new Error(`Expected 44, but got ${res}`);
      // }
    });
  });
    
  it('should async add two numbers', (done) => {
    utils.asyncAdd(4, 3, (sum) => {
      expect(sum).toBe(7);
      expect(typeof sum).toBe('number');
      done();
    });
  });
  
  it('should square a number', () => {
    let res = utils.square(9);
  
    expect(res).toBe(81);
    expect(typeof res).toBe('number');
    // if (res !== 81) {
    //   throw new Error(`Expected 81, but got ${res}`);
    // }
  });
  
  it('should async square a number', (done) => {
    utils.asyncSquare(9, (res) => {
      expect(res).toBe(81);
      expect(typeof res).toBe('number');
      done();
    });
  });
});

describe('Examples', () => {
  it('should expect some values', () => {
    // expect(12).not.toBe(11);
    // expect({name: 'george'}).not.toEqual({name: 'George'});
    // expect([2, 3, 4]).not.toContain(5);
    expect({
      name: 'George',
      age: 24,
      location: 'Nottingham'
    }).not.toMatchObject({
      age: 23
    });
  });
  
  it('should verify first and last names are set', () => {
    let res = utils.setName({
      age: 24,
      location: 'Nottingham'
    }, 'George Richards');
  
    expect(res).toMatchObject({
      firstName: 'George',
      lastName: 'Richards'
    });
    expect(typeof res).toBe('object');
  });
});
