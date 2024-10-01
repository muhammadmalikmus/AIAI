// Get elements from the DOM
let startStopButton = document.getElementById('start-stop-button');
let clearButton = document.getElementById('clear-button');
let mainTimeDisplay = document.getElementById('main-time');
let millisecondsDisplay = document.getElementById('milliseconds');

// Variables to manage timer state
let startTime;
let updatedTime;
let elapsedTime = 0;
let timerId;
let running = false;

// Function to start the timer
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerId = setInterval(updateTimer, 10);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerId);
}

// Function to update the timer display
function updateTimer() {
    updatedTime = Date.now();
    elapsedTime = updatedTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000));

    // Format time components
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    milliseconds = milliseconds < 100 ? '0' + milliseconds : milliseconds;
    milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;

    // Display formatted time
    mainTimeDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
    millisecondsDisplay.innerHTML = milliseconds;
}

// Event listener for start/stop button
startStopButton.addEventListener('click', function() {
    if (!running) {
        running = true;
        startTimer();
        startStopButton.textContent = 'Pause';
        startStopButton.className = 'green-button';
    } else {
        running = false;
        stopTimer();
        startStopButton.textContent = 'Continue';
        startStopButton.className = 'blue-button';
    }
});

// Event listener for clear button
clearButton.addEventListener('click', function() {
    running = false;
    clearInterval(timerId);
    elapsedTime = 0;
    mainTimeDisplay.innerHTML = '00:00:00';
    millisecondsDisplay.innerHTML = '000';
    startStopButton.textContent = 'Start';
    startStopButton.className = 'blue-button';
});
