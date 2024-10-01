# Prompts

chatGPT 4o.

# Stopwatch Webpage Instructions

Act as an web developer and designer expert. Create a webpage that has the functionality of a stopwatch.

### Context

- An example of how the functionality should be can be found at the following link: [Online Stopwatch Example](https://www.online-stopwatch.com/html5/timers/online-stopwatch0812f/vector/?v=230424170032&c=1.8)
- Use the attached image that contains the required stopwatch style.
- Use the following HTML as a starting point:
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timer and Countdown</title>
    <link rel="stylesheet" href="styles.css">
    </head>
    <body>
    <h1>Timer and Countdown</h1>
    <script src="script.js"></script>
    </body>
    </html>

## Framework and Language

- Use only HTML and JavaScript for this task.
- For CSS, use the latest version of the Tailwind library to achieve the required styles.
- Fontawesome for emojis and icons.
- The code should be responsive.

## Style

- The stopwatch container should occupy 70% of the viewport width and be centered.
- Expected webpage styles for the screen are shown in the attached image for the hours and the buttons.
- The font size of the time component should be 6rem and line height 1
- The background of the container should be white
- Use css good practices like use variables for colors and do not use id as selectors just classes.
- The font size for the buttons should be 32px
- Start button should be aligned to the left and Clear button should me aligned to the right.
- Make the components responsive using tailwind, use time font size for large viewports with 10 rem and medium 8 rem and small 2 rem. For mobile and tablet the container should be the 95% of the view port. Also setup correct the fontsize and the buttons for mobile and tablet

## Stopwatch Structure:

- Start/Pause/Continue Button: This button is used to start, pause the time measurement, and continue after pausing, respectively.
- Clear Button: This button is used to reset the stopwatch to zero.
- Display: Shows the elapsed time, typically in hours, minutes, seconds, and milliseconds.

### Features functionality

- The stopwatch should include a Display section that shows the elapsed time in the format HH:MM:SS and milliseconds should be positioned bellow in format fff. Check image attached as sample
- The Start button should appear first, followed by the Clear button.
- The initial text on the Start button should be "Start". When the user clicks this button, the stopwatch time should start running and display on the screen, starting with milliseconds then seconds, minutes, and finally hours, as time progresses.
- After clicking "Start", this button should change its functionality and text to "Pause", which pauses the time when clicked, freezing the time display on the screen.
- Clicking "Pause" should change this button's functionality and text to "Continue". Clicking "Continue" should resume the stopwatch from where it was paused.
- Clicking "Clear" should reset the stopwatch to zero, and the Pause/Continue button should revert its functionality back to "Start".

### Optimization

1. Ensure the code is optimized for efficiency, especially for reversing strings of large size, using the best algorithms available.

### Error Handling

1. Implement a 24-hour usage limit for the stopwatch. When the time limit is reached, display a modal indicating to the user that the stopwatch usage time has reached the allowed limit.

### Separation of Concerns

1. Separate the JavaScript into a separate file.
2. Add documentation to the created JS functions.
3. Create a prompt.md file with the instructions I provided, making them readable in code format and in English.
