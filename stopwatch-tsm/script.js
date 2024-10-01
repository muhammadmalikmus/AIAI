document.addEventListener('DOMContentLoaded', () => {
    const mainScreen = document.getElementById('main-screen');
    const stopwatchScreen = document.getElementById('stopwatch-screen');
    const countdownScreen = document.getElementById('countdown-screen');

    document.getElementById('stopwatch-icon').addEventListener('click', () => {
        mainScreen.classList.add('hidden');
        stopwatchScreen.classList.remove('hidden');
    });

    document.getElementById('countdown-icon').addEventListener('click', () => {
        mainScreen.classList.add('hidden');
        countdownScreen.classList.remove('hidden');
    });

    document.getElementById('back-stopwatch').addEventListener('click', () => {
        stopwatchScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        resetStopwatch();
    });

    document.getElementById('back-countdown').addEventListener('click', () => {
        countdownScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        resetCountdown();
    });

    let stopwatchInterval;
    let stopwatchRunning = false;
    const stopwatchTimeDisplay = document.getElementById('stopwatch-time');
    const stopwatchMsDisplay = document.getElementById('stopwatch-ms');
    const startStopwatchButton = document.getElementById('start-stopwatch');
    const resetStopwatchButton = document.getElementById('reset-stopwatch');
    let stopwatchTime = 0;

    startStopwatchButton.addEventListener('click', () => {
        if (!stopwatchRunning) {
            startStopwatchButton.textContent = 'Pause';
            stopwatchInterval = setInterval(() => {
                stopwatchTime += 10;
                const formattedTime = formatTime(stopwatchTime);
                stopwatchTimeDisplay.textContent = formattedTime.time;
                stopwatchMsDisplay.textContent = formattedTime.ms;
            }, 10);
            stopwatchRunning = true;
        } else {
            startStopwatchButton.textContent = 'Continue';
            clearInterval(stopwatchInterval);
            stopwatchRunning = false;
        }
    });

    resetStopwatchButton.addEventListener('click', resetStopwatch);

    function resetStopwatch() {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        stopwatchTime = 0;
        stopwatchTimeDisplay.textContent = '00:00:00';
        stopwatchMsDisplay.textContent = '.000';
        startStopwatchButton.textContent = 'Start';
    }

    let countdownInterval;
    let countdownRunning = false;
    const countdownTimeDisplay = document.getElementById('countdown-time');
    const countdownMsDisplay = document.getElementById('countdown-ms');
    const startCountdownButton = document.getElementById('start-countdown');
    const resetCountdownButton = document.getElementById('reset-countdown');
    let countdownTime = 0;

    startCountdownButton.addEventListener('click', () => {
        if (!countdownRunning) {
            const hours = parseInt(document.getElementById('hours').value) || 0;
            const minutes = parseInt(document.getElementById('minutes').value) || 0;
            const seconds = parseInt(document.getElementById('seconds').value) || 0;
            countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

            if (countdownTime > 0) {
                startCountdownButton.textContent = 'Pause';
                countdownInterval = setInterval(() => {
                    if (countdownTime <= 0) {
                        clearInterval(countdownInterval);
                        alert('Time\'s up!');
                        playAlarmSound();
                        resetCountdown();
                    } else {
                        countdownTime -= 10;
                        const formattedTime = formatTime(countdownTime);
                        countdownTimeDisplay.textContent = formattedTime.time;
                        countdownMsDisplay.textContent = formattedTime.ms;
                    }
                }, 10);
                countdownRunning = true;
            }
        } else {
            startCountdownButton.textContent = 'Continue';
            clearInterval(countdownInterval);
            countdownRunning = false;
        }
    });

    resetCountdownButton.addEventListener('click', resetCountdown);

    function resetCountdown() {
        clearInterval(countdownInterval);
        countdownRunning = false;
        countdownTime = 0;
        countdownTimeDisplay.textContent = '00:00:00';
        countdownMsDisplay.textContent = '.000';
        startCountdownButton.textContent = 'Start';
        document.getElementById('hours').value = '';
        document.getElementById('minutes').value = '';
        document.getElementById('seconds').value = '';
    }

    function formatTime(milliseconds) {
        const date = new Date(milliseconds);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const ms = String(date.getUTCMilliseconds()).padStart(3, '0');
        return {
            time: `${hours}:${minutes}:${seconds}`,
            ms: `.${ms}`
        };
    }

    function playAlarmSound() {
        const audio = new Audio('alarm.mp3'); // Ruta del archivo de sonido de alarma
        audio.play();
    }
});
