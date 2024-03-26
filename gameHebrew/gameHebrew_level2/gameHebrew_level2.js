const stages = [
    { img: "house.png", options: ['א', 'ב', 'ד', 'ר'], correct: 'ב' },
    { img: "tshirt.jpeg", options: ['ח', 'ל', 'ג', 'ש'], correct: 'ח' },
    { img: "vilon.jpg", options: ['ט', 'ע', 'ו', 'ק'], correct: 'ו' },
    { img: "door.jpg", options: ['ב', 'ס', 'ה', 'ד'], correct: 'ד' },
    { img: "comp.png", options: ['פ', 'ש', 'כ', 'מ'], correct: 'מ' }
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