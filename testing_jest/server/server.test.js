const request = require('supertest');
// const expect = require('expect');

const app = require('./server').app;

describe('Server', () => {
  describe('GET /', () => {
    it('should return 404 response', (done) => {
      request(app)
        .get('/')
        .expect(404)
        // .expect({
        //   error: 'Page not found.'
        // })
        .expect((res) => {
          expect(res.body).toMatchObject({
            error: 'Page not found.'
          });
        })
        .end(done);
    });
  });
  
  describe('GET /users', () => {
    it('should return my user object', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body).toContainEqual({name: 'George', age: 24});
        })
        .end(done);
    });
  });  
});
