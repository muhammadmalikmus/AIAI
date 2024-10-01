document.addEventListener('DOMContentLoaded', () => {
    const slide1 = document.getElementById('slide-1');
    const slide2 = document.getElementById('slide-2');
    const acceptButton = document.getElementById('accept');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const nextSlideButton = document.getElementById('next-slide');
    const prevSlideButton = document.getElementById('prev-slide');
    const timerDisplay = document.getElementById('timer-display');
    const beepSound = document.getElementById('beep-sound');
    const fireworksContainer = document.getElementById('fireworks-container');
    let timerInterval;
    let totalTimeInTenths = 0;

    acceptButton.addEventListener('click', () => {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        const tenths = parseInt(document.getElementById('tenths').value) || 0;

        totalTimeInTenths = (hours * 36000) + (minutes * 600) + (seconds * 10) + tenths;

        updateTimerDisplay();
        slide1.classList.remove('active');
        slide2.classList.add('active');
    });

    startButton.addEventListener('click', () => {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (totalTimeInTenths > 0) {
                totalTimeInTenths--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                beepSound.play();
                displayFireworks();
            }
        }, 100);
    });

    stopButton.addEventListener('click', () => {
        if (timerInterval) clearInterval(timerInterval);
    });

    nextSlideButton.addEventListener('click', () => {
        slide1.classList.remove('active');
        slide2.classList.add('active');
    });

    prevSlideButton.addEventListener('click', () => {
        slide2.classList.remove('active');
        slide1.classList.add('active');
    });

    function updateTimerDisplay() {
        const hours = String(Math.floor(totalTimeInTenths / 36000)).padStart(2, '0');
        const minutes = String(Math.floor((totalTimeInTenths % 36000) / 600)).padStart(2, '0');
        const seconds = String(Math.floor((totalTimeInTenths % 600) / 10)).padStart(2, '0');
        const tenths = String(totalTimeInTenths % 10);
        timerDisplay.textContent = `${hours}:${minutes}:${seconds}.${tenths}`;
    }

    function displayFireworks() {
        fireworksContainer.style.display = 'block';
        for (let i = 0; i < 50; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.top = `${Math.random() * 100}%`;
            firework.style.left = `${Math.random() * 100}%`;
            fireworksContainer.appendChild(firework);
            setTimeout(() => {
                firework.remove();
                if (i === 49) {
                    fireworksContainer.style.display = 'none';
                }
            }, 1000);
        }
    }
});

