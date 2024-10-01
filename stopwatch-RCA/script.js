// DOM Elements
const mainDiv = document.getElementById('main');
const stopwatchDiv = document.getElementById('stopwatch');
const countdownDiv = document.getElementById('countdown');
const stopwatchButton = document.getElementById('stopwatch-button');
const countdownButton = document.getElementById('countdown-button');
const backButton = document.getElementById('back-button');
const backButtonCountdown = document.getElementById('back-button-countdown');

const stopwatchTimer = document.getElementById('stopwatch-timer');
const stopwatchStartButton = document.getElementById('stopwatch-start');
const stopwatchClearButton = document.getElementById('stopwatch-clear');

const countdownTimer = document.getElementById('countdown-timer');
const numberButtons = document.querySelectorAll('.number-button');
const countdownSetButton = document.getElementById('countdown-set');
const countdownClearButton = document.getElementById('countdown-clear');

let stopwatchInterval;
let countdownInterval;
let stopwatchRunning = false;
let countdownRunning = false;
let stopwatchTime = 0;
let countdownTime = 0;

// Utility function to format time
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} <small>${String(milliseconds).padStart(3, '0')}</small>`;
}

// Stopwatch
stopwatchButton.addEventListener('click', () => {
    mainDiv.classList.add('hidden');
    stopwatchDiv.classList.remove('hidden');
});

backButton.addEventListener('click', () => {
    stopwatchDiv.classList.add('hidden');
    mainDiv.classList.remove('hidden');
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchStartButton.textContent = 'Start';
    stopwatchStartButton.classList.remove('blue');
    stopwatchStartButton.classList.add('green');
    stopwatchTime = 0;
    stopwatchTimer.innerHTML = formatTime(stopwatchTime);
});

stopwatchStartButton.addEventListener('click', () => {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(() => {
            stopwatchTime += 10;
            stopwatchTimer.innerHTML = formatTime(stopwatchTime);
        }, 10);
        stopwatchRunning = true;
        stopwatchStartButton.textContent = 'Pause';
        stopwatchStartButton.classList.remove('green');
        stopwatchStartButton.classList.add('blue');
    } else {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        stopwatchStartButton.textContent = 'Continue';
    }
});

stopwatchClearButton.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchStartButton.textContent = 'Start';
    stopwatchStartButton.classList.remove('blue');
    stopwatchStartButton.classList.add('green');
    stopwatchTime = 0;
    stopwatchTimer.innerHTML = formatTime(stopwatchTime);
});

// Countdown
countdownButton.addEventListener('click', () => {
    mainDiv.classList.add('hidden');
    countdownDiv.classList.remove('hidden');
});

backButtonCountdown.addEventListener('click', () => {
    countdownDiv.classList.add('hidden');
    mainDiv.classList.remove('hidden');
    clearInterval(countdownInterval);
    countdownRunning = false;
    countdownSetButton.textContent = 'Set';
    countdownTime = 0;
    countdownTimer.innerHTML = formatTime(countdownTime);
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = parseInt(button.textContent, 10);
        countdownTime = countdownTime * 10 + number * 1000;
        countdownTimer.innerHTML = formatTime(countdownTime);
    });
});

countdownSetButton.addEventListener('click', () => {
    if (!countdownRunning) {
        countdownTime = Math.max(0, countdownTime);
        countdownTimer.innerHTML = formatTime(countdownTime);
        countdownSetButton.textContent = 'Start';
    } else {
        clearInterval(countdownInterval);
        countdownRunning = false;
        countdownSetButton.textContent = 'Set';
    }
});

countdownSetButton.addEventListener('click', () => {
    if (countdownSetButton.textContent === 'Start') {
        countdownRunning = true;
        countdownInterval = setInterval(() => {
            countdownTime -= 10;
            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                countdownTime = 0;
                countdownRunning = false;
                countdownSetButton.textContent = 'Set';
            }
            countdownTimer.innerHTML = formatTime(countdownTime);
        }, 10);
        countdownSetButton.textContent = 'Pause';
    }
});

countdownClearButton.addEventListener('click', () => {
    clearInterval(countdownInterval);
    countdownRunning = false;
    countdownSetButton.textContent = 'Set';
    countdownTime = 0;
    countdownTimer.innerHTML = formatTime(countdownTime);
});
