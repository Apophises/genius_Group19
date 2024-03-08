test('should return false for password with special characters', () => {
    expect(isPasswordValid("password!")).toBe(false);});
  
  test('should return false for password below minimum length', () => {
    expect(isPasswordValid("abc")).toBe(false);
  );
  test('should return false for password without uppercase letter (optional)', () => {
    expect(isPasswordValid("alllowercase")).toBe(false);
  );
  