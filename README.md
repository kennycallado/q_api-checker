# q-api-checker

## Description

Subcontenedor para pod q-api-check. Su función es ejecutar los scripts de cada proyecto, no exponiendose directamente sino que se comunica con contenedor de orden superior en el mismo pod, el cual gestiona seguridad y comunicación con el resto del sistema.

La idea en producción es usar un volúmen para guardar fuera del contenedor los scripts de cada proyecto y gestionarlo a través del módulo scripts de este mísmo contenedor.

## Dependencies

## Recuerda

Al iniciar el proyecto en desarrollo es necesario crear una carpeta en `/scripts` con el número de proyecto, ejemplo `/1`. Dentro del cual incluir el fichero `push_steps.js` renombrado a `push.js`.

## TODO

- [ ] Something
- [ ] Clean the unused way to upload
