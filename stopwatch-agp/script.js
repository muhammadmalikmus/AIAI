class Stopwatch {
    constructor(timeElement, millisecondsElement) {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.intervalId = null;
        this.timeElement = timeElement;
        this.millisecondsElement = millisecondsElement;
        this.running = false;
    }

    start() {
        if (!this.running) {
            this.startTime = Date.now() - this.elapsedTime;
            this.intervalId = setInterval(() => this.update(), 10);
            this.running = true;
        }
    }

    pause() {
        if (this.running) {
            clearInterval(this.intervalId);
            this.elapsedTime = Date.now() - this.startTime;
            this.running = false;
        }
    }

    reset() {
        clearInterval(this.intervalId);
        this.startTime = 0;
        this.elapsedTime = 0;
        this.intervalId = null;
        this.running = false;
        this.updateDisplay(0);
    }

    update() {
        this.elapsedTime = Date.now() - this.startTime;
        this.updateDisplay(this.elapsedTime);
    }

    updateDisplay(time) {
        const milliseconds = time % 1000;
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / (1000 * 60)) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

        this.timeElement.textContent = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
        this.millisecondsElement.textContent = this.pad(milliseconds, 3);
    }

    pad(number, digits = 2) {
        return number.toString().padStart(digits, '0');
    }
}


// module.exports = Stopwatch; --> this is needed to run the tests using jest

document.addEventListener('DOMContentLoaded', () => {
    const timeElement = document.getElementById('time');
    const millisecondsElement = document.getElementById('milliseconds');
    const stopwatch = new Stopwatch(timeElement, millisecondsElement);

    const startPauseButton = document.getElementById('startPauseButton');
    const resetButton = document.getElementById('resetButton');

    startPauseButton.addEventListener('click', () => {
        if (stopwatch.running) {
            stopwatch.pause();
            startPauseButton.textContent = 'Continue';
            startPauseButton.className = 'button-blue px-6 py-2 rounded'; // Change to blue
        } else {
            stopwatch.start();
            startPauseButton.textContent = 'Pause';
            startPauseButton.className = 'button-green px-6 py-2 rounded'; // Change back to green
        }
    });

    resetButton.addEventListener('click', () => {
        stopwatch.reset();
        startPauseButton.textContent = 'Start';
        startPauseButton.className = 'button-green px-6 py-2 rounded'; // Change back to green
    });
});