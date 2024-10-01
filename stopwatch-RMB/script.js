// Internationalization setup
const i18n = {
    es: {
        "home-title": "Elige una opción",
        "stopwatch-text": "Cronómetro",
        "countdown-text": "Cuenta Atrás",
        "stopwatch-title": "Cronómetro",
        "stopwatch-start": "Iniciar",
        "stopwatch-pause": "Pausar",
        "stopwatch-reset": "Resetear",
        "stopwatch-back": "Volver",
        "countdown-title": "Cuenta Atrás",
        "hours-label": "Horas:",
        "minutes-label": "Minutos:",
        "seconds-label": "Segundos:",
        "countdown-set": "Confirmar",
        "countdown-start": "Iniciar",
        "countdown-pause": "Pausar",
        "countdown-reset": "Reconfigurar",
        "countdown-back": "Volver"
    },
    en: {
        "home-title": "Choose an option",
        "stopwatch-text": "Stopwatch",
        "countdown-text": "Countdown",
        "stopwatch-title": "Stopwatch",
        "stopwatch-start": "Start",
        "stopwatch-pause": "Pause",
        "stopwatch-reset": "Reset",
        "stopwatch-back": "Back",
        "countdown-title": "Countdown",
        "hours-label": "Hours:",
        "minutes-label": "Minutes:",
        "seconds-label": "Seconds:",
        "countdown-set": "Set",
        "countdown-start": "Start",
        "countdown-pause": "Pause",
        "countdown-reset": "Reconfigure",
        "countdown-back": "Back"
    },
    pt: {
        "home-title": "Escolha uma opção",
        "stopwatch-text": "Cronômetro",
        "countdown-text": "Contagem Regressiva",
        "stopwatch-title": "Cronômetro",
        "stopwatch-start": "Iniciar",
        "stopwatch-pause": "Pausar",
        "stopwatch-reset": "Reiniciar",
        "stopwatch-back": "Voltar",
        "countdown-title": "Contagem Regressiva",
        "hours-label": "Horas:",
        "minutes-label": "Minutos:",
        "seconds-label": "Segundos:",
        "countdown-set": "Confirmar",
        "countdown-start": "Iniciar",
        "countdown-pause": "Pausar",
        "countdown-reset": "Reconfigurar",
        "countdown-back": "Voltar"
    }
};

let currentLang = 'es';

// Function to change language
function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll("[id^='lang-']").forEach(btn => {
        btn.disabled = btn.id === `lang-${lang}`;
    });
    document.querySelectorAll("[id^='home-title']").forEach(el => {
        el.textContent = i18n[lang][el.id];
    });
    document.querySelectorAll("[id$='-text'], [id$='-title'], [id$='-label'], [id$='-set'], [id$='-start'], [id$='-pause'], [id$='-reset'], [id$='-back']").forEach(el => {
        el.textContent = i18n[lang][el.id];
    });
}

// Attach language change events
document.getElementById("lang-es").addEventListener("click", () => changeLanguage('es'));
document.getElementById("lang-en").addEventListener("click", () => changeLanguage('en'));
document.getElementById("lang-pt").addEventListener("click", () => changeLanguage('pt'));

// Initial language setup
changeLanguage(currentLang);

// Navigation between home, stopwatch, and countdown sections
const homeSection = document.getElementById("home");
const stopwatchSection = document.getElementById("stopwatch");
const countdownSection = document.getElementById("countdown");

document.getElementById("stopwatch-btn").addEventListener("click", () => {
    homeSection.classList.add("is-hidden");
    stopwatchSection.classList.remove("is-hidden");
});

document.getElementById("countdown-btn").addEventListener("click", () => {
    homeSection.classList.add("is-hidden");
    countdownSection.classList.remove("is-hidden");
});

document.getElementById("stopwatch-back").addEventListener("click", () => {
    stopwatchSection.classList.add("is-hidden");
    homeSection.classList.remove("is-hidden");
});

document.getElementById("countdown-back").addEventListener("click", () => {
    countdownSection.classList.add("is-hidden");
    homeSection.classList.remove("is-hidden");
});

// Stopwatch functionality
let stopwatchInterval;
let stopwatchTime = 0;
let isStopwatchRunning = false;

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 12);
}

function updateStopwatchDisplay() {
    document.getElementById("stopwatch-display").textContent = formatTime(stopwatchTime);
}

document.getElementById("stopwatch-start-pause").addEventListener("click", () => {
    if (isStopwatchRunning) {
        clearInterval(stopwatchInterval);
        document.getElementById("stopwatch-start-pause").textContent = i18n[currentLang]["stopwatch-start"];
    } else {
        stopwatchInterval = setInterval(() => {
            stopwatchTime += 10;
            updateStopwatchDisplay();
        }, 10);
        document.getElementById("stopwatch-start-pause").textContent = i18n[currentLang]["stopwatch-pause"];
    }
    isStopwatchRunning = !isStopwatchRunning;
});

document.getElementById("stopwatch-reset").addEventListener("click", () => {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    updateStopwatchDisplay();
    document.getElementById("stopwatch-start-pause").textContent = i18n[currentLang]["stopwatch-start"];
    isStopwatchRunning = false;
});

// Countdown functionality
let countdownInterval;
let countdownTime = 0;
let isCountdownRunning = false;

function updateCountdownDisplay() {
    document.getElementById("countdown-display").textContent = formatTime(countdownTime);
}

document.getElementById("countdown-set").addEventListener("click", () => {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;
    countdownTime = (hours * 3600 + minutes * 60 + seconds) * 1000;
    updateCountdownDisplay();
    document.getElementById("countdown-config").classList.add("is-hidden");
    document.getElementById("countdown-display").classList.remove("is-hidden");
    document.getElementById("countdown-controls").classList.remove("is-hidden");
});

document.getElementById("countdown-start-pause").addEventListener("click", () => {
    if (isCountdownRunning) {
        clearInterval(countdownInterval);
        document.getElementById("countdown-start-pause").textContent = i18n[currentLang]["countdown-start"];
    } else {
        countdownInterval = setInterval(() => {
            countdownTime -= 10;
            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                countdownTime = 0;
            }
            updateCountdownDisplay();
        }, 10);
        document.getElementById("countdown-start-pause").textContent = i18n[currentLang]["countdown-pause"];
    }
    isCountdownRunning = !isCountdownRunning;
});

document.getElementById("countdown-reset").addEventListener("click", () => {
    clearInterval(countdownInterval);
    document.getElementById("countdown-config").classList.remove("is-hidden");
    document.getElementById("countdown-display").classList.add("is-hidden");
    document.getElementById("countdown-controls").classList.add("is-hidden");
    document.getElementById("countdown-start-pause").textContent = i18n[currentLang]["countdown-start"];
    isCountdownRunning = false;
});
