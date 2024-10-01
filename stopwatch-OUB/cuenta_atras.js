let countdown;
let countdownInterval;
let alarmSound = new Audio('alarm.m4a'); // Asegúrate de tener un archivo de sonido 'alarm.m4a' en tu directorio.

const startStopCountdownBtn = document.getElementById('startStopCountdownBtn');
const clearCountdownBtn = document.getElementById('clearCountdownBtn');
const cuentaAtrasDisplay = document.getElementById('cuentaAtrasDisplay');
const millisecondDisplay = document.getElementById('millisecondDisplay');
const keyboard = document.getElementById('keyboard');
let inputTime = '';
let isRunning = false;

keyboard.addEventListener('click', (event) => {
    if (event.target.classList.contains('number-btn')) {
        if (inputTime.length < 6) { // Limita la entrada a HHMMSS
            inputTime = inputTime + event.target.innerText;
            updateDisplay();
        }
    }
});

startStopCountdownBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(countdownInterval);
        startStopCountdownBtn.innerHTML = 'Start';
        startStopCountdownBtn.classList.remove('btn-danger');
        startStopCountdownBtn.classList.add('btn-success');
        isRunning = false;
    } else {
        if (inputTime.length === 0) {
            alert('Por favor, ingrese un tiempo válido.');
            return;
        }

        const seconds = parseInt(inputTime.slice(-2)) || 0;
        const minutes = parseInt(inputTime.slice(-4, -2)) || 0;
        const hours = parseInt(inputTime.slice(0, -4)) || 0;

        countdown = (hours * 3600 + minutes * 60 + seconds) * 1000;
        cuentaAtrasDisplay.innerHTML = formatTime(countdown);
        millisecondDisplay.innerHTML = '.000';
        countdownInterval = setInterval(updateCountdown, 10);
        startStopCountdownBtn.innerHTML = 'Stop';
        startStopCountdownBtn.classList.remove('btn-success');
        startStopCountdownBtn.classList.add('btn-danger');
        isRunning = true;
    }
});

clearCountdownBtn.addEventListener('click', () => {
    clearInterval(countdownInterval);
    cuentaAtrasDisplay.innerHTML = '00:00:00';
    millisecondDisplay.innerHTML = '.000';
    inputTime = '';
    alarmSound.pause();
    alarmSound.currentTime = 0;
    startStopCountdownBtn.innerHTML = 'Start';
    startStopCountdownBtn.classList.remove('btn-danger');
    startStopCountdownBtn.classList.add('btn-success');
    isRunning = false;
});

function updateCountdown() {
    countdown -= 10;

    if (countdown < 0) {
        clearInterval(countdownInterval);
        cuentaAtrasDisplay.innerHTML = '00:00:00';
        millisecondDisplay.innerHTML = '.000';
        alarmSound.play();
        setTimeout(() => {
            if (confirm('¡Tiempo terminado!')) {
                alarmSound.pause();
                alarmSound.currentTime = 0;
            }
        }, 100); // Añade un pequeño retraso para asegurar que la alarma se escuche antes de mostrar la alerta
    } else {
        cuentaAtrasDisplay.innerHTML = formatTime(countdown);
        millisecondDisplay.innerHTML = formatMilliseconds(countdown);
    }
}

function updateDisplay() {
    let paddedTime = inputTime.padStart(6, '0');
    const hours = paddedTime.slice(0, 2);
    const minutes = paddedTime.slice(2, 4);
    const seconds = paddedTime.slice(4, 6);

    cuentaAtrasDisplay.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function formatMilliseconds(ms) {
    const milliseconds = Math.floor(ms % 1000 / 10);
    return '.' + (milliseconds < 10 ? '0' : '') + milliseconds;
}
