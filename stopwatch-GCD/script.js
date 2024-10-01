document.addEventListener('DOMContentLoaded', () => {
    const selectFunction = document.getElementById('selectFunction');
    const stopwatch = document.getElementById('stopwatch');
    const countdown = document.getElementById('countdown');

    const btnStopwatch = document.getElementById('btnStopwatch');
    const btnCountdown = document.getElementById('btnCountdown');
    const backStopwatch = document.getElementById('backStopwatch');
    const backCountdown = document.getElementById('backCountdown');

    const stopwatchDisplay = document.getElementById('stopwatchDisplay');
    const startStopwatch = document.getElementById('startStopwatch');
    const resetStopwatch = document.getElementById('resetStopwatch');

    const countdownDisplay = document.getElementById('countdownDisplay');
    const startCountdown = document.getElementById('startCountdown');
    const resetCountdown = document.getElementById('resetCountdown');
    const numberButtons = document.querySelectorAll('.number-button');

    let stopwatchInterval;
    let countdownInterval;
    let stopwatchRunning = false;
    let countdownRunning = false;
    let countdownTime = '';

    function showPanel(panel) {
        selectFunction.style.display = 'none';
        stopwatch.style.display = 'none';
        countdown.style.display = 'none';
        panel.style.display = 'block';
    }

    function updateStopwatchDisplay(time) {
        stopwatchDisplay.textContent = new Date(time).toISOString().substr(11, 12);
    }

    function startStopwatchFunction() {
        let startTime = Date.now();
        let elapsedTime = 0;

        stopwatchInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateStopwatchDisplay(elapsedTime);
        }, 10);

        startStopwatch.textContent = 'Stop';
        stopwatchRunning = true;
    }

    function stopStopwatchFunction() {
        clearInterval(stopwatchInterval);
        startStopwatch.textContent = 'Continue';
        stopwatchRunning = false;
    }

    function resetStopwatchFunction() {
        clearInterval(stopwatchInterval);
        updateStopwatchDisplay(0);
        startStopwatch.textContent = 'Start';
        stopwatchRunning = false;
    }

    function updateCountdownDisplay() {
        let timeString = countdownTime.padStart(6, '0');
        countdownDisplay.textContent = `${timeString.slice(0, 2)}:${timeString.slice(2, 4)}:${timeString.slice(4)}`;
    }

    function startCountdownFunction() {
        let timeParts = countdownTime.padStart(6, '0').match(/.{2}/g).map(Number);
        let totalSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];

        countdownInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(countdownInterval);
                startCountdown.textContent = 'Start';
                countdownRunning = false;
                return;
            }

            totalSeconds--;
            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor((totalSeconds % 3600) / 60);
            let seconds = totalSeconds % 60;

            countdownTime = `${hours}`.padStart(2, '0') + `${minutes}`.padStart(2, '0') + `${seconds}`.padStart(2, '0');
            updateCountdownDisplay();
        }, 1000);

        startCountdown.textContent = 'Stop';
        countdownRunning = true;
        numberButtons.forEach(button => button.style.pointerEvents = 'none');
    }

    function stopCountdownFunction() {
        clearInterval(countdownInterval);
        startCountdown.textContent = 'Continue';
        countdownRunning = false;
    }

    function resetCountdownFunction() {
        clearInterval(countdownInterval);
        countdownTime = '';
        updateCountdownDisplay();
        startCountdown.textContent = 'Start';
        countdownRunning = false;
        numberButtons.forEach(button => button.style.pointerEvents = 'auto');
    }

    btnStopwatch.addEventListener('click', () => showPanel(stopwatch));
    btnCountdown.addEventListener('click', () => showPanel(countdown));
    backStopwatch.addEventListener('click', () => showPanel(selectFunction));
    backCountdown.addEventListener('click', () => showPanel(selectFunction));

    startStopwatch.addEventListener('click', () => {
        if (stopwatchRunning) {
            stopStopwatchFunction();
        } else {
            startStopwatchFunction();
        }
    });

    resetStopwatch.addEventListener('click', resetStopwatchFunction);

    startCountdown.addEventListener('click', () => {
        if (countdownRunning) {
            stopCountdownFunction();
        } else {
            startCountdownFunction();
        }
    });

    resetCountdown.addEventListener('click', resetCountdownFunction);

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (countdownTime.length < 6) {
                countdownTime += button.textContent;
                updateCountdownDisplay();
            }
        });
    });
});
