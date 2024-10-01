He usado Gemini, sin éxito

Después he usado ChatGPT 3.5.

# PRIMER PROMPT

Eres un experto desarrollador web, usando HTML, CSS y Javascript.

Tu objetivo es construir una aplicación web que simule el comportamiento de un cronómetro y de una cuenta atrás.

El resultado del código debes devolverlo en tres ficheros: index.html con la parte visual, script.js con la lógica de aplicación, y styles.css con todos los estilos necesarios.

La idea será tener 3 vistas:

- Una que nos permite seleccionar si queremos ejecutar el cronómetro o la cuenta atrás.
- Otra que nos mostrará la funcionalidad de cronómetro
- Una tercera que nos mostrará la funcionalidad de cuenta atrás.

Vista del cronómetro:

- Puedes inspirarte para la parte visual en esta imagen: https://github.com/antoniodfr/AI4Devs-stopwatch/blob/main/res/stopwatch.png
- El botón de start pondrá en funcionamiento el cronómetro, a partir del tiempo que tenga visualizando, e irá refrescando visualmente las horas, minutos, segundos y milisegundos, en formato 00:00:00, y los milisegundos en 000.
- El botón de clear pondrá el tiempo de visualización a 0 horas, 0 minutos , 0 segundos y 0 milisegundos, es decir, 00:00:00 y 000 milisegundos.

Vista de la cuenta atrás:

- Visualmente tendrá el mismo estilo, con un visualización del tiempo igual, pero con los siguientes botones:
 -- 10 botones del 0 al 9, que al pulsarlos, irán estableciendo con el valor del botón los dígitos de la visualización, de izquierda a derecha (de segundos, a minutos y por último a horas).
 -- Un botón de clear, que pondrá el tiempo de visualización a 00:00:00, con los milisegundos a 000.
 -- Un botón de set, para que esa sea la cuenta atrás que va a empezar.
 -- Una vez pulsado el botón de set, todos los botones, tanto los de dígitos como el de clear y set, se trasformarán en los mismos botones que en el caso del cronómetro, con el mismo estilo:
 -- Un botón start, para ir restando del tiempo de visualización segundo a segundo hasta que llegue a 0, momento en el que parará, y se lanzará un sonido, haciendo parpadear el fondo del tiempo de visualización entre el color original y un rojo suave, indicando que el tiempo de cuenta atrás se ha completado.
 -- Un botón clear, que volverá a poner el valor inicial de tiempo de visualización que se estableció al dar al botón de set.

 # SEGUNDO PROMPT
 
 arece que falta incluir en el HTML el elemento countdown-start, necesito que vuelvas a reescribir el index.html para incluirlo

 # TERCER PROMPT
 
 En base a ese index.html, vuelve a generar los ficheros styles.css y script.js para que todo funcione