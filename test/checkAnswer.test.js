const checkAnswer = require('./checkAnswer');

// בדיקת פונקציית checkAnswer
/*test('should advance to the next stage on correct answer', () => {
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
});*/

const stages = [
    { img: "balls.jpg", options: ['1', '2', '3', '5'], correct: '5' },
    { img: "books.jpg", options: ['8', '7', '2', '6'], correct: '8' },
    { img: "dogs.jpg", options: ['4', '5', '6', '3'], correct: '4' },
    { img: "dwarves.jpg", options: ['4', '6', '7', '8'], correct: '7' },
    { img: "spinning_wheels.jpg", options: ['4', '3', '2', '1'], correct: '3' }
];

// תוכניות הבדיקה
test('should move to the next stage if the answer is correct', () => {
    currentStage = 0;
    const selectedOption = '5';
    const correctOption = '5';
    checkAnswer(selectedOption, correctOption);
    expect(currentStage).toBe(1);
});

test('should restart the game if all stages are completed', () => {
    currentStage = stages.length - 1;
    const selectedOption = '3';
    const correctOption = '3';
    window.location.href = jest.fn(); // מסירים את הפונקציה לפונקציית המקור לצורך בדיקת ההתנהלות של הקוד
    checkAnswer(selectedOption, correctOption);
    expect(currentStage).toBe(0);
    expect(window.location.href).toHaveBeenCalledWith('feedbackParent.html');
});

test('should show alert message if the answer is incorrect', () => {
    window.alert = jest.fn(); // מסירים את הפונקציה לפונקציית המקור לצורך בדיקת ההתנהלות של הקוד
    const selectedOption = '2';
    const correctOption = '3';
    checkAnswer(selectedOption, correctOption);
    expect(window.alert).toHaveBeenCalledWith('נסה שוב!');
});