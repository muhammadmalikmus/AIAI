document.addEventListener('DOMContentLoaded', () => {
  const stopwatchView = document.getElementById('stopwatch-view');
  const countdownView = document.getElementById('countdown-view');
  const selectStopwatch = document.getElementById('select-stopwatch');
  const selectCountdown = document.getElementById('select-countdown');
  const stopwatchDisplay = document.getElementById('stopwatch-display');
  const countdownDisplay = document.getElementById('countdown-display');
  const countdownInputs = document.getElementById('countdown-inputs');
  const countdownControls = document.getElementById('countdown-controls');
  const startStopwatch = document.getElementById('start-stopwatch');
  const clearStopwatch = document.getElementById('clear-stopwatch');
  const startCountdown = document.getElementById('start-countdown');
  const clearCountdownStart = document.getElementById('clear-countdown-start');
  const setCountdown = document.getElementById('set-countdown');
  const clearCountdown = document.getElementById('clear-countdown');

  let stopwatchInterval;
  let countdownInterval;
  let stopwatchTime = 0;
  let countdownTime = 0;
  let countdownSetTime = 0;

  // Switch between views
  selectStopwatch.addEventListener('click', () => {
      stopwatchView.classList.remove('hidden');
      countdownView.classList.add('hidden');
  });

  selectCountdown.addEventListener('click', () => {
      countdownView.classList.remove('hidden');
      stopwatchView.classList.add('hidden');
  });

  // Stopwatch functionality
  startStopwatch.addEventListener('click', () => {
      if (stopwatchInterval) {
          clearInterval(stopwatchInterval);
          stopwatchInterval = null;
          startStopwatch.textContent = 'Start';
      } else {
          stopwatchInterval = setInterval(() => {
              stopwatchTime += 10;
              updateDisplay(stopwatchDisplay, stopwatchTime);
          }, 10);
          startStopwatch.textContent = 'Stop';
      }
  });

  clearStopwatch.addEventListener('click', () => {
      clearInterval(stopwatchInterval);
      stopwatchInterval = null;
      stopwatchTime = 0;
      updateDisplay(stopwatchDisplay, stopwatchTime);
      startStopwatch.textContent = 'Start';
  });

  // Countdown functionality
  countdownInputs.addEventListener('click', (e) => {
      if (e.target.classList.contains('countdown-digit')) {
          const digit = e.target.getAttribute('data-digit');
          countdownDisplay.textContent = countdownDisplay.textContent.slice(1) + digit;
      }
  });

  setCountdown.addEventListener('click', () => {
      countdownSetTime = parseDisplay(countdownDisplay.textContent);
      countdownTime = countdownSetTime;
      countdownInputs.classList.add('hidden');
      countdownControls.classList.remove('hidden');
  });

  startCountdown.addEventListener('click', () => {
      if (countdownInterval) {
          clearInterval(countdownInterval);
          countdownInterval = null;
          startCountdown.textContent = 'Start';
      } else {
          countdownInterval = setInterval(() => {
              if (countdownTime > 0) {
                  countdownTime -= 10;
                  updateDisplay(countdownDisplay, countdownTime);
              } else {
                  clearInterval(countdownInterval);
                  alert('Time is up!');
                  startCountdown.textContent = 'Start';
                  countdownDisplay.style.backgroundColor = 'red';
              }
          }, 10);
          startCountdown.textContent = 'Stop';
      }
  });

  clearCountdownStart.addEventListener('click', () => {
      clearInterval(countdownInterval);
      countdownInterval = null;
      countdownTime = countdownSetTime;
      updateDisplay(countdownDisplay, countdownTime);
      startCountdown.textContent = 'Start';
  });

  clearCountdown.addEventListener('click', () => {
      countdownDisplay.textContent = '00:00:00.000';
  });

  function updateDisplay(element, time) {
      let milliseconds = time % 1000;
      let seconds = Math.floor(time / 1000) % 60;
      let minutes = Math.floor(time / 60000) % 60;
      let hours = Math.floor(time / 3600000);
      element.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
  }

  function parseDisplay(display) {
      const parts = display.split(/[:.]/);
      const hours = parseInt(parts[0], 10) * 3600000;
      const minutes = parseInt(parts[1], 10) * 60000;
      const seconds = parseInt(parts[2], 10) * 1000;
      const milliseconds = parseInt(parts[3], 10);
      return hours + minutes + seconds + milliseconds;
  }

  function pad(number, digits = 2) {
      return number.toString().padStart(digits, '0');
  }
});
