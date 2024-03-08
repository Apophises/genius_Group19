

const isValidIDNumber = require('./isValidIDNumber')

test('should return true for valid ID number', () => {
    expect(isValidIDNumber(123456789)).toBe(true)
})
test('should return false for invalid ID number', () => {
    expect(isValidIDNumber(12345678)).toBe(false) // digitless ID 
})

test('should return false for invalid ID number', () => {
    expect(isValidIDNumber('123aa6789')).toBe(false) // ID with non-numerical characters
})

    