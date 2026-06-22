# 📁 Estructura de Carpetas - Backend Spring Boot

```
backend/
│
├── 📄 pom.xml
│   └── Configuración Maven con todas las dependencias
│
├── 📄 .gitignore
│   └── Archivos a ignorar en Git
│
├── 📚 Documentación/
│   ├── README.md                    ← EMPIEZA AQUÍ
│   ├── INICIO_RAPIDO.md            ← 5 minutos para ejecutar
│   ├── SETUP_WINDOWS.md            ← Instalación paso a paso
│   ├── ARQUITECTURA.md             ← Diagramas y flujos
│   ├── ENDPOINTS.md                ← API documentation
│   ├── ROADMAP.md                  ← Plan de desarrollo
│   ├── VERIFICACION.md             ← Checklist
│   ├── RESUMEN.md                  ← Resumen ejecutivo
│   └── ESTRUCTURA.md               ← Este archivo
│
└── src/
    │
    ├── main/
    │   │
    │   ├── java/com/mundial2026/
    │   │   │
    │   │   ├── MundialApplication.java
    │   │   │   └── Punto de entrada Spring Boot
    │   │   │
    │   │   ├── 🏛️ entity/              (13 entidades JPA)
    │   │   │   ├── usuario/
    │   │   │   │   ├── Usuario.java          (superclase)
    │   │   │   │   ├── Administrador.java
    │   │   │   │   ├── Funcionario.java
    │   │   │   │   └── General.java
    │   │   │   │
    │   │   │   ├── Estadio.java
    │   │   │   ├── Equipo.java
    │   │   │   ├── Evento.java
    │   │   │   ├── Sector.java
    │   │   │   ├── Entrada.java
    │   │   │   ├── Compra.java
    │   │   │   ├── Transferencia.java
    │   │   │   ├── QR.java
    │   │   │   └── Dispositivo.java
    │   │   │
    │   │   ├── 🔌 repository/         (10 repositorios)
    │   │   │   ├── UsuarioRepository.java
    │   │   │   ├── EstadioRepository.java
    │   │   │   ├── EquipoRepository.java
    │   │   │   ├── EventoRepository.java
    │   │   │   ├── SectorRepository.java
    │   │   │   ├── EntradaRepository.java
    │   │   │   ├── CompraRepository.java
    │   │   │   ├── TransferenciaRepository.java
    │   │   │   ├── DispositivoRepository.java
    │   │   │   └── QRRepository.java
    │   │   │
    │   │   ├── 🎯 service/            (5 servicios)
    │   │   │   ├── UsuarioService.java
    │   │   │   ├── EventoService.java
    │   │   │   ├── CompraService.java
    │   │   │   ├── QRService.java
    │   │   │   └── TransferenciaService.java
    │   │   │
    │   │   ├── 🌐 controller/         (5 controllers)
    │   │   │   ├── AuthController.java
    │   │   │   ├── EstadioController.java
    │   │   │   ├── EventoController.java
    │   │   │   ├── CompraController.java
    │   │   │   └── QRController.java
    │   │   │
    │   │   ├── 🔐 security/           (Autenticación)
    │   │   │   └── JwtProvider.java
    │   │   │
    │   │   ├── ⚙️ config/              (Configuración)
    │   │   │   └── SecurityConfig.java
    │   │   │
    │   │   ├── 📦 dto/                (Data Transfer Objects)
    │   │   │   └── AuthDtos.java
    │   │   │
    │   │   └── ❌ exception/           (Manejo de errores)
    │   │       └── GlobalExceptions.java
    │   │
    │   └── resources/
    │       ├── application.properties
    │       │   └── Configuración de Spring Boot
    │       │       - Database connection
    │       │       - JWT settings
    │       │       - Logging levels
    │       │
    │       └── schema.sql
    │           └── Esquema PostgreSQL (13 tablas)
    │               - USUARIO (superclase)
    │               - ADMINISTRADOR, FUNCIONARIO, GENERAL
    │               - ESTADIO, EQUIPO, EVENTO
    │               - SECTOR, ENTRADA, COMPRA
    │               - TRANSFERENCIA, QR, DISPOSITIVO
    │
    └── test/
        └── java/com/mundial2026/
            └── (Tests unitarios - POR IMPLEMENTAR)
```

---

## 📊 Resumen de Archivos

### Configuración (2)
- `pom.xml` - Dependencias Maven
- `application.properties` - Configuración Spring Boot

### Documentación (8)
- `README.md` - Guía principal
- `INICIO_RAPIDO.md` - Quick start
- `SETUP_WINDOWS.md` - Instalación Windows
- `ARQUITECTURA.md` - Diagramas
- `ENDPOINTS.md` - API docs
- `ROADMAP.md` - Plan desarrollo
- `VERIFICACION.md` - Checklist
- `RESUMEN.md` - Resumen ejecutivo

### Código Java (38 archivos)

#### Entidades JPA (13)
- 1 Superclase Usuario
- 3 Subclases (Admin, Funcionario, General)
- 9 Entidades de dominio

#### Repositorios (10)
- 1 por cada entidad principal

#### Servicios (5)
- UsuarioService
- EventoService
- CompraService
- QRService
- TransferenciaService

#### Controllers (5)
- AuthController (login, registro, validación)
- EstadioController (CRUD)
- EventoController (CRUD + aprobación)
- CompraController (CRUD + payment)
- QRController (generación, validación)

#### Soporte (7)
- 2 Security/Config
- 1 DTO
- 1 Exceptions
- 3 Otros

### Base de Datos (1)
- `schema.sql` - 13 tablas, 12 FKs, 10 índices

---

## 🔄 Flujo de Datos

```
Cliente (Browser/Mobile)
    ↓
REST API (/api/*)
    ↓
@Controller (5 controllers)
    ↓
@Service (5 services - lógica de negocio)
    ↓
@Repository (10 repositories - JPA)
    ↓
@Entity (13 JPA entities - ORM)
    ↓
PostgreSQL Database (13 tables)
    ↓
⬅ Response en JSON
```

---

## 🎯 Entidades & Relaciones Rápido

```
USUARIO (Superclase)
 ├─ ADMINISTRADOR (subclase)
 ├─ FUNCIONARIO (subclase)
 │   └─> DISPOSITIVO (1:N)
 │   └─> QR.validado_por (1:N)
 │
 └─ GENERAL (subclase)
     ├─> COMPRA (1:N)
     │   ├─> Entrada (N:M)
     │   │   ├─> EVENTO (N:1)
     │   │   ├─> SECTOR (N:1)
     │   │   │   └─> ESTADIO (N:1)
     │   │   └─> QR (1:1)
     │   │
     │   └─> TRANSFERENCIA (1:N)
     │       ├─> Entrada (N:M)
     │       └─> destinatario: GENERAL (N:1)
     │
     └─> TRANSFERENCIA (1:N - como destinatario)

EVENTO
 ├─> ESTADIO (N:1)
 ├─> EQUIPO (N:1) x2 (equipo1, equipo2)
 ├─> SECTOR (1:N)
 └─> ENTRADA (1:N)
```

---

## 🚀 Tecnologías Utilizadas

```
Backend:
├─ Java 17
├─ Spring Boot 3.1.5
├─ Spring Data JPA
├─ Spring Security
├─ Lombok

Seguridad:
├─ JWT (JJWT 0.12.3)
├─ BCrypt
└─ CORS

QR:
└─ ZXing 3.5.1

Base de Datos:
├─ PostgreSQL 12+
├─ JDBC Driver
└─ Hibernate ORM

Build:
├─ Maven 3.8+
└─ Java 17

Testing (preparado):
├─ JUnit 5
└─ Mockito
```

---

## 📈 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| Archivos Java | 38 |
| Líneas de código | ~5000+ |
| Entidades JPA | 13 |
| Repositorios | 10 |
| Servicios | 5 |
| Controllers | 5 |
| Tablas SQL | 13 |
| Relaciones FK | 12 |
| Índices | 10 |
| Endpoints REST | 20+ |
| Documentación | 8 archivos |

---

## ✅ Estado del Proyecto

```
Fase 1 - Setup & Estructura:     ✅ 100% COMPLETADO
Fase 2 - Validación & Testing:   ⏳ PRÓXIMO
Fase 3 - Controllers Faltantes:  🔄 EN COLA
Fase 4 - Validaciones:           🔄 EN COLA
Fase 5 - Documentación API:      🔄 EN COLA
Fase 6 - Testing Completo:       🔄 EN COLA
Fase 7 - Optimización:           🔄 EN COLA
Fase 8 - Deployment:             🔄 EN COLA
```

---

## 🎓 Para Entender el Proyecto

1. **Empieza por**: `README.md`
2. **Setup**: `SETUP_WINDOWS.md`
3. **Ejecución**: `INICIO_RAPIDO.md`
4. **Arquitectura**: `ARQUITECTURA.md`
5. **API**: `ENDPOINTS.md`
6. **Desarrollo**: `ROADMAP.md`
7. **Verificación**: `VERIFICACION.md`

---

## 📞 Soporte

- Revisa la documentación incluida
- Verifica `SETUP_WINDOWS.md` si hay problemas
- Consulta `VERIFICACION.md` para troubleshooting
- Lee `ARQUITECTURA.md` para entender diseño

---

**Proyecto creado**: 2026-06-17  
**Versión**: 1.0.0-SNAPSHOT  
**Estado**: Listo para compilar y ejecutar  
**Siguiente**: Instalar Java, Maven, PostgreSQL
