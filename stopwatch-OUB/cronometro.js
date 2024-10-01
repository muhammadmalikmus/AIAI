let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;

const startStopBtn = document.getElementById('startStopBtn');
const clearBtn = document.getElementById('clearBtn');
const timeDisplay = document.getElementById('timeDisplay');
const millisecondDisplay = document.getElementById('millisecondDisplay');

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 10);
        startStopBtn.innerHTML = 'Stop';
        startStopBtn.classList.remove('btn-success');
        startStopBtn.classList.add('btn-danger');
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = 'Start';
        startStopBtn.classList.remove('btn-danger');
        startStopBtn.classList.add('btn-success');
        running = false;
    }
});

clearBtn.addEventListener('click', () => {
    clearInterval(tInterval);
    running = false;
    timeDisplay.innerHTML = '00:00:00';
    millisecondDisplay.innerHTML = '.000';
    startStopBtn.innerHTML = 'Start';
    startStopBtn.classList.remove('btn-danger');
    startStopBtn.classList.add('btn-success');
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);
    
    timeDisplay.innerHTML = (hours < 10 ? '0' : '') + hours + ':' + 
                            (minutes < 10 ? '0' : '') + minutes + ':' + 
                            (seconds < 10 ? '0' : '') + seconds;
    millisecondDisplay.innerHTML = '.' + (milliseconds < 10 ? '0' : '') + milliseconds;
}
