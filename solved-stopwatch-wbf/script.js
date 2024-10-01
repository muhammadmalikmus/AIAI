let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
let countdownInterval, countdownTime, countdownRunning = false;

// Elements
const timeDisplay = document.getElementById('time-display');
const startStopButton = document.getElementById('start-stop-button');
const clearButton = document.getElementById('clear-button');

const countdownInput = document.getElementById('countdown-input');
const countdownDisplay = document.getElementById('countdown-display');
const countdownStartStopButton = document.getElementById('countdown-start-stop-button');
const countdownClearButton = document.getElementById('countdown-clear-button');

// Event Listeners
startStopButton.addEventListener('click', toggleTimer);
clearButton.addEventListener('click', resetTimer);

countdownStartStopButton.addEventListener('click', toggleCountdown);
countdownClearButton.addEventListener('click', resetCountdown);

// Timer Functions
function toggleTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopButton.textContent = 'Start';
    } else {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTimer, 10);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);
    
    timeDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
}

function resetTimer() {
    clearInterval(timerInterval);
    difference = 0;
    timeDisplay.textContent = '00:00:00:000';
    startStopButton.textContent = 'Start';
    isRunning = false;
}

// Countdown Functions
function toggleCountdown() {
    if (countdownRunning) {
        clearInterval(countdownInterval);
        countdownStartStopButton.textContent = 'Start';
    } else {
        const inputTime = countdownInput.value.split(':').map(Number);
        countdownTime = inputTime[0] * 3600000 + inputTime[1] * 60000 + inputTime[2] * 1000 + inputTime[3];
        countdownInterval = setInterval(updateCountdown, 10);
        countdownStartStopButton.textContent = 'Stop';
    }
    countdownRunning = !countdownRunning;
}

function updateCountdown() {
    countdownTime -= 10;
    if (countdownTime <= 0) {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = '00:00:00:000';
        countdownStartStopButton.textContent = 'Start';
        countdownRunning = false;
        return;
    }

    const hours = Math.floor((countdownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countdownTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdownTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((countdownTime % 1000) / 10);
    
    countdownDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
}

function resetCountdown() {
    clearInterval(countdownInterval);
    countdownDisplay.textContent = '00:00:00:000';
    countdownStartStopButton.textContent = 'Start';
    countdownRunning = false;
}

// Utility Functions
function formatTime(unit) {
    return unit < 10 ? '0' + unit : unit;
}
