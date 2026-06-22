# 🏗️ Arquitectura del Backend

## Diagrama de Capas

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENTE (Frontend)                      │
│              (Angular, React, Vue, Mobile)                  │
└─────────────────────────────┬───────────────────────────────┘
                              │
                    REST API (JSON/HTTP)
                              │
         ┌────────────────────┴────────────────────┐
         ▼                                         ▼
┌─────────────────────────┐         ┌──────────────────────────┐
│  Controllers (REST)     │         │  Exception Handling      │
│  ────────────────────   │         │  (@ControllerAdvice)     │
│ • AuthController        │         │                          │
│ • EventoController      │◄────────┤  • 400 Bad Request       │
│ • CompraController      │         │  • 401 Unauthorized      │
│ • QRController          │         │  • 404 Not Found         │
│ • EstadioController     │         │  • 500 Server Error      │
└──────────┬──────────────┘         └──────────────────────────┘
           │
           │ (Inyección de dependencias)
           │
    ┌──────┴──────────────────────────────┐
    ▼                                      ▼
┌────────────────────┐         ┌──────────────────────┐
│  Services          │         │  Security            │
│  ──────────────    │         │  ────────────        │
│ • UsuarioService   │◄────────┤ • JwtProvider        │
│ • EventoService    │         │ • SecurityConfig     │
│ • CompraService    │         │ • BCrypt             │
│ • QRService        │         │                      │
│ • Transferencia    │         └──────────────────────┘
│   Service          │
└──────────┬─────────┘
           │
           │ (Validaciones, lógica de negocio)
           │
    ┌──────┴──────────────┐
    ▼                     ▼
┌────────────────────┐  ┌──────────────────┐
│  Repositories      │  │  DTOs            │
│  ──────────────    │  │  ────────────    │
│ • UsuarioRepository│  │ • LoginRequest   │
│ • EventoRepository │  │ • LoginResponse  │
│ • CompraRepository │  │ • Registro...    │
│ • QRRepository     │  └──────────────────┘
│ • Etc...           │
└──────────┬─────────┘
           │
           │ (Acceso a datos con JPA/Hibernate)
           │
         ┌─┴────────────────────────────────┐
         ▼                                  ▼
    ┌─────────────┐            ┌──────────────────────┐
    │  Entities   │            │  PostgreSQL 12+      │
    │  ────────   │◄───────────│  ────────────────    │
    │ • Usuario   │            │ • 13 Tablas          │
    │ • Evento    │            │ • 12 Relaciones FK   │
    │ • Compra    │            │ • 10 Índices         │
    │ • QR        │            │ • Constraints        │
    │ • Etc...    │            │ • Triggers (opt)     │
    └─────────────┘            └──────────────────────┘
         (ORM)                     (Base de Datos)
```

---

## Flujo de Autenticación

```
┌─────────┐
│ Cliente │
└────┬────┘
     │ POST /api/auth/login
     │ {email, password}
     ▼
┌──────────────────┐
│ AuthController   │
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ UsuarioService   │
│ .validarCredenc. │
└────┬─────────────┘
     │
     ▼
┌────────────────────────────┐
│ UsuarioRepository          │
│ .findByEmail(email)        │
└────┬───────────────────────┘
     │
     ▼
   [ BD ]
     │
     ▼
┌────────────────────────────┐
│ BCrypt.matches()           │
│ password vs password_hash  │
└────┬───────────────────────┘
     │ ✓ OK
     ▼
┌──────────────────┐
│ JwtProvider      │
│ .generateToken() │
└────┬─────────────┘
     │ token = jwt
     ▼
┌──────────────────┐
│ LoginResponse    │
│ {token, rol}     │
└────┬─────────────┘
     │
     ▼
┌─────────┐
│ Cliente │
│ (token) │
└─────────┘
```

---

## Flujo de Compra de Entradas

```
┌──────────┐
│ General  │ (Usuario especiador)
└────┬─────┘
     │ POST /api/compra
     │ {evento_id, sector_id, cantidad}
     ▼
┌───────────────────┐
│ CompraController  │
└────┬──────────────┘
     │
     ▼
┌────────────────────────┐
│ CompraService          │
│ .crearCompra()         │
└────┬───────────────────┘
     │
     ├─► EventoRepository.findById()
     │   [ Verificar que existe evento ]
     │
     ├─► SectorRepository.findById()
     │   [ Verificar capacidad sector ]
     │
     ├─► EntradaRepository
     │   .findByEventoAndSectorAndEstado(DISPONIBLE)
     │   [ Obtener N entradas ]
     │
     ├─► Validar: 1 <= cantidad <= 5
     │
     ├─► Calcular:
     │   - costo = precio * comision
     │   - monto_total = costo * cantidad
     │
     ├─► CompraRepository.save(compra)
     │   [ Crear compra con estado PENDIENTE ]
     │
     └─► Transaccionalidad: Si falla, rollback automático
         (Spring @Transactional)
     ▼
┌──────────────────────┐
│ Compra creada        │
│ - Estado: PENDIENTE  │
│ - Cantidad: N        │
│ - Monto: XXX         │
└──────────────────────┘
```

---

## Flujo de Validación de QR

```
┌──────────────┐
│ Funcionario  │ (Con dispositivo lector)
└────┬─────────┘
     │ POST /api/qr/validar
     │ {qr_code}
     ▼
┌─────────────────┐
│ QRController    │
└────┬────────────┘
     │
     ▼
┌──────────────────┐
│ QRService        │
│ .consumirQR()    │
└────┬─────────────┘
     │
     ├─► QRRepository.findByCodigo()
     │   [ Buscar QR en BD ]
     │
     ├─► Validar:
     │   - ¿QR existe?
     │   - ¿QR no fue consumido?
     │   - ¿Fecha evento <= hoy?
     │
     ├─► Actualizar QR:
     │   - consumida = true
     │   - fecha_consumo = ahora
     │   - validado_por = funcionario_id
     │
     ├─► Actualizar Entrada:
     │   - estado = CONSUMIDA
     │
     └─► DispositivoRepository
         .findById(dispositivo_id)
         [ Registrar en dispositivo ]
     ▼
┌─────────────────────┐
│ Respuesta:          │
│ ✓ Entrada validada  │
│ - Usuario: XXX      │
│ - Entrada: XXX      │
│ - Evento: XXX       │
└─────────────────────┘
```

---

## Relaciones de Base de Datos

```
USUARIO (Superclase)
  │
  ├─► ADMINISTRADOR (legajo, fecha_asig_cargo, etc.)
  │
  ├─► FUNCIONARIO (legajo, fecha_asig_cargo, etc.)
  │   └─► validado_por: QR
  │   └─► Dispositivo
  │
  └─► GENERAL (espectador)
      └─► Compra (1:N)
      │   └─► Entrada (N:M via CompraEntrada)
      │       └─► Evento (N:1)
      │       └─► Sector (N:1)
      │       └─► QR (1:1)
      │           └─► Dispositivo (0:1)
      │
      └─► Transferencia (N:M)
          ├─► remitente_id: GENERAL
          ├─► destinatario_id: GENERAL
          └─► Entrada (N:M via TransferenciaEntrada)

EVENTO (Partido)
  ├─► Estadio (N:1)
  ├─► Equipo1 (N:1)
  ├─► Equipo2 (N:1)
  └─► Sector (1:N)
      ├─► cantidad_disponible
      ├─► precio
      └─► Entrada (1:N)

ESTADIO
  └─► Sector (1:N)

COMPRA
  └─► Entrada (N:M) via tabla CompraEntrada

TRANSFERENCIA
  └─► Entrada (N:M) via tabla TransferenciaEntrada
```

---

## Flujo de Solicitud HTTP típico

```
┌─────────────────────────────────────────────────────────────┐
│ REQUEST HTTPP desde cliente                                  │
├─────────────────────────────────────────────────────────────┤
│ POST /api/compra/crear                                       │
│ Authorization: Bearer eyJhbGciOiJIUzI1NiIs...               │
│ Content-Type: application/json                              │
│                                                              │
│ {                                                            │
│   "evento_id": 1,                                            │
│   "sector_id": 1,                                            │
│   "cantidad": 3                                              │
│ }                                                            │
└──────────────┬──────────────────────────────────────────────┘
               │
     ┌─────────▼──────────┐
     │ Security Filter    │
     │ - Extraer JWT      │
     │ - Validar firma    │
     │ - Obtener usuario  │
     └─────────┬──────────┘
               │
     ┌─────────▼──────────────┐
     │ Router / Dispatcher    │
     │ POST → CompraController│
     │ .crearCompra()         │
     └─────────┬──────────────┘
               │
     ┌─────────▼──────────────┐
     │ CompraController       │
     │ - Validar entrada      │
     │ - Inyectar servicio    │
     │ - Llamar servicio      │
     └─────────┬──────────────┘
               │
     ┌─────────▼──────────────┐
     │ CompraService          │
     │ - Validar cantidad     │
     │ - Calcular monto       │
     │ - Guardar en BD        │
     └─────────┬──────────────┘
               │
     ┌─────────▼──────────────┐
     │ CompraRepository       │
     │ - INSERT en compra     │
     └─────────┬──────────────┘
               │
     ┌─────────▼──────────────┐
     │ PostgreSQL             │
     │ - Transacción          │
     │ - Persistencia         │
     └─────────┬──────────────┘
               │
     ┌─────────▼──────────────┐
     │ Respuesta exitosa      │
     │ HTTP 200 OK            │
     │ {                      │
     │   "id": 123,           │
     │   "estado": "PENDIENTE"│
     │   "monto": 300.00      │
     │ }                      │
     └────────────┬───────────┘
                  │
        ┌─────────▼────────────┐
        │ Cliente recibe JSON  │
        │ Actualiza interfaz   │
        │ Muestra confirmación │
        └──────────────────────┘
```

---

## Seguridad - Token JWT

```
Header:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
         └─ {alg: "HS256", typ: "JWT"}

Payload: eyJzdWIiOiJqdWFuQGV4YW1wbGUuY29tIiwicm9sIjoiR0VORVJBTCJ9
         └─ {
              sub: "juan@example.com",
              rol: "GENERAL",
              iat: 1234567890,
              exp: 1234654290
            }

Signature: SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
          └─ HMAC-SHA256(
               secret="tu-super-secreto-key-aqui",
               message="header.payload"
             )

Verificación en cada request:
1. Extraer token del header Authorization
2. Dividir en header.payload.signature
3. Recalcular HMAC-SHA256(secret, header.payload)
4. Comparar con signature recibida
5. Validar que exp > ahora
6. Extraer claims (email, rol)
```

---

## Entity Relationship Diagram (MER)

```
                    ┌─────────────┐
                    │  USUARIO    │
                    │ (Superclass)│
                    └──────┬──────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────▼──────┐  ┌──────▼───────┐  ┌────▼────────┐
    │ADMINISTRADOR│  │ FUNCIONARIO  │  │  GENERAL    │
    │   (admin)   │  │(oficial)     │  │(espectador) │
    └──────┬──────┘  └──────┬───────┘  └────┬────────┘
           │                │               │
           │                │         ┌─────┴─────┐
           │                │         │           │
           │            ┌───▼────┐   ▼           ▼
           │            │COMPRA  │   COMPRA    TRANSFER
           │            │(1:N)   │   (N:M)     (N:M)
           │            └───┬────┘   │ Entrada  │ Entrada
           │                │        │  (PK:id) │ (PK:id)
           │                │        └────┬─────┘
           │                │             │
           │                ▼             ▼
           │            ┌─────────────────────────┐
           │            │     ENTRADA (Ticket)    │
           │            │  - id (PK)              │
           │            │  - evento_id (FK)       │
           │            │  - sector_id (FK)       │
           │            │  - estado (DISPONIBLE)  │
           │            │  - qr_id (FK)           │
           │            └─────┬─────────────┬─────┘
           │                  │             │
           │            ┌─────▼─┐       ┌──▼──────┐
           │            │ EVENTO │       │   QR    │
           │            │(Partido)       │  (1:1)  │
           │            └─────┬─┘        └──┬──────┘
           │                  │             │
           │            ┌─────▼──────┐  ┌──▼───────────┐
           │            │  ESTADIO   │  │  DISPOSITIVO │
           │            │  (1:N)     │  │ (lector QR)  │
           │            └────────────┘  └──────────────┘
           │
           └─────────────────────────────────────────┘
                  (Todos heredan de USUARIO)
```

---

## Stack Tecnológico Resumido

```
Frontend Layer:
├─ Angular / React / Vue (TBD)
└─ Comunicación: REST API / JSON

Backend Layer:
├─ Spring Boot 3.1.5
├─ Spring Data JPA
├─ Spring Security (JWT)
├─ Lombok
├─ ZXing (QR Generation)
└─ JJWT (Token Handling)

Database Layer:
├─ PostgreSQL 12+
├─ JDBC Driver
├─ Connection Pooling (HikariCP)
└─ JPA/Hibernate ORM

Deployment:
├─ Java 17 Runtime
├─ Tomcat Embedded (Spring Boot)
├─ Maven Build Tool
└─ Docker (opcional)
```

---

**Última actualización**: 2026-06-17  
**Versión**: 1.0.0-SNAPSHOT  
**Autor**: Copilot CLI
