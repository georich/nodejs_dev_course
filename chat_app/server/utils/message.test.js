const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'George';
    let text = 'Hello there!';
    let result = generateMessage(from, text);

    expect(result).toMatchObject({from, text});
    expect(typeof result.createdAt).toBe('number');
  });
});
