// ChatGPT 4o
// PRIMER PROMPT

Actúa como un desarrollador frontend senior.

Desarrolla una página web con un cronómetro y una cuenta atrás. Haz que el diseño sea bonito. Organiza el proyecto en diferentes pasos y haz que cumpla con los siguientes requerimientos. 

# PAGINA PRINCIPAL

- Título: Rafa Castillo's StopWatch
- Botones: 
-- Stopwatch: Un botón verde con una flecha hacia arriba y el texto "Stopwatch"
-- Countdown: Un botón rojo con una flecha hacia abajo y el texto "Countdown"

Al hacer click en el botón de Stopwatch debe redirigirse a la vista de Stopwatch, los detalles de esta vista se detallan en su propio apartado.
Al hacer click en el botón de Countdown debe redirigirse a la vista de Countdown, los detalles de esta vista se detallan en su propio apartado

## EJEMPLO DE LA PÁGINA PRINCIPAL
- Replica el diseño de la imagen que adjunto

# VISTA DE STOPWATCH

- La vista principal debe contener un cronómetro y una serie de botones de acción
- El cronómetro debe mostrarse en formato HH:MM:SS y debe incluir un contador de milisegundos en una fuente más pequeña
- Debe contener un botón "Go back" con una flecha hacia la izquierda para regresar a la página principal

## FEATURE 1: ARRANCAR CROÓNMETRO

- Debe contener un botón de color verde con el texto "Start". 
- Al hacer click en el botón "Start" el cronómetro debe empezar y debe mostra como el tiempo va avanzando.
- Al hacer click en el botón "Start" este debe cambiar su texto para que ponga "Pause"
- Al hacer click en en botón, cuando este ponga "Pause" el cronómetro debe detenerse. 
- Al hacer click en en botón, cuando este ponga "Pause" debe cambiar su texto para que ponga "Continue".
- Al hacer click en en botón, cuando este ponga "Pause" debe cambiar su color de fondo para ser azul.
- Al hacer click en el botón, cuando este ponga "Continue" el cronómetro debe continuar la cuenta de tiempo.

## FEATURE 2: RESETEAR CRONÓMTETRO

- Debe contener un botón de color rojo con el texto "Clear". 
- Al hacer click en el botón "Clear" el cronómetro resetearse.
- Al hacer click en el botón "Clear" el botón de "Start" sea cual sea su estado debe resetearse para volver a poner "Start" tal cual como se muestra al cargar la aplicación.

# VISTA DE COUNTDOWN

- La vista principal debe contener un visualizador de la cuenta atrás con el mismo estilo del cronómetro de la vista de Stopwatch y una serie de botones de acción
- La cuenta atrás debe mostrarse en formato HH:MM:SS y debe incluir un contador de milisegundos en una fuente más pequeña
- Debe contener un botón "Go back" con una flecha hacia la izquierda para regresar a la página principal

# FEATURE 1: INTRODUCIR EL TIEMPO DE LA CUENTA ATRÁS

- La vista debe contener un botón para cada número del 0 al 9.
- Al hacer click en uno de los botones de números el contador debe setear el valor de la cuenta atrás debe setear el valor de los segundos
- Si el valor de los segundos ya está definido y se hace click en un botón de número, el valor de los segundos debe pasar a ser el valor de las decenas de segundos y el valor de segundos el del botón pulsado. Este comportamiento debe seguirse progresivamente con los minutos, decenas de minutos, horas y decenas de horas. 
-- Ejemplo: 
1. El contador vale 00:00:00
2. El usuario hace click en el botón 9 -> El contador debe valer 00:00:09
3. El usuario hace click en el botón 8 -> El contador debe valer 00:00:98
4. El usuario hace click en el botón 9 -> El contador debe valer 00:09:89
5. El usuario hace click en el botón 5 -> El contador debe valer 00:98:95
6. El usuario hace click en el botón 6 -> El contador debe valer 09:89:56
7. El usuario hace click en el botón 0 -> El contador debe valer 98:95:60

# FEATURE 2: SETEAR LA CUENTA ATRÁS

- La vista debe contener un botón con el texto "Set" del mismo color que los botones numéricos
- Al hacer click en el botón "Set" el valor del contador debe convertirse a un valor válido de HH:MM:SS
-- Ejemplo
1. El contador vale 00:00:70
2. El usuario hace click en el botón "Set" -> El contador debe valer 00:01:10 dado que 70s es igual a 1min y 10s

Este comportamiento debe tenerse en cuenta para cualquier valor de Horas, Minutos y Segundos introducidos

# FEATURE 3: COMENZAR LA CUENTA ATRÁS

-- Cuando se haya hecho click en el botón "Set" este debe cambiar su texto para poner "Start"
-- Cuando el botón tenga el texto "Start" y se haga click en él la cuenta atrás debe comenzar y debe mostrar como las horas, minutos, segundos y milisegundos se van reduciendo.

# FEATURE 4: RESETEAR LA CUENTA ATRÁS

- La vista debe contener un botón con el texto "Clear" de color gris.
- Al pulsar este botón el valor del botón "Set"/"Start" debe pasar a mostrar "Set"
- Al pulsar este botón el valor de la cuenta atrás debe resetearse a 00:00:00

# ORGANIZACIÓN DE ARCHIVOS

- index.html: Debe contener toda la vista de la aplicación. Parte de base del siguiente contenido:

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

- styles.css: Debe contener todos los estilos para que la web se vea bonita y sencilla
- script.js: Debe contener toda la lógica de negocio

# OTRAS CONSIDERACIONES

- Intenta utilizar buenas prácticas como SOLID
- Haz código muy limpio y facilmente mantenible siguiendo las directrices del libro Clean Code
- Todas las variables y nombres de funciones del código deben estar en inglés
- Añade documentación de todas las funciones en formato JSDoc