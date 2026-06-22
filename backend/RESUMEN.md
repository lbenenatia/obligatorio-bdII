# 📱 Backend - Sistema de Gestión Mundial 2026

**Arquitectura:** Spring Boot 3.1.5 + PostgreSQL 12+ + JWT

---

## ✅ COMPLETADO

### Base de Datos
- ✅ **schema.sql** - Esquema completo con todas las tablas según MER
- ✅ **Tablas de herencia** - USUARIO (padre), ADMINISTRADOR, FUNCIONARIO, GENERAL
- ✅ **Relaciones** - FK correctas con RESTRICT/CASCADE
- ✅ **Índices** - Optimización en queries frecuentes
- ✅ **Constraints** - Validaciones de dominio (códigos A-D, rangos, etc.)

### Configuración Spring Boot
- ✅ **pom.xml** - Todas las dependencias necesarias
- ✅ **application.properties** - Configuración BD, JWT, logging
- ✅ **SecurityConfig** - Bean PasswordEncoder BCrypt
- ✅ **MundialApplication** - Clase principal con @EnableScheduling

### Entidades JPA (Mapeo ORM)
- ✅ **Usuario** - Superclase con estrategia JOINED
- ✅ **Administrador, Funcionario, General** - Subclases heredadas
- ✅ **Estadio, Equipo, Evento, Sector**
- ✅ **Entrada, Compra, Transferencia, QR, Dispositivo**
- ✅ **Relaciones N:M** - Compra-Entrada, Transferencia-Entrada
- ✅ **Anotaciones** - @ManyToOne, @OneToOne, @ManyToMany con FetchType
- ✅ **Herencia** - @Inheritance(strategy = InheritanceType.JOINED)

### Repositorios Spring Data
- ✅ **UsuarioRepository** - findByEmail, findByNroDocumento
- ✅ **EstadioRepository, EquipoRepository, EventoRepository**
- ✅ **SectorRepository, EntradaRepository, CompraRepository**
- ✅ **TransferenciaRepository, DispositivoRepository, QRRepository**
- ✅ **Métodos derivados** - JPA genera SQL automáticamente

### Servicios (Lógica de Negocio)
- ✅ **UsuarioService** - Crear usuarios, validar credenciales, encriptar contraseñas
- ✅ **EventoService** - Crear, aprobar, cancelar eventos
- ✅ **CompraService** - Compra de entradas con validación de cantidad
- ✅ **QRService** - Generar QR, obtener imagen Base64, consumir entrada
- ✅ **TransferenciaService** - Transferencia entre usuarios (requiere aprobación)
- ✅ **Validaciones** - Restricciones del MER (1-5 entradas, 1-3 transferencias)

### Seguridad & Autenticación
- ✅ **JwtProvider** - Generar tokens con rol y email
- ✅ **Validación JWT** - Usando jjwt con HMAC512
- ✅ **PasswordEncoder** - BCrypt con salt
- ✅ **Roles** - ADMINISTRADOR, FUNCIONARIO, GENERAL

### Controllers REST
- ✅ **AuthController** - login, registro/espectador, validate
- ✅ **EstadioController** - CRUD completo
- ✅ **EventoController** - Crear, listar, aprobar, cancelar
- ✅ **CompraController** - Crear compra, confirmar, pagar
- ✅ **QRController** - Generar QR, obtener imagen, validar
- ✅ **CORS** - Habilitado para frontend

### Extras
- ✅ **QR Code** - Generación con Google Zxing
- ✅ **README.md** - Guía de setup completa
- ✅ **.gitignore** - Configuración correcta

---

## 🎯 PRÓXIMOS PASOS (Opcionales)

### Phase 1 - Controladores Faltantes
- [ ] **TransferenciaController** - POST crear, GET listar, POST aprobar
- [ ] **SectorController** - CRUD
- [ ] **EquipoController** - CRUD
- [ ] **DispositivoController** - Registrar dispositivo, autorizar
- [ ] **UsuarioController** - GET usuario, PUT actualizar, DELETE

### Phase 2 - Mecanismos Avanzados
- [ ] **Regeneración de QR cada 30 seg** - Usar @Scheduled o WebSocket
- [ ] **Paginación** - Implementar `Pageable` en listados
- [ ] **Validación de entradas** - @Valid en DTOs
- [ ] **Manejo global de errores** - @ControllerAdvice y @ExceptionHandler
- [ ] **Auditoría** - @CreationTimestamp, @UpdateTimestamp

### Phase 3 - Testing & Deployment
- [ ] **Tests unitarios** - JUnit 5 + Mockito
- [ ] **Tests integración** - @SpringBootTest
- [ ] **Cobertura** - JaCoCo
- [ ] **Docker** - Dockerfile + docker-compose.yml
- [ ] **Swagger** - Documentación OpenAPI

### Phase 4 - Rendimiento
- [ ] **Caché** - Redis o Caffeine
- [ ] **Índices adicionales** - Analizar queries lentas
- [ ] **Lazy loading** - Revisar FetchType en relaciones
- [ ] **Logs** - ELK Stack o Splunk

---

## 📊 RESUMEN TÉCNICO

### Base de Datos
```
Tablas: 13
Relaciones: 12 (FK)
Índices: 10
Constraints: 15+
Motor: PostgreSQL 12+
```

### Backend
```
Lenguaje: Java 17
Framework: Spring Boot 3.1.5
ORM: JPA/Hibernate
Seguridad: JWT + BCrypt
BD: PostgreSQL
Puerto: 8080
```

### Estructura de Código
```
Clases: 25+
- 4 Entidades usuario
- 10 Otras entidades
- 9 Repositorios
- 5 Servicios
- 5 Controllers
- 2 Config + Security
- 3 DTOs + Exceptions
```

---

## 🚀 COMANDOS RÁPIDOS

### Setup BD
```bash
psql -U postgres -d mundial_2026 -f src/main/resources/schema.sql
```

### Compilar
```bash
mvn clean install
```

### Ejecutar
```bash
mvn spring-boot:run
```

### Tests
```bash
mvn test
```

### Build JAR
```bash
mvn clean package
```

---

## 📝 NOTAS IMPORTANTES

1. **Herencia en JPA**: Usando `JOINED` strategy → tablas separadas por tipo de usuario
2. **Computa**: La comisión ya está en el campo `Compra.comision` (10% default)
3. **QR Consumo**: Una vez `consumida=true`, la entrada pasa a estado `CONSUMIDA`
4. **Transferencias**: Requieren aprobación de administrador (`aprobacion` flag)
5. **Cantidad**: 
   - Entradas: 1-5 (constraint CHECK)
   - Transferencias: 1-3 (constraint CHECK)

---

## 🔐 Seguridad

- ✅ Contraseñas hasheadas con BCrypt
- ✅ JWT con secreto de 256 bits
- ✅ Validación de email único
- ✅ Documento único por usuario
- ✅ CORS habilitado (localhost en dev)

---

**Creado**: 2026-06-17  
**Versión**: 1.0.0-SNAPSHOT  
**Autor**: Copilot CLI
