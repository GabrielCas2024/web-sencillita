# Documentacion tecnica del feature `feat/login`

## 1. Objetivo

Este documento describe el trabajo realizado en el feature `feat/login`. Se ha añadido un sistema de login opcional a la pagina web. La pagina principal sigue siendo publica y se puede visitar sin iniciar sesion. El formulario de acceso se abre en una pantalla independiente.

## 2. Datos de acceso de prueba

- Usuario: `profe`
- Contraseña: `javi`

Estas credenciales son solo para la demostracion y no deben utilizarse en una aplicacion real.

## 3. Funcionamiento

1. El usuario entra en `index.html` y ve la pagina principal.
2. En el menu puede pulsar **Iniciar sesion**.
3. Se abre `login.html` con el formulario de acceso.
4. Si las credenciales son correctas, se guarda una sesion en `sessionStorage` y el usuario vuelve a `index.html`.
5. La cabecera muestra `Hola, profe` y aparece el boton **Cerrar sesion**.
6. Al cerrar sesion, se elimina la sesion y se vuelve a la portada publica.
7. Si se intenta abrir `login.html` teniendo una sesion activa, se vuelve automaticamente a la portada.

## 4. Archivos modificados

### `index.html`

- Mantiene la pagina publica como pantalla inicial.
- Incluye el enlace a `login.html`.
- Incluye el saludo del usuario autenticado.
- Incluye el boton para cerrar sesion.

### `login.html`

- Es la nueva pantalla independiente de acceso.
- Contiene los campos de usuario y contraseña.
- Incluye un enlace para volver a la pagina principal.

### `script.js`

- Comprueba las credenciales introducidas.
- Calcula el hash SHA-256 de la contraseña mediante `crypto.subtle`.
- Guarda el estado de autenticacion en `sessionStorage`.
- Redirige entre `login.html` e `index.html`.
- Gestiona el saludo y el cierre de sesion.
- Comprueba que los elementos existen antes de usarlos, porque el mismo script se carga en las dos paginas.

### `style.css`

- Contiene los estilos de la pantalla de login.
- Mantiene el estilo general de la pagina.
- Añade estilos para el saludo, los mensajes de error y el enlace de vuelta.

## 5. Estado de la sesion

La sesion se guarda con esta clave:

```text
sessionStorage.authenticated = "true"
```

`sessionStorage` mantiene la sesion mientras la pestaña del navegador permanece abierta. Al cerrar la pestaña, la sesion desaparece.

## 6. Validaciones realizadas

- Se comprobo la sintaxis de `script.js` con `node --check script.js`.
- Se comprobo que el hash configurado corresponde a la contraseña `javi`.
- Se comprobo que `index.html` enlaza con `login.html`.
- Se comprobo que `login.html` permite volver a `index.html`.
- Se comprobo que la rama contiene los archivos esperados y que el commit se creo correctamente.

## 7. Trabajo con Git

La funcionalidad se desarrollo en una rama independiente:

```bash
git switch -c feat/login
```

El commit realizado fue:

```text
394d250 feat(auth): add optional login screen
```

Para subir la rama al fork:

```bash
git push -u origin feat/login
```

Despues se puede abrir un Pull Request desde la rama `feat/login` del fork hacia la rama `master` del repositorio original del profesor.

## 8. Limitacion de seguridad

Este proyecto es una web estatica. Aunque la contraseña no se guarda en texto plano y se compara mediante un hash, todo el codigo JavaScript se envia al navegador. Por tanto, una persona puede inspeccionar el codigo y obtener informacion suficiente para saltarse esta proteccion.

Para un sistema seguro en produccion seria necesario:

- Un backend que valide las credenciales.
- Una base de datos para los usuarios.
- Contraseñas almacenadas con un algoritmo especifico para contraseñas, como Argon2 o bcrypt.
- Sesiones gestionadas desde el servidor mediante cookies seguras.
- HTTPS.
- Proteccion contra intentos repetidos de acceso.

La implementacion actual sirve como practica de HTML, CSS, JavaScript y GitHub, no como sistema de autenticacion real.

## 9. Como probarlo

1. Abrir `index.html` en el navegador.
2. Pulsar **Iniciar sesion**.
3. Introducir `profe` como usuario.
4. Introducir `javi` como contraseña.
5. Comprobar que aparece `Hola, profe` en la portada.
6. Pulsar **Cerrar sesion** y comprobar que vuelve a aparecer el acceso opcional.
