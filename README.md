# Unidad 4 - Cliente RESTful Web con React


## Caso trabajado

- CRUD base de las guías: **Usuarios**.
- CRUD del caso asignado: **Pedidos / Restaurante / Número de pedido**.

## Tecnologías utilizadas

- React
- Vite
- Axios
- React Router DOM
- JavaScript
- CSS

## Requisitos previos

Antes de ejecutar este frontend, debes tener funcionando el backend de la Unidad 3 en:

```text
http://localhost:8080
```

La URL base configurada para consumir el API es:

```text
http://localhost:8080/api
```

Esta URL se puede modificar en el archivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```


## Endpoints consumidos

### Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/users` | Listar usuarios |
| GET | `/api/users/{id}` | Consultar usuario por ID |
| POST | `/api/users` | Crear usuario |
| PUT | `/api/users/{id}` | Actualizar usuario |
| DELETE | `/api/users/{id}` | Eliminar usuario |

### Pedidos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/pedidos` | Listar pedidos |
| GET | `/api/pedidos/{id}` | Consultar pedido por ID |
| POST | `/api/pedidos` | Crear pedido |
| PUT | `/api/pedidos/{id}` | Actualizar pedido |
| DELETE | `/api/pedidos/{id}` | Eliminar pedido |

### Login

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/auth/login` | Formulario preparado para consumir login si el backend lo tiene disponible |

> Nota: si el backend de Unidad 3 no tiene implementado `/api/auth/login`, la pantalla de login mostrará un mensaje de advertencia y servirá como evidencia de validación del formulario.

## Estructura del proyecto

```text
src/
├── api/
│   └── axiosConfig.js
├── components/
│   └── Navbar.jsx
├── models/
│   ├── pedidoModel.js
│   └── userModel.js
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── PedidosPage.jsx
│   └── UsersPage.jsx
├── services/
│   ├── authService.js
│   ├── pedidoService.js
│   └── userService.js
├── App.jsx
├── main.jsx
└── styles.css
```

## Funcionalidades

- Listar usuarios.
- Crear usuarios.
- Editar usuarios.
- Eliminar usuarios.
- Listar pedidos.
- Crear pedidos.
- Editar pedidos.
- Eliminar pedidos.
- Validar formularios antes de enviar.
- Mostrar mensajes de éxito y error.
- Manejar respuestas del servidor.
- Organizar código en páginas, servicios, modelos y configuración HTTP.

## Documentación incluida

El proyecto incluye documentación de apoyo en la carpeta `docs/`:



## Flujo recomendado de Pull Requests

```text
PR #1 chore: configurar proyecto base React
PR #2 feat: agregar configuracion de rutas y cliente HTTP
PR #3 feat: implementar consumo REST de usuarios
PR #4 feat: implementar consumo REST de pedidos
PR #5 feat: agregar interfaz visual y validaciones
PR #6 docs: agregar documentacion de entrega
```

## Autor

Rey David Borrego Pérez  
Universidad de Cartagena  
Asignatura: Desarrollo de Web


## Documentación de entrega

La carpeta `docs/` contiene los documentos en formato Word y PDF para la entrega de la Actividad 4:

- `Informe_Actividad_Unidad_4.docx`
- `Informe_Actividad_Unidad_4.pdf`
- `Endpoints_Consumidos_Unidad_4.docx`
- `Endpoints_Consumidos_Unidad_4.pdf`
- `Pull_Requests_Unidad_4.docx`
- `Pull_Requests_Unidad_4.pdf`

