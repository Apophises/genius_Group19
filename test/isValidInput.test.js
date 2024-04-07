const feedback = require('./isValidInput');


test('should display an alert if feedback is empty', () => {
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
});