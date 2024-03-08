const isPasswordValid = require('./isPasswordValid');

test('should return true for valid password', () => {
    expect(isPasswordValid("12345679abcdef")).toBe(true);
});

test('should return false for invalid password', () => {
    expect(isPasswordValid(1234567891234567890)).toBe(false);
});

test('should return false for invalid password', () => {
    expect(isPasswordValid("")).toBe(false);
});
