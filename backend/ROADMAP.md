# 🗺️ Roadmap de Desarrollo - Backend

## 📊 Fases de Desarrollo

### ✅ Phase 1: Setup Inicial (COMPLETADO)
- [x] Estructura Maven
- [x] Configuración Spring Boot
- [x] Schema SQL completo
- [x] Entidades JPA
- [x] Repositorios
- [x] Servicios base
- [x] Controllers base
- [x] Seguridad JWT
- [x] Documentación

**Estado:** LISTO PARA COMPILAR

---

### 🔄 Phase 2: Validación & Testing (PRÓXIMA)

#### 2.1 Compilación & Ejecución
- [x] Instalar Java 17
- [x] Instalar Maven 3.8+
- [x] Crear BD mundial_2026 en PostgreSQL
- [x] Ejecutar schema.sql
- [x] `mvn clean install`
- [ ] `mvn spring-boot:run`
- [ ] Verificar logs: "Tomcat started on port 8080"

#### 2.2 Pruebas Manuales (cURL)
```bash
# Test 1: Health check
curl http://localhost:8080/

# Test 2: Registrar usuario espectador
curl -X POST http://localhost:8080/api/auth/registro/espectador \
  -H "Content-Type: application/json" \
  -d '{
    "email":"juan@example.com",
    "nombre":"Juan",
    "apellido":"Pérez",
    "password":"Test123!",
    "pais_documento":"AR",
    "nro_documento":"12345678",
    "documento_tipo":"DNI"
  }'

# Test 3: Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@example.com","password":"Test123!"}'

# Test 4: Obtener token e ir a BD para verificar
# SELECT * FROM usuario WHERE email='juan@example.com';
```

#### 2.3 Verificaciones de BD
- [ ] Verificar tablas creadas correctamente
- [ ] Verificar usuario creado en tabla usuario
- [ ] Verificar tipo_usuario = 'GENERAL'
- [ ] Verificar contraseña hasheada (no en texto plano)
- [ ] Verificar índices creados
- [ ] Verificar constraints activos

---

### 🎯 Phase 3: Controllers Faltantes (DESPUÉS DE VALIDAR)

#### 3.1 TransferenciaController
```java
POST   /api/transferencia/crear
POST   /api/transferencia/{id}/aprobar
POST   /api/transferencia/{id}/rechazar
GET    /api/transferencia/pendientes
GET    /api/transferencia/{id}
```

#### 3.2 SectorController
```java
POST   /api/sector
GET    /api/sector/{id}
GET    /api/sector/estadio/{estadio_id}
PUT    /api/sector/{id}
DELETE /api/sector/{id}
```

#### 3.3 EquipoController
```java
POST   /api/equipo
GET    /api/equipo/{id}
GET    /api/equipo
PUT    /api/equipo/{id}
DELETE /api/equipo/{id}
```

#### 3.4 DispositivoController
```java
POST   /api/dispositivo/registrar
GET    /api/dispositivo/{id}
PUT    /api/dispositivo/{id}/autorizar
DELETE /api/dispositivo/{id}
```

#### 3.5 UsuarioController
```java
GET    /api/usuario/{id}
GET    /api/usuario/email/{email}
PUT    /api/usuario/{id}
DELETE /api/usuario/{id}
POST   /api/usuario/{id}/cambiar-password
```

---

### 🛡️ Phase 4: Validaciones & Excepciones

#### 4.1 Validaciones en DTOs
- [ ] Agregar anotaciones `@Valid`
- [ ] `@NotEmpty`, `@Email`, `@Size`
- [ ] Validadores custom (ej: nro_documento único)
- [ ] Mensajes de error en español

#### 4.2 Global Exception Handler
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handle404() { ... }
    
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<?> handle409() { ... }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation() { ... }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handle500() { ... }
}
```

#### 4.3 Tests de validaciones
- [ ] Test: email inválido
- [ ] Test: cantidad > 5
- [ ] Test: transferencia > 3
- [ ] Test: sector código invalid
- [ ] Test: fecha evento en el pasado

---

### 📄 Phase 5: Documentación API (Swagger)

#### 5.1 Agregar Springdoc OpenAPI
```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.0.4</version>
</dependency>
```

#### 5.2 Anotar Controllers
- [ ] `@Operation` en cada método
- [ ] `@Parameter` en parámetros
- [ ] `@ApiResponse` con ejemplos
- [ ] Descripciones en español

#### 5.3 Acceso
```
http://localhost:8080/swagger-ui.html
http://localhost:8080/v3/api-docs
```

---

### 🧪 Phase 6: Testing

#### 6.1 Unit Tests (JUnit 5 + Mockito)
```
src/test/java/com/mundial2026/
├── service/
│   ├── UsuarioServiceTest.java
│   ├── QRServiceTest.java
│   ├── CompraServiceTest.java
│   ├── EventoServiceTest.java
│   └── TransferenciaServiceTest.java
└── controller/
    ├── AuthControllerTest.java
    ├── CompraControllerTest.java
    └── QRControllerTest.java
```

#### 6.2 Integration Tests
```
├── integration/
│   ├── AuthControllerIntegrationTest.java
│   ├── CompraFlowIntegrationTest.java
│   └── QRValidationIntegrationTest.java
```

#### 6.3 Test Coverage
- [ ] `mvn clean test`
- [ ] Cobertura > 70%
- [ ] JaCoCo report: `target/site/jacoco/index.html`

---

### 🚀 Phase 7: Optimización & Performance

#### 7.1 Caching
- [ ] Agregar Spring Cache
- [ ] Cachear consultas frecuentes (estadios, equipos)
- [ ] `@Cacheable` en métodos
- [ ] `@CacheEvict` en modificaciones

#### 7.2 Índices BD
- [ ] Analizar queries lentas con EXPLAIN
- [ ] Agregar índices faltantes
- [ ] Validar n+1 queries

#### 7.3 Lazy Loading
- [ ] Revisar FetchType en relaciones
- [ ] Usar `@EntityGraph` para optimizar queries
- [ ] Profiling: Spring Boot Actuator

---

### 📦 Phase 8: Deployment

#### 8.1 Dockerización
```dockerfile
FROM openjdk:17-slim
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

#### 8.2 docker-compose.yml
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:12
    environment:
      POSTGRES_DB: mundial_2026
      POSTGRES_PASSWORD: postgres
  backend:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - postgres
```

#### 8.3 Deployment checklist
- [ ] Build JAR sin tests
- [ ] Build imagen Docker
- [ ] Test con docker-compose
- [ ] Enviroment variables en producción
- [ ] SSL/TLS (HTTPS)
- [ ] Logs centralizados
- [ ] Monitoreo con Prometheus/Grafana

---

### 📱 Phase 9: Características Avanzadas

#### 9.1 WebSocket (QR Regeneración cada 30 seg)
```java
@Configuration
@EnableWebSocket
public class WebSocketConfig {
    // Implementar handler para actualizar QR en tiempo real
    // Cliente se suscribe a /topic/qr/{id}
    // Servidor envía nuevo QR cada 30 segundos
}
```

#### 9.2 Notificaciones
- [ ] Email: confirmación de compra
- [ ] Email: transferencia aprobada/rechazada
- [ ] Push: cambios en eventos

#### 9.3 Reportes
- [ ] Estadísticas de entradas vendidas
- [ ] Ingresos por sector
- [ ] Transferencias por estado
- [ ] Actividad de usuarios

---

## 🎯 Checklist por Sprint

### Sprint 1 (Semana 1): Setup + Validación
```
[ ] Instalar dependencias (Java, Maven, PostgreSQL)
[ ] Crear BD e importar schema.sql
[ ] Compilar con mvn clean install
[ ] Ejecutar mvn spring-boot:run
[ ] Pruebas manuales con cURL
[ ] Verificar BD con psql
[ ] Documentar cualquier problema encontrado
```

### Sprint 2 (Semana 2): Controllers + Validaciones
```
[ ] Implementar TransferenciaController
[ ] Implementar SectorController
[ ] Agregar validaciones a DTOs
[ ] Crear GlobalExceptionHandler
[ ] Escribir tests para validaciones
[ ] Documentar cambios en CAMBIOS.md
```

### Sprint 3 (Semana 3): Testing + Documentación
```
[ ] Escribir unit tests
[ ] Escribir integration tests
[ ] Agregar Swagger/OpenAPI
[ ] Ejecutar mvn test
[ ] Generar reporte de cobertura
[ ] Documentación final
```

### Sprint 4 (Semana 4): Deployment
```
[ ] Crear Dockerfile
[ ] Crear docker-compose.yml
[ ] Test con Docker
[ ] Setup en servidor
[ ] Monitoreo en producción
[ ] Demo final
```

---

## 📈 Métricas de Éxito

| Métrica | Meta | Estado |
|---------|------|--------|
| Compilación exitosa | ✓ | ⏳ |
| Todas las tablas creadas | ✓ | ⏳ |
| Login funciona | ✓ | ⏳ |
| Compra de entradas funciona | ✓ | ⏳ |
| QR se genera correctamente | ✓ | ⏳ |
| Cobertura de tests | > 70% | ⏳ |
| Documentación API | 100% | ⏳ |
| Demo en producción | ✓ | ⏳ |

---

## 📞 Soporte & Documentación

- **README.md** - Setup inicial
- **SETUP_WINDOWS.md** - Instalación de dependencias
- **ARQUITECTURA.md** - Diagramas y flujos
- **RESUMEN.md** - Resumen del proyecto

---

**Última actualización**: 2026-06-17  
**Próxima revisión**: Después de Phase 2  
**Responsable**: Equipo de desarrollo
