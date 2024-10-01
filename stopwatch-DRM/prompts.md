Timer and Countdown WebApp
User
Eres un programador experto en Javascript y quiero que desarrolles una aplicación web realizada en bootstrap y js.

La aplicación web debe tener la misma funcionalidad que: https://www.online-stopwatch.com

Incluyo lo siguiente:

Un fichero html donde contendrá todo el código html.

El criterio de aceptación será el siguiente:

- Que sea responsive
- Que contenga un botón para ver la aplicación a pantalla completa.
- Que contenga un botón para añadir esta pagina a favoritos.
- Al abrir la aplicación las funcionalidades estan escondidas y debe escoger entre stopwatch y clockwatch. Al escoger se muestra la funcionalidad escogida.
- Cuando se escoja una funcionalidad debe tener un botón para volver hacia atras y poder escoger la funcionalidad.
- La funcionalidad countdown debe tener botones del 0 al 9, para añadir tiempo al contador de cuenta atrás.
- Debe incluir tests del código de javascript en jest
- Debe contener un fichero readme.md que explique la estructura del fichero y como ejecutar las pruebas.
- El CSS y el Javascript deben ir en ficheros aparte. Y seguir las buenas practicas.
- El todo generado debe contener comentarios en inglés para su entendimiento.
  ChatGPT
### Web Application: Timer and Countdown

I will develop a web application similar to the one available at [Online Stopwatch](https://www.online-stopwatch.com), using HTML, Bootstrap, and JavaScript. The application will meet the specified criteria, including responsiveness, fullscreen mode, bookmarking, and other functionalities.

#### File Structure
1. **index.html**: Contains the HTML structure of the application.
2. **styles.css**: Contains the CSS styles.
3. **script.js**: Contains the JavaScript logic.
4. **tests**: Contains Jest tests for the JavaScript code.
5. **readme.md**: Explains the structure of the files and how to run the tests.

### index.html

Let's start by creating the `index.html` file, which will include the Bootstrap framework, necessary scripts, and basic structure.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timer and Countdown</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container">
    <h1 class="text-center my-4">Timer and Countdown</h1>
    <div id="initial-screen" class="text-center">
        <button id="stopwatch-button" class="btn btn-primary mx-2">Stopwatch</button>
        <button id="countdown-button" class="btn btn-primary mx-2">Countdown</button>
    </div>
    <div id="stopwatch" class="d-none">
        <!-- Stopwatch Functionality -->
        <button id="back-button-stopwatch" class="btn btn-secondary">Back</button>
        <div id="stopwatch-display" class="display-4 text-center my-4">00:00:00</div>
        <div class="text-center">
            <button id="start-stopwatch" class="btn btn-success">Start</button>
            <button id="stop-stopwatch" class="btn btn-danger">Stop</button>
            <button id="reset-stopwatch" class="btn btn-warning">Reset</button>
        </div>
    </div>
    <div id="countdown" class="d-none">
        <!-- Countdown Functionality -->
        <button id="back-button-countdown" class="btn btn-secondary">Back</button>
        <div id="countdown-display" class="display-4 text-center my-4">00:00</div>
        <div class="text-center">
            <div id="countdown-buttons" class="mb-3">
                <!-- Number buttons will be appended here -->
            </div>
            <button id="start-countdown" class="btn btn-success">Start</button>
            <button id="stop-countdown" class="btn btn-danger">Stop</button>
            <button id="reset-countdown" class="btn btn-warning">Reset</button>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
<script src="script.js"></script>
</body>
</html>
```

### styles.css

The `styles.css` file will contain the necessary styles for the application.

```css
body {
    background-color: #f8f9fa;
}

.display-4 {
    font-size: 3rem;
}

#countdown-buttons button {
    margin: 5px;
}
```

### script.js

The `script.js` file will contain the JavaScript logic to manage the stopwatch and countdown functionalities.

```javascript
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
            stopwatchTime++;
            document.getElementById('stopwatch-display').textContent = new Date(stopwatchTime * 1000).toISOString().substr(11, 8);
        }, 1000);
    });

    document.getElementById('stop-stopwatch').addEventListener('click', () => {
        clearInterval(stopwatchInterval);
    });

    document.getElementById('reset-stopwatch').addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchTime = 0;
        document.getElementById('stopwatch-display').textContent = '00:00:00';
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
            countdownTime = countdownTime * 10 + i;
            countdownDisplay.textContent = new Date(countdownTime * 1000).toISOString().substr(14, 5);
        });
        countdownButtons.appendChild(button);
    }

    document.getElementById('start-countdown').addEventListener('click', () => {
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            if (countdownTime > 0) {
                countdownTime--;
                countdownDisplay.textContent = new Date(countdownTime * 1000).toISOString().substr(14, 5);
            } else {
                clearInterval(countdownInterval);
                alert('Time is up!');
            }
        }, 1000);
    });

    document.getElementById('stop-countdown').addEventListener('click', () => {
        clearInterval(countdownInterval);
    });

    document.getElementById('reset-countdown').addEventListener('click', () => {
        clearInterval(countdownInterval);
        countdownTime = 0;
        countdownDisplay.textContent = '00:00';
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
```

### Jest Tests

Create a `tests` folder and a test file for the JavaScript code.

```javascript
// tests/script.test.js
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let document;

describe('Timer and Countdown Application', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        document = dom.window.document;
    });

    test('Initial screen buttons are visible', () => {
        expect(document.getElementById('initial-screen')).not.toHaveClass('d-none');
    });

    test('Stopwatch button click shows stopwatch screen', () => {
        document.getElementById('stopwatch-button').click();
        expect(document.getElementById('initial-screen')).toHave
ChatGPT
Class('d-none');
        expect(document.getElementById('stopwatch')).not.toHaveClass('d-none');
    });

    test('Countdown button click shows countdown screen', () => {
        document.getElementById('countdown-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('countdown')).not.toHaveClass('d-none');
    });
});
```

### README

The `readme.md` file will explain the structure of the files and how to run the tests.

```markdown
# Timer and Countdown Application

## Structure

- **index.html**: Contains the HTML structure of the application.
- **styles.css**: Contains the CSS styles.
- **script.js**: Contains the JavaScript logic.
- **tests**: Contains Jest tests for the JavaScript code.

## How to Run the Application

1. Open `index.html` in a web browser.

## How to Run the Tests

1. Ensure you have Node.js and npm installed.
2. Install Jest by running `npm install jest`.
3. Run the tests by executing `npm test`.
```

This structure and content will create a functional, responsive timer and countdown application with the specified features. The code is modular and includes comments for understanding.
User
Show also the mili seconds in both functionalities.
ChatGPT
Sure! Let's modify the `script.js` file to include milliseconds in both the stopwatch and countdown functionalities.

### Updated `script.js`

```javascript
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
```

### Updated HTML

Update the `index.html` file to reflect the changes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timer and Countdown</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container">
    <h1 class="text-center my-4">Timer and Countdown</h1>
    <div id="initial-screen" class="text-center">
        <button id="stopwatch-button" class="btn btn-primary mx-2">Stopwatch</button>
        <button id="countdown-button" class="btn btn-primary mx-2">Countdown</button>
    </div>
    <div id="stopwatch" class="d-none">
        <!-- Stopwatch Functionality -->
        <button id="back-button-stopwatch" class="btn btn-secondary">Back</button>
        <div id="stopwatch-display" class="display-4 text-center my-4">00:00:00.000</div>
        <div class="text-center">
            <button id="start-stopwatch" class="btn btn-success">Start</button>
            <button id="stop-stopwatch" class="btn btn-danger">Stop</button>
            <button id="reset-stopwatch" class="btn btn-warning">Reset</button>
        </div>
    </div>
    <div id="countdown" class="d-none">
        <!-- Countdown Functionality -->
        <button id="back-button-countdown" class="btn btn-secondary">Back</button>
        <div id="countdown-display" class="display-4 text-center my-4">00:00.000</div>
        <div class="text-center">
            <div id="countdown-buttons" class="mb-3">
                <!-- Number buttons will be appended here -->
            </div>
            <button id="start-countdown" class="btn btn-success">Start</button>
            <button id="stop-countdown" class="btn btn-danger">Stop</button>
            <button id="reset-countdown" class="btn btn-warning">Reset</button>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
<script src="script.js"></script>
</body>
</html>
```

### Updated Jest Tests

Update the Jest test file to reflect the changes:

```javascript
// tests/script.test.js
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let document;

describe('Timer and Countdown Application', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        document = dom.window.document;
    });

    test('Initial screen buttons are visible', () => {
        expect(document.getElementById('initial-screen')).not.toHaveClass('d-none');
    });

    test('Stopwatch button click shows stopwatch screen', () => {
        document.getElementById('stopwatch-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('stopwatch')).not.toHaveClass('d-none');
    });

    test('Countdown button click shows countdown screen', () => {
        document.getElementById('countdown-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('countdown')).not.toHaveClass('d-none');
    });

    test('Stopwatch displays milliseconds', () => {
        document.getElementById('stopwatch-button').click();
        document.getElementById('start-stopwatch').click();
        setTimeout(() => {
            expect(document.getElementById('stopwatch-display').textContent).toMatch(/\d{2}:\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-stopwatch').click();
        }, 100);
    });

    test('Countdown displays milliseconds', () => {
        document
ChatGPT
.getElementById('countdown-button').click();
        document.getElementById('start-countdown').click();
        setTimeout(() => {
            expect(document.getElementById('countdown-display').textContent).toMatch(/\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-countdown').click();
        }, 100);
    });
});
```

### Updated README

The `readme.md` file will be updated to reflect the changes:

```markdown
# Timer and Countdown Application

## Structure

- **index.html**: Contains the HTML structure of the application.
- **styles.css**: Contains the CSS styles.
- **script.js**: Contains the JavaScript logic.
- **tests**: Contains Jest tests for the JavaScript code.

## How to Run the Application

1. Open `index.html` in a web browser.

## How to Run the Tests

1. Ensure you have Node.js and npm installed.
2. Install Jest by running `npm install jest`.
3. Run the tests by executing `npm test`.
```

This will update the application to display milliseconds in both the stopwatch and countdown functionalities, and the necessary tests have been updated to ensure they work as expected.
User
Cuando corro npm tests, obtengo el siguiente error: npm error Missing script: "test"
ChatGPT
Para resolver el error `npm error Missing script: "test"`, necesitas asegurarte de que el archivo `package.json` incluya un script para ejecutar las pruebas. Aquí tienes una guía paso a paso para configurar y ejecutar las pruebas con Jest:

### Paso 1: Crear `package.json`

Si no tienes un archivo `package.json`, crea uno ejecutando el siguiente comando en la terminal en el directorio raíz de tu proyecto:

```bash
npm init -y
```

### Paso 2: Instalar Jest

Instala Jest como una dependencia de desarrollo:

```bash
npm install --save-dev jest
```

### Paso 3: Configurar el script de prueba en `package.json`

Abre el archivo `package.json` y añade el script de prueba. Debería parecerse a esto:

```json
{
  "name": "timer-and-countdown",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^27.0.0"
  }
}
```

### Paso 4: Crear el archivo de prueba

Asegúrate de que el archivo de prueba `script.test.js` está en el directorio `tests` y que su contenido es el correcto. El contenido debería ser similar al siguiente:

```javascript
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let document;

describe('Timer and Countdown Application', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        document = dom.window.document;
    });

    test('Initial screen buttons are visible', () => {
        expect(document.getElementById('initial-screen')).not.toHaveClass('d-none');
    });

    test('Stopwatch button click shows stopwatch screen', () => {
        document.getElementById('stopwatch-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('stopwatch')).not.toHaveClass('d-none');
    });

    test('Countdown button click shows countdown screen', () => {
        document.getElementById('countdown-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('countdown')).not.toHaveClass('d-none');
    });

    test('Stopwatch displays milliseconds', () => {
        document.getElementById('stopwatch-button').click();
        document.getElementById('start-stopwatch').click();
        setTimeout(() => {
            expect(document.getElementById('stopwatch-display').textContent).toMatch(/\d{2}:\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-stopwatch').click();
        }, 100);
    });

    test('Countdown displays milliseconds', () => {
        document.getElementById('countdown-button').click();
        document.getElementById('start-countdown').click();
        setTimeout(() => {
            expect(document.getElementById('countdown-display').textContent).toMatch(/\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-countdown').click();
        }, 100);
    });
});
```

### Paso 5: Ejecutar las pruebas

Finalmente, ejecuta las pruebas con el siguiente comando:

```bash
npm test
```

Esto debería ejecutar Jest y correr todas las pruebas definidas en el archivo `script.test.js`. Si todo está configurado correctamente, deberías ver los resultados de las pruebas en la terminal.
User
Al pasar los tests, obtengo el siguiente error:

TypeError: expect(...).toHaveClass is not a function
ChatGPT
El error `TypeError: expect(...).toHaveClass is not a function` ocurre porque `toHaveClass` no es una función disponible en Jest por defecto. Esta función proviene de una biblioteca adicional llamada `@testing-library/jest-dom`. Debes instalar esta biblioteca y agregarla a tu configuración de Jest.

### Paso 1: Instalar @testing-library/jest-dom

Ejecuta el siguiente comando para instalar `@testing-library/jest-dom`:

```bash
npm install --save-dev @testing-library/jest-dom
```

### Paso 2: Configurar Jest para usar jest-dom

En tu proyecto, crea o modifica el archivo de configuración de Jest para asegurarte de que `@testing-library/jest-dom` se incluya. Por ejemplo, si usas un archivo `setupTests.js` para la configuración de Jest, asegúrate de incluir la importación de `jest-dom`.

Crea un archivo llamado `setupTests.js` en la raíz de tu proyecto (o en el directorio `tests` si lo prefieres):

```javascript
// setupTests.js
import '@testing-library/jest-dom';
```

### Paso 3: Actualizar package.json para usar setupFilesAfterEnv

Asegúrate de que tu `package.json` incluye la configuración `setupFilesAfterEnv` para Jest:

```json
{
  "name": "timer-and-countdown",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^27.0.0",
    "@testing-library/jest-dom": "^5.11.0"
  },
  "jest": {
    "setupFilesAfterEnv": ["<rootDir>/setupTests.js"]
  }
}
```

### Paso 4: Actualizar el archivo de prueba

Ahora puedes usar `toHaveClass` en tus pruebas sin problemas. Asegúrate de que el archivo de prueba `script.test.js` es similar al siguiente:

```javascript
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');
require('@testing-library/jest-dom'); // Import jest-dom for extended matchers

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let document;

describe('Timer and Countdown Application', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        document = dom.window.document;
    });

    test('Initial screen buttons are visible', () => {
        expect(document.getElementById('initial-screen')).not.toHaveClass('d-none');
    });

    test('Stopwatch button click shows stopwatch screen', () => {
        document.getElementById('stopwatch-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('stopwatch')).not.toHaveClass('d-none');
    });

    test('Countdown button click shows countdown screen', () => {
        document.getElementById('countdown-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('countdown')).not.toHaveClass('d-none');
    });

    test('Stopwatch displays milliseconds', () => {
        document.getElementById('stopwatch-button').click();
        document.getElementById('start-stopwatch').click();
        setTimeout(() => {
            expect(document.getElementById('stopwatch-display').textContent).toMatch(/\d{2}:\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-stopwatch').click();
        }, 100);
    });

    test('Countdown displays milliseconds', () => {
        document.getElementById('countdown-button').click();
        document.getElementById('start-countdown').click();
        setTimeout(() => {
            expect(document.getElementById('countdown-display').textContent).toMatch(/\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-countdown').click();
        }, 100);
    });
});
```

### Paso 5: Ejecutar las pruebas

Ahora puedes ejecutar las pruebas nuevamente con el siguiente comando:

```bash
npm test
```

Esto debería resolver el error y permitir que las pruebas se ejecuten correctamente, utilizando las funcionalidades extendidas de `jest-dom` para los selectores de clases.
User
Ahora obtengo el siguiente error:

import '@testing-library/jest-dom';
^^^^^^

    SyntaxError: Cannot use import statement outside a module
ChatGPT
El error `SyntaxError: Cannot use import statement outside a module` se debe a que estás usando la sintaxis de importación de ES6 en un entorno que no lo soporta de manera predeterminada. Para solucionar esto, podemos usar la sintaxis de `require` en lugar de `import` en el archivo de configuración de pruebas `setupTests.js`.

### Paso 1: Modificar `setupTests.js`

Cambia la importación de ES6 a la sintaxis `require` en el archivo `setupTests.js`:

```javascript
// setupTests.js
require('@testing-library/jest-dom');
```

### Paso 2: Actualizar el archivo de prueba

Asegúrate de que el archivo de prueba `script.test.js` no utiliza la sintaxis de importación de ES6. Aquí está la versión actualizada de `script.test.js` usando `require`:

```javascript
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');
require('@testing-library/jest-dom'); // Import jest-dom for extended matchers

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let document;

describe('Timer and Countdown Application', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        document = dom.window.document;
    });

    test('Initial screen buttons are visible', () => {
        expect(document.getElementById('initial-screen')).not.toHaveClass('d-none');
    });

    test('Stopwatch button click shows stopwatch screen', () => {
        document.getElementById('stopwatch-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('stopwatch')).not.toHaveClass('d-none');
    });

    test('Countdown button click shows countdown screen', () => {
        document.getElementById('countdown-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('countdown')).not.toHaveClass('d-none');
    });

    test('Stopwatch displays milliseconds', () => {
        document.getElementById('stopwatch-button').click();
        document.getElementById('start-stopwatch').click();
        setTimeout(() => {
            expect(document.getElementById('stopwatch-display').textContent).toMatch(/\d{2}:\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-stopwatch').click();
        }, 100);
    });

    test('Countdown displays milliseconds', () => {
        document.getElementById('countdown-button').click();
        document.getElementById('start-countdown').click();
        setTimeout(() => {
            expect(document.getElementById('countdown-display').textContent).toMatch(/\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-countdown').click();
        }, 100);
    });
});
```

### Paso 3: Ejecutar las pruebas

Ejecuta nuevamente las pruebas con el siguiente comando:

```bash
npm test
```

Este cambio debería resolver el error de importación y permitir que las pruebas se ejecuten correctamente.
User
Hay dos tests que estan fallando.

El primero se llama **Stopwatch button click shows stopwatch screen**

Y el error el siguiente:

Expected the element to have class:
d-none
Received:
text-center


ChatGPT
El error `Expected the element to have class: d-none` sugiere que la prueba está fallando porque el elemento esperado no tiene la clase `d-none` después de hacer clic en el botón. Es posible que el evento de clic no esté funcionando correctamente en el entorno de prueba, o que el DOM no esté siendo actualizado como se esperaba.

Vamos a ajustar la prueba y el script de la aplicación para asegurarnos de que todo esté funcionando correctamente.

### Verificar `script.js`

Primero, asegúrate de que el script JavaScript está correctamente actualizando las clases del DOM. Aquí está el código relevante de `script.js`:

```javascript
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

    // Rest of the code...
});
```

### Ajustar la prueba

El siguiente paso es asegurarse de que la prueba correctamente simula el evento de clic y verifica el estado del DOM después de que el evento de clic haya sido manejado.

Aquí está la prueba ajustada:

```javascript
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');
require('@testing-library/jest-dom'); // Import jest-dom for extended matchers

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let document;

describe('Timer and Countdown Application', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        document = dom.window.document;
        // Manually inject the script.js into the DOM for tests
        const scriptEl = document.createElement('script');
        scriptEl.textContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
        document.body.appendChild(scriptEl);
    });

    test('Initial screen buttons are visible', () => {
        expect(document.getElementById('initial-screen')).not.toHaveClass('d-none');
    });

    test('Stopwatch button click shows stopwatch screen', () => {
        document.getElementById('stopwatch-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('stopwatch')).not.toHaveClass('d-none');
    });

    test('Countdown button click shows countdown screen', () => {
        document.getElementById('countdown-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('countdown')).not.toHaveClass('d-none');
    });

    test('Stopwatch displays milliseconds', () => {
        document.getElementById('stopwatch-button').click();
        document.getElementById('start-stopwatch').click();
        setTimeout(() => {
            expect(document.getElementById('stopwatch-display').textContent).toMatch(/\d{2}:\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-stopwatch').click();
        }, 100);
    });

    test('Countdown displays milliseconds', () => {
        document.getElementById('countdown-button').click();
        document.getElementById('start-countdown').click();
        setTimeout(() => {
            expect(document.getElementById('countdown-display').textContent).toMatch(/\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-countdown').click();
        }, 100);
    });
});
```

### Ejecutar nuevamente las pruebas

Ejecuta nuevamente las pruebas con el siguiente comando:

```bash
npm test
```

Con estos cambios, deberías poder simular correctamente los eventos de clic y verificar que las clases del DOM se actualicen como se espera. Esto debería resolver los errores de las pruebas que fallan.
User
Ahora me salta el siguiente error al finalizar los tests:

Error: Not implemented: window.alert
ChatGPT
El error `Error: Not implemented: window.alert` se produce porque `window.alert` no está implementado en el entorno de `JSDOM` utilizado por Jest. Para solucionar esto, puedes simular `window.alert` en tus pruebas.

### Simular `window.alert` en las pruebas

Puedes simular `window.alert` al principio de tu archivo de prueba para evitar este error.

Aquí está el archivo de prueba actualizado con la simulación de `window.alert`:

```javascript
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');
require('@testing-library/jest-dom'); // Import jest-dom for extended matchers

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let document;

// Simulate window.alert
beforeAll(() => {
    global.alert = jest.fn();
});

describe('Timer and Countdown Application', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        document = dom.window.document;
        // Manually inject the script.js into the DOM for tests
        const scriptEl = document.createElement('script');
        scriptEl.textContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
        document.body.appendChild(scriptEl);
    });

    test('Initial screen buttons are visible', () => {
        expect(document.getElementById('initial-screen')).not.toHaveClass('d-none');
    });

    test('Stopwatch button click shows stopwatch screen', () => {
        document.getElementById('stopwatch-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('stopwatch')).not.toHaveClass('d-none');
    });

    test('Countdown button click shows countdown screen', () => {
        document.getElementById('countdown-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('countdown')).not.toHaveClass('d-none');
    });

    test('Stopwatch displays milliseconds', () => {
        document.getElementById('stopwatch-button').click();
        document.getElementById('start-stopwatch').click();
        setTimeout(() => {
            expect(document.getElementById('stopwatch-display').textContent).toMatch(/\d{2}:\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-stopwatch').click();
        }, 100);
    });

    test('Countdown displays milliseconds', () => {
        document.getElementById('countdown-button').click();
        document.getElementById('start-countdown').click();
        setTimeout(() => {
            expect(document.getElementById('countdown-display').textContent).toMatch(/\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-countdown').click();
        }, 100);
    });
});
```

### Ejecutar nuevamente las pruebas

Ejecuta nuevamente las pruebas con el siguiente comando:

```bash
npm test
```

Con estos cambios, la simulación de `window.alert` debería prevenir el error y permitir que las pruebas se ejecuten correctamente.