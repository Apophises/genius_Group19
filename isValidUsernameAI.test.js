test('should return true for valid username with numbers', () => {
    expect(isValidUsername("John123")).toBe(true)
})
test('should return false for invalid username with special characters', () => {
    expect(isValidUsername("John@Doe")).toBe(false)
})
test('should return true for valid username with maximum length', () => {
    expect(isValidUsername("ThisIsALongUsername12345")).toBe(true) 
})