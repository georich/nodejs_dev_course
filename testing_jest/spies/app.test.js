jest.mock('./db.js');
const app = require('./app.js');
const db = require('./db.js');

describe('App', () => {
  db.saveUser = jest.fn((user) => {
    console.log('Saving the user', user);
  });

  it('should call the spy correctly', () => {
    let spy = jest.fn();
    spy('George', 24);
    expect(spy).toHaveBeenCalledWith('George', 24);
  });  

  it('should call saveUser with user object', () => {
    let email = 'george@example.com';
    let password = '123abc';

    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({email, password});
  });
});
