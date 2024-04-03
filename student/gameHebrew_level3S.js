const stages = [
    {img: "candle.jpg", correct: "נר", options: ["נר", "חלון", "נורה", "עכבר"]},
    {img: "pen.jpg", correct: "עט", options: ["מקרר", "עט", "עיפרון", "אור"]},
    {img: "chair.jpg", correct: "כיסא", options: ["כיסא", "טלפון", "כלב", "חתול"]},
    {img: "mouse.jpg", correct: "עכבר", options: ["עכבר", "חתול", "כלב", "סוס"]},
    {img: "bag.jpg", correct: "תיק", options: ["מנורה", "שקית", "וילון", "תיק"]}
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