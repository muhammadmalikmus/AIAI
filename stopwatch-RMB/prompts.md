Chatbot: ChatGPT 4o

# Prompts

En el prompt 1, le he pedido que me informe sobre posibles frameworks CSS que también se adapten a smartwatches.

En el prompt 2 he incluido todo lo necesario, y le he dicho que utilice uno de los frameworks propuestos (Framework7). Tras varios intentos, no he conseguido que funcione con ese framework, así que ha optado por otro framework para el prompt 3 (los prompts para corregir los errores no los incluyo).

El prompt 3 es igual que el 2, pero reemplazando el framework por otro llamado "Bulma". En este caso ha funcionado a la primera.

## Prompt 1

¿Existe algún framework CSS optimizado para smartwatch?

## Prompt 2

Actúa como un experto en HTML5 y Javascript. Desarrolla una aplicación web que incluya **un cronómetro digital y un reloj de cuenta atrás digital**. 

El contenido de la aplicación web debe ser:

- **Página inicial** con 2 botones que permitan elegir "Cronómetro" y "Cuenta atrás". Acompañar cada botón de un icono adecuado.

- **Cronómetro**: 
  - Tendrá un display inicialmente a 00:00:00.000
  - El usuario podrá poner en marcha o pausar la cuenta atrás desde un mismo botón. El texto del botón cambiará en cada caso: "Iniciar" o "Pausar".
  - Otro botón permitirá **resetear el cronómetro** y empezar desde 0 de nuevo
  - Tendrá un botón de navegación para **volver a la página inicial**
  - Puedes utilizar la imagen https://github.com/LIDR-academy/AI4Devs-stopwatch/blob/main/res/stopwatch.png?raw=true como diseño de referencia para el display y los botones.

- **Cuenta atrás**
  - Permitirá al usuario **configurar el número de horas, minutos y segundos totales de la cuenta atrás**. Tendrá un botón para confirmar la selección.
  - Una vez confirmada la selección, aparecerá el display con la cuenta atrás pausada según la haya configurado el usuario.
  - El usuario podrá poner en marcha o pausar la cuenta atrás desde un mismo botón. El texto del botón cambiará en cada caso: "Iniciar" o "Pausar".
  - Habrá otro botón para **volver a configurar la cuenta atrás**.
  - Tendrá un botón de navegación para **volver a la página inicial**
  - La apariencia del display y botones será igual que en la página "Cronómetro"

En todo momento se podrá cambiar el idioma de la interfaz entre español, inglés y portugués. Habrá 3 pequeños botones en la parte superior: "ES", "EN", "PT". Al clickar esos botones se cambiará el idioma de los textos de la interfaz. **Utiliza i18n para las traducciones**.

**Utiliza el framework CSS Framework7 para el layout** responsive, display y botones.

Incluye **comentarios** para aclarar el funcionamiento del código.

El **código generado debe estar en inglés**, incluyendo nombres de variables, funciones y comentarios.

El JS generado debe incluirse en un archivo **script.js**, y deben emplearse buenas prácticas de programación.

## Prompt 3

Actúa como un experto en HTML5 y Javascript. Desarrolla una aplicación web que incluya **un cronómetro digital y un reloj de cuenta atrás digital**. 

El contenido de la aplicación web debe ser:

- **Página inicial** con 2 botones que permitan elegir "Cronómetro" y "Cuenta atrás". Acompañar cada botón de un icono adecuado.

- **Cronómetro**: 
  - Tendrá un display inicialmente a 00:00:00.000
  - El usuario podrá poner en marcha o pausar la cuenta atrás desde un mismo botón. El texto del botón cambiará en cada caso: "Iniciar" o "Pausar".
  - Otro botón permitirá **resetear el cronómetro** y empezar desde 0 de nuevo
  - Tendrá un botón de navegación para **volver a la página inicial**
  - Puedes utilizar la imagen https://github.com/LIDR-academy/AI4Devs-stopwatch/blob/main/res/stopwatch.png?raw=true como diseño de referencia para el display y los botones.

- **Cuenta atrás**
  - Permitirá al usuario **configurar el número de horas, minutos y segundos totales de la cuenta atrás**. Tendrá un botón para confirmar la selección.
  - Una vez confirmada la selección, aparecerá el display con la cuenta atrás pausada según la haya configurado el usuario.
  - El usuario podrá poner en marcha o pausar la cuenta atrás desde un mismo botón. El texto del botón cambiará en cada caso: "Iniciar" o "Pausar".
  - Habrá otro botón para **volver a configurar la cuenta atrás**.
  - Tendrá un botón de navegación para **volver a la página inicial**
  - La apariencia del display y botones será igual que en la página "Cronómetro"

En todo momento se podrá cambiar el idioma de la interfaz entre español, inglés y portugués. Habrá 3 pequeños botones en la parte superior: "ES", "EN", "PT". Al clickar esos botones se cambiará el idioma de los textos de la interfaz. **Utiliza i18n para las traducciones**.

**Utiliza el framework CSS Bulma para el layout** responsive, display y botones.

Incluye **comentarios** para aclarar el funcionamiento del código.

El **código generado debe estar en inglés**, incluyendo nombres de variables, funciones y comentarios.

El JS generado debe incluirse en un archivo **script.js**, y deben emplearse buenas prácticas de programación.