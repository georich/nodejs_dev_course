const {Users} = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'George',
      room: 'Test Room'
    }, {
      id: '2',
      name: 'Alice',
      room: 'Book Room'
    }, {
      id: '3',
      name: 'Bonje',
      room: 'Test Room'
    }];
  });

  describe('#addUser', () => {
    it('should add new user', () => {
      let users = new Users();
      let user = {
        id: '1234',
        name: 'George',
        room: 'Test Room'
      };
      let resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
    });
  });

  describe('#removeUser', () => {
    it('should remove a user', () => {
      let userId = '1';
      let result = users.removeUser(userId);

      expect(result.id).toBe(userId);
      expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
      let userId = '123';
      let result = users.removeUser(userId);

      expect(result).toBeFalsy();
      expect(users.users.length).toBe(3);
    });
  });

  describe('#getUser', () => {
    it('should find user', () => {
      let userId = '1';
      let result = users.getUser(userId);

      expect(result).toEqual(users.users[0]);
    });

    it('should not find user', () => {
      let userId = '123';
      let result = users.getUser(userId);

      expect(result).toBeFalsy();
    });
  })

  describe('#getUserList', () => {
    it('should return names for test room', () => {
      let userList = users.getUserList('Test Room');

      expect(userList).toEqual(['George', 'Bonje']);
    });

    it('should return names for book room', () => {
      let userList = users.getUserList('Book Room');

      expect(userList).toEqual(['Alice']);
    });
  });
});
