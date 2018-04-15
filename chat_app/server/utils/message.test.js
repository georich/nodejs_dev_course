const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'George';
    const text = 'Hello there!';
    const result = generateMessage(from, text);

    expect(result).toMatchObject({ from, text });
    expect(typeof result.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'George';
    const latitude = 54.039;
    const longitude = 29.023;
    const result = generateLocationMessage(from, latitude, longitude);

    expect(result).toMatchObject({ from, url: 'https://www.google.com/maps?q=54.039,29.023' });
    expect(typeof result.createdAt).toBe('number');
  });
});
