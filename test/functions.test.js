// ייבוא הפונקציות שיש לבדוק
const isPasswordValid = require('./isPasswordValid');
const isValidIDNumber = require('./isValidIDNumber');
const isValidUsername = require('./isValidUsername');
const login = require('./login');
const checkAnswer = require('./checkAnswer');
const isValidInput = require('./isValidInput');
/*const playSound = require('./playSound');*/

/*require('./functions')*/

// בדיקת תקינות סיסמה
test('should return true for valid password', () => {
    expect(isPasswordValid("12345679abcdef")).toBe(true);
});

test('should return false for invalid password', () => {
    expect(isPasswordValid(1234567891234567890)).toBe(false);
});

test('should return false for invalid password', () => {
    expect(isPasswordValid("")).toBe(false);
});

// בדיקת תקינות מספר תעודת זהות
test('should return true for valid ID number', () => {
    expect(isValidIDNumber(123456789)).toBe(true);
});

test('should return false for invalid ID number', () => {
    expect(isValidIDNumber(12345678)).toBe(false); // digitless ID 
});

test('should return false for invalid ID number', () => {
    expect(isValidIDNumber('123aa6789')).toBe(false); // ID with non-numerical characters
});

// בדיקת תקינות שם משתמש
test('should return true for valid username', () => {
    expect(isValidUsername("DanLevi")).toBe(true);
});

test('should return false for invalid username', () => {
    expect(isValidUsername("Dan!Levi")).toBe(false);
});

test('should return false for invalid username', () => {
    expect(isValidUsername("")).toBe(false);
});

// בדיקת התחברות
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

// בדיקת פונקציית checkAnswer
test('should advance to the next stage on correct answer', () => {
    const stages = [{ correct: 'a' }, { correct: 'b' }];
    let currentStage = 0;

    checkAnswer('a', 'a');
    expect(alert).toHaveBeenCalledWith("נכון! מעבר לשלב הבא.");
    expect(currentStage).toBe(1);
});

test('should show congrats message and redirect on completing all stages', () => {
    const stages = [{ correct: 'a' }, { correct: 'b' }];
    let currentStage = 0;

    currentStage = stages.length - 1; // Set to last stage
    checkAnswer('c', 'c');
    expect(alert).toHaveBeenCalledWith("כל הכבוד! סיימת את המשחק.");
    expect(window.location.href).toBe("feedbackPupil.html");
    expect(currentStage).toBe(0);
});

test('should alert to try again on wrong answer', () => {
    checkAnswer('a', 'b');
    expect(alert).toHaveBeenCalledWith("לא נכון, נסה שוב.");
});

// בדיקת פונקציית playSound
/*test('should play the sound with the given source', () => {
    const mockElement = {
        src: '',
        play: jest.fn()
    };
    jest.spyOn(global.document, 'getElementById').mockReturnValue(mockElement);

    const soundSrc = 'testSound.ogg';
    playSound(soundSrc);
    expect(mockElement.src).toBe(soundSrc);
    expect(mockElement.play).toHaveBeenCalled();
});*/



/*test('should display an alert if feedback is empty', () => {
    feedbackInput.value = '';
    window.alert = jest.fn();
    feedbackForm({ preventDefault: jest.fn() });
    expect(window.alert).toHaveBeenCalledWith('המשוב צריך להכיל בין תו אחת ל-500 תווים לא כולל רווחים.');
});

test('should display an alert if feedback exceeds 500 characters', () => {
    feedbackInput.value = 'a'.repeat(501);
    window.alert = jest.fn();
    feedbackForm({ preventDefault: jest.fn() });
    expect(window.alert).toHaveBeenCalledWith('המשוב צריך להכיל בין תו אחת ל-500 תווים לא כולל רווחים.');
});*/

test('should return false if feedback is empty', () => {
    const feedback = '';
    expect(isValidInput(feedback)).toBe(false);
});

test('should return false if feedback exceeds 500 characters', () => {
    const feedback = 'a'.repeat(501);
    expect(isValidInput(feedback)).toBe(false);
});

test('should return true if feedback length is between 1 and 500 characters', () => {
    const feedback = 'a'.repeat(300);
    expect(isValidInput(feedback)).toBe(true);
});