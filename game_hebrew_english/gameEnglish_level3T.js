const stages = [
    { img: "bee.png", options: ['bee', 'dog', 'cat', 'apple'], correct: 'bee' },
    { img: "cow.jpg", options: ['cow', 'big', 'fish', 'cat'], correct: 'cow' },
    { img: "cold.jpeg", options: ['cold', 'hot', 'not', 'small'], correct: 'cold' },
    { img: "pig.jpg", options: ['love', 'desk', 'pig', 'door'], correct: 'pig' },
    { img: "duck.jpeg", options: ['zebra', 'pig', 'apple', 'duck'], correct: 'duck' }
];

let currentStage = 0;

function loadStage(stageIndex) {
    const stage = stages[stageIndex];
    document.getElementById('image').src = stage.img;
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
        currentStage++;
        if (currentStage < stages.length) {
            loadStage(currentStage);
        } else {
            alert('כל הכבוד! סיימת את המשחק.');
            currentStage = 0;
            loadStage(currentStage); // Restart game
            window.location.href = "feedbackTeacher.html"
        }
    } else {
        alert('נסה שוב!');
    }
}

window.onload = () => loadStage(currentStage)