const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(123)).toBe(false);
    expect(isRealString(4.0)).toBe(false);
    expect(isRealString([1, 2, 3])).toBe(false);
    expect(isRealString({ name: 'George', age: 24 })).toBe(false);
  });

  it('should reject string with only spaces', () => {
    expect(isRealString('    ')).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    expect(isRealString('test string')).toBe(true);
    expect(isRealString('    test string     ')).toBe(true);
  });
});
