document.addEventListener('DOMContentLoaded', function () {
    const initialScreen = document.getElementById('initial-screen');
    const stopwatchScreen = document.getElementById('stopwatch');
    const countdownScreen = document.getElementById('countdown');

    // Event listeners for showing/hiding screens
    document.getElementById('stopwatch-button').addEventListener('click', () => {
        initialScreen.classList.add('d-none');
        stopwatchScreen.classList.remove('d-none');
    });

    document.getElementById('countdown-button').addEventListener('click', () => {
        initialScreen.classList.add('d-none');
        countdownScreen.classList.remove('d-none');
    });

    document.getElementById('back-button-stopwatch').addEventListener('click', () => {
        stopwatchScreen.classList.add('d-none');
        initialScreen.classList.remove('d-none');
    });

    document.getElementById('back-button-countdown').addEventListener('click', () => {
        countdownScreen.classList.add('d-none');
        initialScreen.classList.remove('d-none');
    });

    // Stopwatch functionality
    let stopwatchInterval;
    let stopwatchTime = 0;

    document.getElementById('start-stopwatch').addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = setInterval(() => {
            stopwatchTime += 10; // increment by 10 milliseconds
            document.getElementById('stopwatch-display').textContent = new Date(stopwatchTime).toISOString().substr(11, 12);
        }, 10);
    });

    document.getElementById('stop-stopwatch').addEventListener('click', () => {
        clearInterval(stopwatchInterval);
    });

    document.getElementById('reset-stopwatch').addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchTime = 0;
        document.getElementById('stopwatch-display').textContent = '00:00:00.000';
    });

    // Countdown functionality
    let countdownInterval;
    let countdownTime = 0;

    const countdownDisplay = document.getElementById('countdown-display');
    const countdownButtons = document.getElementById('countdown-buttons');

    // Create number buttons for countdown
    for (let i = 0; i <= 9; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.add('btn', 'btn-outline-primary');
        button.addEventListener('click', () => {
            countdownTime = countdownTime * 10 + i * 1000;
            countdownDisplay.textContent = new Date(countdownTime).toISOString().substr(14, 9);
        });
        countdownButtons.appendChild(button);
    }

    document.getElementById('start-countdown').addEventListener('click', () => {
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            if (countdownTime > 0) {
                countdownTime -= 10; // decrement by 10 milliseconds
                countdownDisplay.textContent = new Date(countdownTime).toISOString().substr(14, 9);
            } else {
                clearInterval(countdownInterval);
                alert('Time is up!');
            }
        }, 10);
    });

    document.getElementById('stop-countdown').addEventListener('click', () => {
        clearInterval(countdownInterval);
    });

    document.getElementById('reset-countdown').addEventListener('click', () => {
        clearInterval(countdownInterval);
        countdownTime = 0;
        countdownDisplay.textContent = '00:00.000';
    });

    // Fullscreen functionality
    const fullscreenButton = document.createElement('button');
    fullscreenButton.textContent = 'Fullscreen';
    fullscreenButton.classList.add('btn', 'btn-info', 'mt-3');
    fullscreenButton.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
    document.body.appendChild(fullscreenButton);

    // Bookmark functionality
    const bookmarkButton = document.createElement('button');
    bookmarkButton.textContent = 'Bookmark';
    bookmarkButton.classList.add('btn', 'btn-info', 'mt-3');
    bookmarkButton.addEventListener('click', () => {
        const url = window.location.href;
        const title = document.title;
        if (window.sidebar && window.sidebar.addPanel) {
            window.sidebar.addPanel(title, url, '');
        } else if (window.external && ('AddFavorite' in window.external)) {
            window.external.AddFavorite(url, title);
        } else if (window.opera && window.print) {
            this.title = title;
            return true;
        } else {
            alert('Press Ctrl+D to bookmark this page.');
        }
    });
    document.body.appendChild(bookmarkButton);
});
