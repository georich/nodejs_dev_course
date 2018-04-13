const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'George';
    let text = 'Hello there!';
    let result = generateMessage(from, text);

    expect(result).toMatchObject({from, text});
    expect(typeof result.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'George';
    let latitude = 54.039;
    let longitude = 29.023;
    let result = generateLocationMessage(from, latitude, longitude);

    expect(result).toMatchObject({from, url: 'https://www.google.com/maps?q=54.039,29.023'});
    expect(typeof result.createdAt).toBe('number');
  });
});
