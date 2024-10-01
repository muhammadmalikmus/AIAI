let startTime; // The timestamp when the stopwatch is started.
let elapsedTime = 0; // Total elapsed time in milliseconds.
let timerInterval; // Interval ID for the running stopwatch timer.

/**
 * Formats the given time in milliseconds into a string in the format HH:MM:SS.
 *
 * @param {number} time - The time in milliseconds to format.
 * @returns {string} The formatted time string in HH:MM:SS.
 */
function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Formats the given time in milliseconds into a string representing the milliseconds component.
 *
 * @param {number} time - The time in milliseconds to format.
 * @returns {string} The formatted milliseconds string.
 */
function formatMilliseconds(time) {
  return String(time % 1000).padStart(3, "0");
}

/**
 * Starts the stopwatch by recording the start time and setting up an interval
 * to update the display every 10 milliseconds.
 */
function start() {
  startTime = Date.now() - elapsedTime; // Record start time adjusted for elapsed time.
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime; // Update elapsed time.
    document.querySelector(".time").innerText = formatTime(elapsedTime); // Update display.
    document.querySelector(".milliseconds").innerText =
      formatMilliseconds(elapsedTime);
  }, 10);
}

/**
 * Pauses the stopwatch by clearing the interval that updates the display.
 */
function pause() {
  clearInterval(timerInterval); // Stop updating the display.
}

/**
 * Resets the stopwatch to zero and updates the display accordingly.
 */
function reset() {
  clearInterval(timerInterval); // Stop updating the display.
  elapsedTime = 0; // Reset elapsed time.
  document.querySelector(".time").innerText = "00:00:00"; // Reset display.
  document.querySelector(".milliseconds").innerText = "000";
}

// Event listener for the Start/Pause button.
document
  .querySelector(".start-pause-btn")
  .addEventListener("click", function () {
    if (this.innerText === "Start" || this.innerText === "Continue") {
      start(); // Start or continue the stopwatch.
      this.innerText = "Pause"; // Update button text to Pause.
      this.classList.replace("bg-green-500", "bg-yellow-500"); // Update button color to yellow.
      this.classList.replace("hover:bg-green-700", "hover:bg-yellow-700"); // Update hover color.
    } else {
      pause(); // Pause the stopwatch.
      this.innerText = "Continue"; // Update button text to Continue.
      this.classList.replace("bg-yellow-500", "bg-green-500"); // Update button color to green.
      this.classList.replace("hover:bg-yellow-700", "hover:bg-green-700"); // Update hover color.
    }
  });

// Event listener for the Clear button.
document.querySelector(".clear-btn").addEventListener("click", function () {
  reset(); // Reset the stopwatch.
  document.querySelector(".start-pause-btn").innerText = "Start"; // Reset Start/Pause button text to Start.
  document
    .querySelector(".start-pause-btn")
    .classList.replace("bg-yellow-500", "bg-green-500"); // Reset button color to green.
  document
    .querySelector(".start-pause-btn")
    .classList.replace("hover:bg-yellow-700", "hover:bg-green-700"); // Reset hover color.
});
