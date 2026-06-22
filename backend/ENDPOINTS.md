# 🔌 Endpoints de la API REST

**Base URL**: `http://localhost:8080/api`  
**Versión**: 1.0.0  
**Última actualización**: 2026-06-17

---

## 🔐 Autenticación - `/auth`

### POST /auth/login
Autentica un usuario y retorna JWT token.

**Request:**
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "rol": "GENERAL",
  "email": "juan@example.com"
}
```

**Errores:**
- `400 Bad Request` - Email o password faltante
- `401 Unauthorized` - Credenciales inválidas
- `404 Not Found` - Usuario no existe

---

### POST /auth/registro/espectador
Registra un nuevo usuario espectador (GENERAL).

**Request:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "password": "Test123!",
  "pais_documento": "AR",
  "nro_documento": "12345678",
  "documento_tipo": "DNI",
  "localidad": "Montevideo",
  "calle": "18 de Julio",
  "nro_direccion": "1234",
  "pais_direccion": "UY",
  "codigo_postal": "11100",
  "telefono": "+59899999999"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "email": "juan@example.com",
  "nombre": "Juan",
  "apellido": "Pérez",
  "rol": "GENERAL"
}
```

**Errores:**
- `400 Bad Request` - Validación fallida
- `409 Conflict` - Email ya existe
- `422 Unprocessable Entity` - Documento duplicado

---

### GET /auth/validate/{token}
Valida un token JWT.

**Response (200 OK):**
```json
{
  "valid": true,
  "email": "juan@example.com",
  "rol": "GENERAL"
}
```

---

## 🏟️ Estadios - `/estadio`

### POST /estadio
Crea un nuevo estadio. ✅ **Requiere autenticación**.

**Request:**
```json
{
  "nombre": "Estadio Centenario",
  "ubicacion": "Montevideo, Uruguay"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "nombre": "Estadio Centenario",
  "ubicacion": "Montevideo, Uruguay"
}
```

**Header requerido:**
```
Authorization: Bearer {token}
```

---

### GET /estadio
Lista todos los estadios.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nombre": "Estadio Centenario",
    "ubicacion": "Montevideo, Uruguay"
  },
  {
    "id": 2,
    "nombre": "Gran Parque Central",
    "ubicacion": "Montevideo, Uruguay"
  }
]
```

---

### GET /estadio/{id}
Obtiene un estadio específico.

**Response (200 OK):**
```json
{
  "id": 1,
  "nombre": "Estadio Centenario",
  "ubicacion": "Montevideo, Uruguay"
}
```

**Errores:**
- `404 Not Found` - Estadio no existe

---

### PUT /estadio/{id}
Actualiza un estadio. ✅ **Requiere autenticación + ADMINISTRADOR**.

**Request:**
```json
{
  "nombre": "Estadio Centenario (Renovado)",
  "ubicacion": "Montevideo, Uruguay"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "nombre": "Estadio Centenario (Renovado)",
  "ubicacion": "Montevideo, Uruguay"
}
```

---

### DELETE /estadio/{id}
Elimina un estadio. ✅ **Requiere autenticación + ADMINISTRADOR**.

**Response (204 No Content)**

---

## 🎪 Eventos - `/evento`

### POST /evento
Crea un nuevo evento (partido). ✅ **Requiere autenticación**.

**Request:**
```json
{
  "estadio_id": 1,
  "equipo1_id": 1,
  "equipo2_id": 2,
  "fecha_evento": "2026-06-15",
  "hora_evento": "20:00:00"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "estadio_id": 1,
  "equipo1_id": 1,
  "equipo2_id": 2,
  "fecha_evento": "2026-06-15",
  "hora_evento": "20:00:00",
  "estado": "PENDIENTE"
}
```

**Errores:**
- `400 Bad Request` - Fecha en el pasado
- `404 Not Found` - Estadio o equipo no existe

---

### GET /evento
Lista todos los eventos.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "estadio_id": 1,
    "equipo1_id": 1,
    "equipo2_id": 2,
    "fecha_evento": "2026-06-15",
    "hora_evento": "20:00:00",
    "estado": "APROBADO"
  }
]
```

---

### GET /evento/{id}
Obtiene un evento específico.

**Response (200 OK):**
```json
{
  "id": 1,
  "estadio_id": 1,
  "equipo1_id": 1,
  "equipo2_id": 2,
  "fecha_evento": "2026-06-15",
  "hora_evento": "20:00:00",
  "estado": "APROBADO"
}
```

---

### POST /evento/{id}/aprobar
Aprueba un evento pendiente. ✅ **Requiere autenticación + ADMINISTRADOR**.

**Response (200 OK):**
```json
{
  "id": 1,
  "estado": "APROBADO"
}
```

---

### POST /evento/{id}/cancelar
Cancela un evento. ✅ **Requiere autenticación + ADMINISTRADOR**.

**Request:**
```json
{
  "razon": "Condiciones climáticas adversas"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "estado": "CANCELADO",
  "razon": "Condiciones climáticas adversas"
}
```

---

## 🎟️ Compras - `/compra`

### POST /compra
Crea una compra de entradas. ✅ **Requiere autenticación + GENERAL**.

**Request:**
```json
{
  "evento_id": 1,
  "sector_id": 1,
  "cantidad": 3
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "usuario_id": 1,
  "evento_id": 1,
  "cantidad": 3,
  "estado": "PENDIENTE",
  "monto_total": 300.00,
  "fecha_compra": "2026-06-10T15:30:00"
}
```

**Validaciones:**
- `1 <= cantidad <= 5`
- Evento debe existir y estar aprobado
- Sector debe tener capacidad disponible

**Errores:**
- `400 Bad Request` - Cantidad fuera de rango
- `404 Not Found` - Evento o sector no existe
- `409 Conflict` - Capacidad insuficiente

---

### GET /compra
Lista las compras del usuario autenticado. ✅ **Requiere autenticación**.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "usuario_id": 1,
    "evento_id": 1,
    "cantidad": 3,
    "estado": "PAGA",
    "monto_total": 300.00,
    "fecha_compra": "2026-06-10T15:30:00"
  }
]
```

---

### GET /compra/{id}
Obtiene los detalles de una compra. ✅ **Requiere autenticación**.

**Response (200 OK):**
```json
{
  "id": 1,
  "usuario_id": 1,
  "evento_id": 1,
  "cantidad": 3,
  "estado": "PAGA",
  "monto_total": 300.00,
  "fecha_compra": "2026-06-10T15:30:00",
  "entradas": [
    {
      "id": 1,
      "evento_id": 1,
      "sector_id": 1,
      "estado": "DISPONIBLE",
      "qr_id": 1
    }
  ]
}
```

---

### POST /compra/{id}/confirmar
Confirma una compra (cambia estado a CONFIRMADA). ✅ **Requiere autenticación**.

**Response (200 OK):**
```json
{
  "id": 1,
  "estado": "CONFIRMADA"
}
```

---

### POST /compra/{id}/pagar
Registra el pago de una compra. ✅ **Requiere autenticación**.

**Request:**
```json
{
  "metodo_pago": "TARJETA_CREDITO"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "estado": "PAGA",
  "fecha_pago": "2026-06-10T15:35:00"
}
```

---

## 🔐 QR Code - `/qr`

### GET /qr/{entrada_id}
Obtiene el código QR de una entrada. ✅ **Requiere autenticación**.

**Response (200 OK):**
```json
{
  "id": 1,
  "entrada_id": 1,
  "codigo": "EVENTO-001-SECTOR-A-UUID123456",
  "imagen_base64": "iVBORw0KGgoAAAANSUhEUgAAAAUA...",
  "consumida": false,
  "validado_por": null
}
```

---

### POST /qr/{entrada_id}/generar
Genera una nueva imagen QR para una entrada. ✅ **Requiere autenticación**.

**Response (200 OK):**
```json
{
  "id": 1,
  "entrada_id": 1,
  "imagen_base64": "iVBORw0KGgoAAAANSUhEUgAAAAUA...",
  "regenerado_en": "2026-06-10T15:40:00"
}
```

---

### POST /qr/{codigo}/validar
Valida un QR (lo marca como consumido). ✅ **Requiere autenticación + FUNCIONARIO**.

**Request:**
```json
{
  "dispositivo_id": 1
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "entrada_id": 1,
  "codigo": "EVENTO-001-SECTOR-A-UUID123456",
  "consumida": true,
  "fecha_consumo": "2026-06-15T20:15:00",
  "validado_por": 5,
  "usuario": "Juan Pérez",
  "evento": "Brasil vs Argentina",
  "sector": "A"
}
```

**Errores:**
- `400 Bad Request` - QR inválido o ya consumido
- `401 Unauthorized` - Usuario no es FUNCIONARIO

---

## 🔄 Transferencias - `/transferencia` (TBD)

### POST /transferencia
Crea una solicitud de transferencia de entradas. ✅ **Requiere autenticación + GENERAL**.

**Request:**
```json
{
  "destinatario_id": 2,
  "entrada_ids": [1, 2],
  "cantidad": 2
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "remitente_id": 1,
  "destinatario_id": 2,
  "cantidad": 2,
  "estado": "PENDIENTE",
  "fecha_solicitud": "2026-06-10T16:00:00"
}
```

**Validaciones:**
- `1 <= cantidad <= 3`
- Destinatario debe existir
- Usuario debe ser propietario de las entradas

---

### GET /transferencia/pendientes
Lista transferencias pendientes. ✅ **Requiere autenticación**.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "remitente_id": 1,
    "remitente_nombre": "Juan Pérez",
    "destinatario_id": 2,
    "cantidad": 2,
    "estado": "PENDIENTE",
    "fecha_solicitud": "2026-06-10T16:00:00"
  }
]
```

---

### POST /transferencia/{id}/aprobar
Aprueba una transferencia. ✅ **Requiere autenticación + ADMINISTRADOR**.

**Response (200 OK):**
```json
{
  "id": 1,
  "estado": "APROBADA",
  "fecha_aprobacion": "2026-06-10T16:05:00"
}
```

---

### POST /transferencia/{id}/rechazar
Rechaza una transferencia. ✅ **Requiere autenticación + ADMINISTRADOR**.

**Request:**
```json
{
  "razon": "Entradas no disponibles"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "estado": "RECHAZADA",
  "razon": "Entradas no disponibles"
}
```

---

## 📊 Estados de Entidades

### Usuario
- `ACTIVO` - Usuario registrado y activo
- `INACTIVO` - Usuario desactivado
- `BLOQUEADO` - Usuario bloqueado por admin

### Evento
- `PENDIENTE` - Pendiente de aprobación
- `APROBADO` - Aprobado y visible
- `CANCELADO` - Cancelado

### Compra
- `PENDIENTE` - Creada, sin confirmar
- `CONFIRMADA` - Confirmada, sin pagar
- `PAGA` - Completada y pagada

### Entrada
- `DISPONIBLE` - Sin comprar
- `COMPRADA` - Asignada a compra
- `CONSUMIDA` - Validada en evento
- `TRANSFERIDA` - Transferida a otro usuario

### Transferencia
- `PENDIENTE` - Esperando aprobación
- `APROBADA` - Aprobada por admin
- `RECHAZADA` - Rechazada por admin

### QR
- `ACTIVO` - Listo para validar
- `CONSUMIDO` - Ya fue validado

---

## 🔒 Autenticación & Autorización

### Header requerido:
```
Authorization: Bearer {jwt_token}
```

### Ejemplo con cURL:
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     http://localhost:8080/api/compra
```

### Roles:
- `GENERAL` - Usuario espectador normal
- `FUNCIONARIO` - Oficial (puede validar QR)
- `ADMINISTRADOR` - Admin (puede aprobar eventos/transferencias)

---

## 🔗 Códigos de Error Estándar

| Código | Descripción | Ejemplo |
|--------|-------------|---------|
| 200 | OK | Consulta exitosa |
| 201 | Created | Recurso creado |
| 204 | No Content | Eliminación exitosa |
| 400 | Bad Request | Datos inválidos |
| 401 | Unauthorized | Token inválido o faltante |
| 403 | Forbidden | Acceso denegado (rol insuficiente) |
| 404 | Not Found | Recurso no existe |
| 409 | Conflict | Conflicto (ej: email duplicado) |
| 422 | Unprocessable Entity | Entidad inválida |
| 500 | Internal Server Error | Error del servidor |

---

## 📝 Ejemplos de Flujo Completo

### 1. Registrarse, Login y Comprar Entrada

```bash
# 1. Registrar
curl -X POST http://localhost:8080/api/auth/registro/espectador \
  -H "Content-Type: application/json" \
  -d '{
    "nombre":"Juan",
    "apellido":"Pérez",
    "email":"juan@example.com",
    "password":"Test123!",
    "pais_documento":"AR",
    "nro_documento":"12345678",
    "documento_tipo":"DNI"
  }'

# 2. Login (obtener token)
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@example.com","password":"Test123!"}' \
  | jq -r '.token')

# 3. Comprar entrada
curl -X POST http://localhost:8080/api/compra \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "evento_id":1,
    "sector_id":1,
    "cantidad":2
  }'
```

### 2. Validar QR en Evento

```bash
# Como funcionario, validar QR
curl -X POST http://localhost:8080/api/qr/EVENTO-001-SECTOR-A-UUID/validar \
  -H "Authorization: Bearer $FUNCIONARIO_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"dispositivo_id":1}'
```

---

**Versión API**: 1.0.0  
**Última actualización**: 2026-06-17  
**Autor**: Copilot CLI
