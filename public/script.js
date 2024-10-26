let words = []; // the words came from AI, I couldn't find a dataset of words to use
const wordInput = document.getElementById('word-input');
const startButton = document.getElementById('start-button');
const timerDisplay = document.getElementById('timer');
const results = document.getElementById('results');
const textPassage = document.getElementById('text-passage');

let startTime;
let timeLeft = 60;
let timerInterval;
let correctWords = 0;
let currentWordIndex = 0;

fetch('word.txt')
    .then(response => response.text())
    .then(data => {
        words = data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        shuffleArray(words);
    });

startButton.addEventListener('click', () => {
    wordInput.value = '';
    wordInput.disabled = false;
    wordInput.focus();
    startTime = new Date().getTime();
    correctWords = 0;
    currentWordIndex = 0;
    timeLeft = 60;
    timerDisplay.innerText = `Time: ${timeLeft}s`;
    results.innerHTML = '';
    startTimer();
    displayNextWord();
});

wordInput.addEventListener('input', () => {
    const typedWord = wordInput.value.trim();
    if (typedWord === words[currentWordIndex]) {
        correctWords++;
        currentWordIndex++;
        wordInput.value = '';
        if (timeLeft > 0) {
            displayNextWord();
        }
    }
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            wordInput.disabled = true;
            calculateResults();
        }
    }, 1000);
}

function displayNextWord() {
    if (currentWordIndex < words.length) {
        textPassage.innerText = words[currentWordIndex];
    } else {
        wordInput.disabled = true;
        clearInterval(timerInterval);
        calculateResults();
    }
}

function calculateResults() {
    const timeTaken = (60 - timeLeft);
    const speed = (correctWords / timeTaken) * 60;

    results.innerHTML = `Speed: ${speed.toFixed(2)} WPM`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});