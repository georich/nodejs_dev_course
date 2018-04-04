// const expect = require('expect');

describe('App', () => {
  it('should call the spy correctly', () => {
    let spy = jest.fn();
    spy('George', 24);
    expect(spy).toHaveBeenCalledWith('George', 24);
  });  
});
