const { Users } = require('./users');

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
      const users = new Users();
      const user = {
        id: '1234',
        name: 'George',
        room: 'Test Room'
      };
      const resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
    });
  });

  describe('#removeUser', () => {
    it('should remove a user', () => {
      const userId = '1';
      const result = users.removeUser(userId);

      expect(result.id).toBe(userId);
      expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
      const userId = '123';
      const result = users.removeUser(userId);

      expect(result).toBeFalsy();
      expect(users.users.length).toBe(3);
    });
  });

  describe('#getUser', () => {
    it('should find user', () => {
      const userId = '1';
      const result = users.getUser(userId);

      expect(result).toEqual(users.users[0]);
    });

    it('should not find user', () => {
      const userId = '123';
      const result = users.getUser(userId);

      expect(result).toBeFalsy();
    });
  })

  describe('#getUserList', () => {
    it('should return names for test room', () => {
      const userList = users.getUserList('Test Room');

      expect(userList).toEqual(['George', 'Bonje']);
    });

    it('should return names for book room', () => {
      const userList = users.getUserList('Book Room');

      expect(userList).toEqual(['Alice']);
    });
  });
});
