const login = require('./login');

test('should return true if the username stored in cookie works', () => { 
    expect(login('Dan', 'Dan', '123123', '123123')).toBe(true);
});

test('should return true if the username stored in cookie works', () => { 
    expect(login('Ben', 'Ben', 'aaabbb', 'cccddd')).toBe(false);
});

test('should return true if the username stored in cookie works', () => { 
    expect(login('Dan', 'Ran', '123abc', '123abc')).toBe(false);
});

test('should return true if the username stored in cookie works', () => { 
    expect(login('Dan', 'Ran', '123456', 'sheheit')).toBe(false);
});
