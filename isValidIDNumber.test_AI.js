const isValidIDNumber = require('./isValidIDNumber')

test('Valid ID', () => {
    expect(isValidIDNumber(111111111)).toBe(true)
})

test('Invalid ID', () => {
    expect(isValidIDNumber(1)).toBe(false) 
})


test('Invalid ID', () => {
    expect(isValidIDNumber('hello')).toBe(false) 
})
