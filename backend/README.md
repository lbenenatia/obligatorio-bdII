# GUÍA DE SETUP - BACKEND MUNDIAL 2026

## 1. REQUISITOS PREVIOS
- Java 17 o superior
- PostgreSQL 12+
- Maven 3.6+
- Git

## 2. CONFIGURACIÓN DE BASE DE DATOS

### Crear base de datos en PostgreSQL:

```sql
CREATE DATABASE mundial_2026 ENCODING 'UTF-8';
```

### Conectarse a la BD:
```bash
psql -U postgres -d mundial_2026
```

### Ejecutar el script schema.sql:
```bash
psql -U postgres -d mundial_2026 -f src/main/resources/schema.sql
```

## 3. CONFIGURACIÓN DE VARIABLES

Editar `src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/mundial_2026
spring.datasource.username=postgres
spring.datasource.password=tu_password_aqui

# JWT Secret (generar uno más seguro en producción)
app.jwt.secret=tunClaveSecretaMuyLargaYSeguraParaJWT12345678901234567890
app.jwt.expiration=86400000
```

## 4. COMPILAR Y EJECUTAR

### Compilar:
```bash
mvn clean install
```

### Ejecutar:
```bash
mvn spring-boot:run
```

El servidor estará disponible en: **http://localhost:8080/api**

## 5. ESTRUCTURA DEL PROYECTO

```
backend/
├── pom.xml                          # Dependencias Maven
├── src/main/
│   ├── java/com/mundial2026/
│   │   ├── MundialApplication.java  # Clase principal
│   │   ├── config/                  # Configuraciones
│   │   │   └── SecurityConfig.java
│   │   ├── entity/                  # Entidades JPA
│   │   │   ├── usuario/
│   │   │   │   ├── Usuario.java
│   │   │   │   ├── General.java
│   │   │   │   ├── Funcionario.java
│   │   │   │   └── Administrador.java
│   │   │   ├── Estadio.java
│   │   │   ├── Evento.java
│   │   │   ├── Entrada.java
│   │   │   ├── Compra.java
│   │   │   ├── Transferencia.java
│   │   │   ├── QR.java
│   │   │   ├── Dispositivo.java
│   │   │   └── Equipo.java
│   │   ├── repository/              # Repositorios JPA
│   │   │   ├── UsuarioRepository.java
│   │   │   ├── EstadioRepository.java
│   │   │   ├── EventoRepository.java
│   │   │   ├── EntradaRepository.java
│   │   │   ├── CompraRepository.java
│   │   │   ├── TransferenciaRepository.java
│   │   │   ├── QRRepository.java
│   │   │   └── ...
│   │   ├── service/                 # Servicios
│   │   │   ├── UsuarioService.java
│   │   │   ├── QRService.java
│   │   │   ├── CompraService.java
│   │   │   └── ...
│   │   ├── controller/              # Controladores REST
│   │   │   ├── AuthController.java
│   │   │   ├── EstadioController.java
│   │   │   └── ...
│   │   ├── security/                # Seguridad JWT
│   │   │   └── JwtProvider.java
│   │   ├── dto/                     # Data Transfer Objects
│   │   │   └── AuthDtos.java
│   │   └── exception/               # Excepciones
│   │       └── GlobalExceptions.java
│   └── resources/
│       ├── application.properties    # Configuración
│       └── schema.sql               # Script BD
```

## 6. API ENDPOINTS (Ejemplos)

### AUTENTICACIÓN
```
POST   /auth/login                    - Iniciar sesión
POST   /auth/registro/espectador      - Registrar espectador
GET    /auth/validate/{token}         - Validar JWT token
```

### ESTADIOS
```
GET    /estadios                      - Obtener todos
GET    /estadios/{id}                 - Obtener por ID
POST   /estadios                      - Crear nuevo
PUT    /estadios/{id}                 - Actualizar
DELETE /estadios/{id}                 - Eliminar
```

### ENTRADAS & COMPRAS
```
POST   /compras                       - Crear compra
GET    /compras/{id}                  - Obtener compra
POST   /compras/{id}/confirmar        - Confirmar compra
POST   /compras/{id}/pagar            - Marcar como pagada
```

### QR
```
GET    /qr/{codigoQR}/imagen          - Obtener imagen QR en Base64
POST   /qr/{codigoQR}/validar         - Escanear y validar QR
```

## 7. AUTENTICACIÓN (JWT)

### Flujo:
1. Usuario hace POST a `/auth/login` con email y contraseña
2. Backend devuelve un token JWT
3. Cliente envía el token en headers: `Authorization: Bearer {token}`
4. Backend valida el token antes de procesar la solicitud

## 8. PRÓXIMOS PASOS

- [ ] Crear más controladores (Eventos, Sectores, Compras, Transferencias)
- [ ] Implementar validaciones más robustas
- [ ] Agregar paginación en listados
- [ ] Crear tests unitarios
- [ ] Documentación con Swagger/OpenAPI
- [ ] Deploy a servidor (Docker recomendado)

## 9. CONTACTO Y SOPORTE

Para dudas sobre la arquitectura o implementación, revisar el MER y los comentarios en el código.

---
**Última actualización**: 2026-06-17
**Versión**: 1.0.0
