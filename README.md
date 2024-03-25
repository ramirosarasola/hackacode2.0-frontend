# Hackacode 2.0 Frontend

Este es el frontend de Hackacode 2.0, una aplicación desarrollada con Next.js.

## Descripción

Este proyecto es el frontend de la aplicación Hackacode 2.0. Utiliza Next.js como framework de desarrollo de React.js para crear aplicaciones web modernas y eficientes.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes scripts:

- **`npm run dev`**: Ejecuta la aplicación en modo de desarrollo.\
  Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador.

- **`npm run build`**: Construye la aplicación para producción en la carpeta `.next`.\
  Esto optimiza y prepara la aplicación para obtener el mejor rendimiento.

- **`npm start`**: Inicia un servidor de producción con la aplicación optimizada.\
  La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

- **`npm run lint`**: Ejecuta ESLint para verificar el formato y calidad del código.

## Configuracion

Para cambiar la url a donde se ejecutan las peticiones:

- **`utils/`**: Contiene archivos de utilidades y configuraciones.

  - **`configApi.js`**: Este archivo define la URL base para realizar las peticiones a la API. Debes configurar la URL adecuada según el entorno de desarrollo o producción.

    ```javascript
    const configApi = {
      // apiUrl: 'http://vps-3991846-x.dattaweb.com', // producción
      apiUrl: 'http://localhost', // desarrollo
    }

    export default configApi;
    ```

---

## Dependencias Principales

- **@emotion/react**: Librería de estilos en React.
- **@mui/icons-material**: Iconos de Material-UI.
- **@mui/material**: Componentes de Material-UI.
- **@reduxjs/toolkit**: Herramientas para manejar el estado global de la aplicación con Redux.
- **@tremor/react**: Librería de componentes y utilidades de Tremor.
- **antd**: Componentes de UI de Ant Design.
- **axios**: Cliente HTTP basado en promesas para el navegador y Node.js.
- **next**: Framework de React para construir aplicaciones web.
- **react**: Biblioteca JavaScript para construir interfaces de usuario.
- **react-dom**: Provee métodos específicos del DOM para React.
- **react-hook-form**: Biblioteca para manejar formularios en React con facilidad.
- **react-redux**: Conector oficial de React para Redux.
- **redux-persist**: Persiste y rehidrata el estado de Redux.
- **redux-thunk**: Middleware de Redux para manejar acciones asíncronas.
- **zod**: Validación de esquemas en TypeScript.

## Dependencias de Desarrollo

- **@types/node**: Tipos TypeScript para Node.js.
- **@types/react**: Tipos TypeScript para React.
- **@types/react-dom**: Tipos TypeScript para ReactDOM.
- **autoprefixer**: Plugin de PostCSS para analizar los archivos CSS y agregar prefijos de proveedores.
- **eslint**: Herramienta de linting para identificar y reportar patrones en el código JavaScript.
- **eslint-config-next**: Configuración de ESLint específica para proyectos Next.js.
- **postcss**: Herramienta de procesamiento de CSS con JavaScript.
- **tailwindcss**: Framework de CSS utilizable para construir interfaces de usuario personalizadas.
