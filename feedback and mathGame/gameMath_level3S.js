const stages = [
    { equation: '3 + ___ = 5', options: ['2', '3', '4', '5'], correct: '2' },
    { equation: '1 + ___ = 7', options: ['2', '7', '6', '5'], correct: '6' },
    { equation: '10 - 7 = ___', options: ['2', '3', '5', '8'], correct: '3' },
    { equation: '8 - ___ = 1', options: ['2', '5', '6', '7'], correct: '7' },
    { equation: '4 + 6 = 5 + ___', options: ['1', '2', '5', '4'], correct: '5' }
];

let currentStage = 0;

function loadStage(stageIndex) {
    const stage = stages[stageIndex];
    document.getElementById('equation').textContent = stage.equation;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; // Clear previous options
    stage.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option, stage.correct);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption, correctOption) {
    if (selectedOption === correctOption) {
        alert('נכון!');
        currentStage++;
        if (currentStage < stages.length) {
            loadStage(currentStage);
        } else {
            alert('כל הכבוד! סיימת את המשחק.');
            currentStage = 0; // Restart game
            loadStage(currentStage);
            window.location.href = "feedbackPupil.html"
        }
    } else {
        alert('נסה שוב!');
    }
}

window.onload = () => loadStage(currentStage);