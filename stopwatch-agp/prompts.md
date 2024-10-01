He usado chatGPT-4o para generar el código de la aplicación.

## PROMPTS:

#PROMPT 1
I need an HTML + Javascript web application, that implements a stopwatch.

The detailed design is attached in the image that I will provide you with.
I will also send you the skeleton of the HTML file, so you extend it accordingly. Use tailwind CSS for the styling.
All the stopwatch logic must be put in a separate script.js file
The stopwatch has 2 buttons: Start and Clear:
The stopwatch must support Pause and Continue statuses.
The full functionality of the stopwatch should be covered in this end-to-end test. But pelase implement a thorough unit test suite to verify that the code works, and also make sure to apply SOLID principles in your output:
#####end-to-end test

The stopwatch is stopped
Clicking Start, initializes it.
Clicking Pause, pauses it,
Clicking Continue, resumes it
Clicking Reset, resets the stopwatch to 0, and only allows to start over again

#PROMPT 2
Improvements to implement:

- continue button should have blue background
- all elements should be 3x bigger
- the display time must be of a fixed width. So make sure it can accommodate all time variations without modifying its width until one month (in seconds)

#PROMPT 3
Remove months and days, and milliseconds should show under the seconds, not in the same level as hours, minutes and seconds

#PROMPT 4
Just change the index.html file, to change the style of the milliseconds matching this image
