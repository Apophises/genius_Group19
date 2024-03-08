const isValidUsername = require('./isValidUsername')

test('should return true for valid username', () => {
    expect(isValidUsername("DanLevi")).toBe(true)
})
test('should return false for invalid username', () => {
    expect(isValidUsername("Dan!Levi")).toBe(false) 
})

test('should return false for invalid username', () => {
    expect(isValidUsername("")).toBe(false) 
})
