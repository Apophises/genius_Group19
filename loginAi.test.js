const login = require('./login');

test('Check if parameters are equal', () => { 
    expect(login('hello', 'hello', 5, 5)).toBe(true);
});


test('Check if parameters are equal', () => { 
    expect(login('hello', 'world', 10, 20)).toBe(false);
});


test('Check if parameters are equal', () => {
    expect(login('John', 'John', 25, 25)).toBe(true);
});