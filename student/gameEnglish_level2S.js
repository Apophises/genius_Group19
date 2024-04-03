const stages = [
    { img: "banana.png", options: ['b', 'd', 'c', 'a'], correct: 'b' },
    { img: "fish.png", options: ['r', 'g', 'f', 's'], correct: 'f' },
    { img: "dress.jpeg", options: ['d', 'm', 'n', 's'], correct: 'd' },
    { img: "table.jpg", options: ['t', 'o', 'k', 'd'], correct: 't' },
    { img: "phone.png", options: ['z', 'p', 'a', 'h'], correct: 'p' }
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
        }
    } else {
        alert('נסה שוב!');
    }
}

window.onload = () => loadStage(currentStage);