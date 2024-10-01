let running = false;
let intervalId = null;
let elapsedTime = 0;

function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((elapsedTime % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = (elapsedTime % 1000).toString().padStart(3, '0');
    document.getElementById('timeDisplay').innerText = `${hours}:${minutes}:${seconds} ${milliseconds}`;
}

function startPause() {
    if (!running) {
        running = true;
        intervalId = setInterval(() => {
            elapsedTime += 10;
            updateDisplay();
        }, 10);
        document.getElementById('startPauseBtn').innerText = 'Pause';
    } else {
        clearInterval(intervalId);
        running = false;
        document.getElementById('startPauseBtn').innerText = running ? 'Pause' : 'Continue';
    }
}

function clearTime() {
    clearInterval(intervalId);
    elapsedTime = 0;
    updateDisplay();
    document.getElementById('startPauseBtn').innerText = 'Start';
    running = false;
}


//Unit Tests
function testInitialDisplay() {
    console.assert(document.getElementById('timeDisplay').innerText === "00:00:00 000", 'Initial display should be 00:00:00 000');
}

function testStartFunctionality() {
    startPause();
    setTimeout(() => {
        clearInterval(intervalId); // Stop the stopwatch after 100ms for testing
        console.assert(elapsedTime > 0, 'Stopwatch should start and increment time');
        console.assert(document.getElementById('startPauseBtn').innerText === 'Pause', 'Button should change to Pause after starting');
    }, 100);
}

function testClearFunctionality() {
    clearTime();
    console.assert(elapsedTime === 0, 'Elapsed time should reset to 0 after clearing');
    console.assert(document.getElementById('startPauseBtn').innerText === 'Start', 'Button should reset to Start after clearing');
}

// Run tests
testInitialDisplay();
testStartFunctionality();
testClearFunctionality();
