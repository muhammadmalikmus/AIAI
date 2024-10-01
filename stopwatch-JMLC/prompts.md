# Prompt 1 con ChatGPT
```
Como desarrollador de Javascript debes generar el código para crear un cronómetro y cuenta atrás siguiendo las siguientes instrucciones.
Vamos a ir paso a paso:
1. Requisitos iniciales y funcionalidad de la aplicación para generar un listado de historias de usuario
2. Codificar las historias de usuario
3. Crear los test de aceptación

## 1. Requisitos iniciales

- Tenemos un ejemplo de funcionalidad en https://www.online-stopwatch.com/ 
- Tenemos un fichero index.html base, adjunto
- Se desea una arquitectura limpia siguiendo principios SOLID, separando responsabilidades de interfaz y funcionalidad
- El idioma será el inglés

Partimos de un diseño inicial como el adjunto en stopwatch.png, donde podemos ver:
- Recuadro o input con el tiempo
- Botón Start inicialmente visible
- Botón Clear inicialmente visible

¿Podrías aconsejar como podríamos diseñar las dos funcionalidades de cronómetro y cuenta atrás en el diseño planteado? No sigas con el punto 2 hasta tener claros los requisitos.
```

## Comentarios
> Ha generado una respuesta con varias secciones: Historias de usuario, Funcionalidad Detallada, Arquitectura, Estructura de Archivos, Diseño inicial y ¿Cómo diseñar las funcionalidades?
> Revisamos cada sección y hacemos las correcciones en el segundo prompt:


# Prompt 2 con ChatGPT
```
Falta una historia de usuario en la funcionalidad de "cuenta atrás":
- Como usuario quiero ser notificado cuando la cuenta atrás llegue a 0.
Ok al resto de historias de usuario.

En cuanto a la funcionalidad detallada falta especificar que el formato del reloj es el siguiente: HH:mm:ss.sss Es decir, Horas + ":" + minutos + ":" + segundos + "." + milisegundos. Esto aplica tanto en el cronómetro como la cuenta atrás.

En cuanto al diseño podríamos mejorarlo haciendo que el usuario pueda seleccionar entre si quiere una Cuenta atrás o un cronómetro. Podría ser un radio button o switch donde se visualice unos emojis con una etiqueta (en inglés)
Si se selecciona la cuenta atrás debe preguntarse por el tiempo en alertas donde pregunte primero las horas, luego los minutos y luego los segundos.
```

## Comentarios
> Todo parece correcto

# Prompt 3: Coding
```
De acuerdo, procedamos con la codificación
```

## Comentarios
> El cronómetro funciona correctamente.
> La cuenta atrás no, cuando se para no deja continuar si no que vuelve a pedir el tiempo para la cuenta atrás.
> El formateo no es del todo correcto en los milisegundos, puesto que solo decrementa el último dígito de los 3


# Prompt 4: Fixes
```
Antes de seguir con los test debemos corregir dos cosas:
- El cronómetro funciona correctamente.
- La cuenta atrás no: cuando se para no debe mostrar el botón "Start" si no un botón "Continue" para seguir con la cuenta atrás.
- El formateo no es del todo correcto en los milisegundos, puesto que solo decrementa el último dígito de los 3
```

# Prompt 5: Fixes
```
Tenemos que corregir 2 cosas aún:
- El formato de milisegundos sigue estando mal, Ahora se muestran y decrementan los 2 últimos dígitos. Pero debe ser con 3 dígitos. El espacio es para 999 milisegundos. Por tanto la cuenta atrás empieza en 999 al haber decrementado el segundo.
- El mensaje de "Time's up" se muestra con el contador "00:00:00.001" o "00:00:00.002"
```

# Prompt 6: Fixes
```
Seguimos teniendo 2 errores parecidos:
- En el formato de los milisegundos solo se mueven los dos primeros dígitos, tanto en el cronómetro como en la cuenta atrás. En el cronómetro debe incrementarse de 0 a 999 en pasos de 1 milisegundo: 1, 2, 3, ..., 998, 999. En la cuenta atrás debe decrementarse de 999 a 0 en pasos de 1 milisegundo: 999, 998, 997, ..., 3, 2, 1, 0
- Seguimos mostrando el mensaje "Time's up" antes de actualizar el display
```

# Prompt 7: Final Fix
```
Aún no está bien: 
- El contador de milisegundos tarda 10 segundos en llegar a 999 e incrementar el la parte de segundos. 
Parece que el código encargado de procesar y mostrar los milisegundos y se ejecuta cada milisegundo tarda más de 1 milisegundo. ¿Que soluciones propones?
```

> Ahora ha identificado el problema y cambia la solución para mostrar correctamente los ms

# Prompts 8, 9 y 10: Testing
```
Muy bien, ahora nos falta el testing. Como experto en QA, qué soluciones tenemos para implementar un test del código realizado? 
Se debería enfocar como Acceptance testing (HTML+JS) aunque también se puede describir pruebas unitarias de la parte Javascript.
En ambos casos debe utilizar el código realizado y los test no se deben ejecutar en producción ni alterar su código.
```

> La ejecución de `run test:unit` falla y se intentan corregir:
```
Falla el test unitario:

test
mocha tests/unit.test.js

Exception during run: Error [ERR_REQUIRE_ESM]: require() of ES Module
```

> Los test fallan
```
Todos los test fallan porque no encuentra las funciones.
Por ejemplo:

Timer and Countdown Unit Tests
should correctly update display:
TypeError: updateDisplay is not a function
```

> Los test siguen fallando y no hay manera de solucionarlo.
> Además se ha vuelto a romper el "Pause" que ya se había solucionado pasos antes.

# Prompt 11: Fix de un bug ya solucionado
```
Se ha vuelto a romper el botón "Pause" y "Continue" de la cuenta atrás.
Cuando se pulsa el botón "Start" debe mostrarse la opción "Pause", que para la cuenta atrás. Cuando se pulsa "Pause" debe mostrarse "Continue" para seguir con la cuenta atrás.
Cuando finaliza la cuenta atrás, se debe mostrar el botón "Start" para empezar otra cuenta atrás.
```