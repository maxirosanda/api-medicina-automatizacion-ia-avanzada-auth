# API de Pacientes — Documentación

Esta API permite gestionar pacientes mediante operaciones básicas de una API REST, incorporando autenticación con JWT (Bearer Token).

Será utilizada en los ejercicios del curso de Automatización con IA utilizando n8n.

Los estudiantes deberán consumir esta API desde workflows de n8n utilizando el nodo HTTP Request, incluyendo autenticación.

---

# Base URL

```
https://api-medicina-automatizacion-ia-avanzada-auth-production.up.railway.app/api
```

---
# 🔐 Autenticación

La API utiliza **JWT (JSON Web Token)**.

Para acceder a los endpoints protegidos, primero debes:

1. Registrarte  
2. Iniciar sesión  
3. Obtener un token  
4. Enviar el token en cada request  

---

## 🧑‍💻 Registro de usuario (Register)

Permite crear un nuevo usuario en el sistema.

### Endpoint

POST /api/auth/register

### Body

{
  "email": "test@test.com",
  "password": "123456"
}

### Respuesta exitosa

{
  "message": "Usuario creado"
}

### Posibles errores

Usuario ya existe:

{
  "message": "Usuario ya existe"
}

---

## 🔑 Obtener Token (Login)

Permite autenticarse y obtener un token JWT.

### Endpoint

POST /api/auth/login

### Body

{
  "email": "test@test.com",
  "password": "123456"
}

### Respuesta

{
  "token": "eyJhbGciOiJIUzI1NiIs...",

}

### Posibles errores

Credenciales inválidas:

{
  "message": "Credenciales inválidas"
}

---

## 🔑 Uso del Token

Debes incluir el token en el header de cada request:

Authorization: Bearer TU_TOKEN


# Modelo de Paciente

Cada paciente tiene la siguiente estructura:

```json
{
  "_id": "string",
  "name": "string",
  "age": "number",
  "email": "string",
  "diagnosis": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Campos obligatorios

- name
- age
- email

### Campo opcional

- diagnosis

Si no se envía `diagnosis`, el sistema asigna automáticamente:

```
"Sin diagnóstico"
```

---

# Endpoints disponibles

---

# Crear paciente

Crea un nuevo paciente en la base de datos.

### Endpoint

```
POST /api/patients
```

### Body

```json
{
  "name": "Juan Perez",
  "age": 40,
  "email": "juan@email.com"
}
```

### Respuesta exitosa

```json
{
  "_id": "65f1a3...",
  "name": "Juan Perez",
  "age": 40,
  "email": "juan@email.com",
  "diagnosis": "Sin diagnóstico",
  "createdAt": "2026-03-12T10:00:00.000Z",
  "updatedAt": "2026-03-12T10:00:00.000Z"
}
```

---

# Obtener todos los pacientes

Devuelve la lista completa de pacientes.

### Endpoint

```
GET /api/patients
```

### Respuesta

```json
{
  "count": 2,
  "data": [
    {
      "_id": "65f1a3...",
      "name": "Juan Perez",
      "age": 40,
      "email": "juan@email.com"
    },
    {
      "_id": "65f1a4...",
      "name": "Ana Gomez",
      "age": 30,
      "email": "ana@email.com"
    }
  ]
}
```

---

# Obtener paciente por ID

Devuelve la información de un paciente específico.

### Endpoint

```
GET /api/patients/:id
```

### Ejemplo

```
GET /api/patients/65f1a3c8d2a1c7f4b123456
```

### Respuesta

```json
{
  "_id": "65f1a3c8d2a1c7f4b123456",
  "name": "Juan Perez",
  "age": 40,
  "email": "juan@email.com",
  "diagnosis": "Sin diagnóstico"
}
```

---

# Actualizar paciente

Permite actualizar uno o varios campos de un paciente.

### Endpoint

```
PUT /api/patients/:id
```

### Ejemplo

```
PUT /api/patients/65f1a3c8d2a1c7f4b123456
```

### Body

```json
{
  "name": "Juan Actualizado",
  "age": 41,
  "email": "juanactualizado@email.com"
}
```

### Respuesta

```json
{
  "_id": "65f1a3c8d2a1c7f4b123456",
  "name": "Juan Actualizado",
  "age": 41,
  "email": "juanactualizado@email.com"
}
```

---

# Eliminar paciente

Elimina un paciente de la base de datos.

### Endpoint

```
DELETE /api/patients/:id
```

### Ejemplo

```
DELETE /api/patients/65f1a3c8d2a1c7f4b123456
```

### Respuesta

```json
{
  "message": "Paciente eliminado correctamente",
  "patientId": "65f1a3c8d2a1c7f4b123456"
}
```

---

# Validaciones de la API

La API incluye validaciones automáticas.

---

## Campos obligatorios

Si faltan campos obligatorios:

```json
{
  "message": "Faltan campos obligatorios",
  "requiredFields": ["name", "age", "email"]
}
```

---

## Email inválido

```json
{
  "message": "Formato de email inválido"
}
```

---

## Email duplicado

Si se intenta registrar un email que ya existe:

```json
{
  "message": "El email ya existe"
}
```

---

## ID inválido

Si el ID no tiene formato válido:

```json
{
  "message": "ID de paciente inválido"
}
```

---

## Paciente no encontrado

```json
{
  "message": "Paciente no encontrado"
}
```

---

# Códigos HTTP utilizados

| Código | Significado |
|------|-------------|
| 200 | Operación exitosa |
| 201 | Recurso creado |
| 400 | Error en los datos enviados |
| 404 | Recurso no encontrado |
| 409 | Conflicto (email duplicado) |
| 500 | Error interno del servidor |

---

# Uso en n8n

Para consumir esta API desde n8n se utiliza el nodo:

```
HTTP Request
```

Configuración básica:

### Crear paciente

```
Method: POST
URL: /api/patients
```

### Obtener pacientes

```
Method: GET
URL: /api/patients
```

### Actualizar paciente

```
Method: PUT
URL: /api/patients/:id
```

### Eliminar paciente

```
Method: DELETE
URL: /api/patients/:id
```

---

# Recomendación para los ejercicios

En los workflows de n8n se recomienda:

- Utilizar **Retry on Fail**
- Manejar **errores de la API**
- Devolver respuestas usando **Respond to Webhook**

Esto permitirá construir **automatizaciones robustas basadas en APIs**.