# 🎯 Referencia Rápida - Backend Mundial 2026

## 📌 Archivos Más Importantes

| Archivo | Propósito | Editar? |
|---------|-----------|---------|
| **SETUP_WINDOWS.md** | Instalar Java, Maven, PostgreSQL | 📖 Leer |
| **INICIO_RAPIDO.md** | Ejecutar en 5 minutos | 📖 Leer |
| **ENDPOINTS.md** | Documentación API | 📖 Consultar |
| **pom.xml** | Dependencias Maven | ❌ No tocar |
| **application.properties** | Config BD y JWT | ✏️ Editar credenciales |
| **schema.sql** | Esquema BD PostgreSQL | ❌ Ejecutar en psql |

---

## ⚡ Comandos Más Usados

```powershell
# Compilar
cd backend
mvn clean install

# Ejecutar
mvn spring-boot:run

# Build JAR
mvn clean package -DskipTests

# Tests
mvn test

# Conectar a BD
psql -U postgres -d mundial_2026

# Crear BD
psql -U postgres -c "CREATE DATABASE mundial_2026;"
```

---

## 🔗 Endpoints Principales

```
POST   /api/auth/login                    → Login
POST   /api/auth/registro/espectador      → Registrar
GET    /api/auth/validate/{token}        → Validar token

POST   /api/evento                        → Crear evento
GET    /api/evento                        → Listar eventos
POST   /api/evento/{id}/aprobar          → Aprobar evento

POST   /api/compra                        → Crear compra
GET    /api/compra                        → Mis compras
POST   /api/compra/{id}/pagar            → Pagar compra

GET    /api/qr/{entrada_id}              → Obtener QR
POST   /api/qr/{codigo}/validar          → Validar QR
```

---

## 🔑 Valores por Defecto

```
Base de Datos:
- Host: localhost
- Puerto: 5432
- Usuario: postgres
- Contraseña: postgres
- Base: mundial_2026

Spring Boot:
- Puerto: 8080
- Context: /api
- JWT expiration: 24 horas

Roles:
- GENERAL (espectadores)
- FUNCIONARIO (validadores QR)
- ADMINISTRADOR (admin del sistema)
```

---

## 🐛 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| `mvn: command not found` | Instalar Maven y agregar a PATH |
| `Could not connect to database` | Verificar PostgreSQL está corriendo |
| `Table doesn't exist` | Ejecutar schema.sql en la BD |
| `Port 8080 already in use` | Cambiar `server.port=8081` |
| `JWT signature invalid` | Cambiar `app.jwt.secret` |
| `Password mismatch` | Usar nueva contraseña (BCrypt random) |

---

## 📚 Documentación por Necesidad

```
¿Qué quiero hacer?          → Lee este archivo
────────────────────────────────────────────────────────
Instalar dependencias        → SETUP_WINDOWS.md
Ejecutar en 5 minutos       → INICIO_RAPIDO.md
Entender la arquitectura    → ARQUITECTURA.md
Probar endpoints            → ENDPOINTS.md
Planificar desarrollo       → ROADMAP.md
Verificar completitud       → VERIFICACION.md
Ver estructura carpetas     → ESTRUCTURA.md
Resumen general             → README.md
Resumen ejecutivo           → RESUMEN.md
```

---

## ✅ Checklist Antes de Ejecutar

- [ ] Java 17 instalado: `java -version`
- [ ] Maven 3.8+ instalado: `mvn --version`
- [ ] PostgreSQL corriendo: `psql --version`
- [ ] BD creada: `mundial_2026`
- [ ] Schema importado: `\dt` en psql
- [ ] application.properties editado
- [ ] `mvn clean install` ejecutado exitosamente
- [ ] Sin errores de compilación

---

## 🔐 Credenciales de Ejemplo

```json
{
  "email": "juan@example.com",
  "password": "Test123!"
}
```

Para registrar: Ver `ENDPOINTS.md` → `/auth/registro/espectador`

---

## 📊 Estadísticas Rápidas

```
Código Java:        38 archivos
Entidades:          13
Repositorios:       10
Servicios:          5
Controllers:        5
Tablas BD:          13
Endpoints:          20+
Documentación:      9 archivos
Total de líneas:    5000+
```

---

## 🚀 Pasos Resumidos

1. **Instalar** (30 min)
   - Java 17, Maven, PostgreSQL

2. **Configurar BD** (5 min)
   - Crear DB
   - Ejecutar schema.sql

3. **Configurar App** (2 min)
   - Editar application.properties

4. **Compilar** (2 min)
   - `mvn clean install`

5. **Ejecutar** (1 min)
   - `mvn spring-boot:run`

6. **Probar** (5 min)
   - cURL o Postman

**Total: ~45 minutos**

---

## 💡 Tips Importantes

1. **Contraseñas**: Siempre hashed con BCrypt
2. **JWT**: Token válido por 24 horas
3. **QR**: Se regenera cada petición GET
4. **Compras**: 1-5 entradas máximo
5. **Transferencias**: 1-3 entradas máximo
6. **Sectores**: Códigos A, B, C, D
7. **Roles**: 3 tipos de usuarios
8. **BD**: 13 tablas con relaciones complejas

---

## 🔗 URLs Útiles

```
Spring Boot: https://spring.io/projects/spring-boot
Spring Data JPA: https://spring.io/projects/spring-data-jpa
JWT (JJWT): https://github.com/jwtk/jjwt
ZXing (QR): https://github.com/zxing/zxing
PostgreSQL: https://www.postgresql.org/
Maven: https://maven.apache.org/
```

---

## 🎓 Para Aprender Más

**Spring Boot:**
- `src/main/java/com/mundial2026/MundialApplication.java` (entry point)
- `src/main/java/com/mundial2026/controller/` (REST endpoints)
- `src/main/java/com/mundial2026/service/` (business logic)

**Database:**
- `src/main/resources/schema.sql` (DDL)
- `src/main/java/com/mundial2026/entity/` (JPA mapping)

**Security:**
- `src/main/java/com/mundial2026/security/JwtProvider.java` (JWT)
- `src/main/java/com/mundial2026/config/SecurityConfig.java` (config)

---

## 📞 Preguntas Frecuentes

**P: ¿Cómo cambio la contraseña de PostgreSQL?**
```sql
ALTER USER postgres WITH PASSWORD 'nueva-contraseña';
```

**P: ¿Dónde veo los logs?**
Consola cuando ejecutas `mvn spring-boot:run`

**P: ¿Cómo regenero datos?**
```sql
DELETE FROM usuario;
-- Las IDs se reinician si son AUTO_INCREMENT
```

**P: ¿Cómo pruebo sin frontend?**
```bash
curl http://localhost:8080/api/endpoint
# O usa Postman (interfaz gráfica)
```

**P: ¿Cómo agrego más controllers?**
Ver `ROADMAP.md` → Phase 3 (TransferenciaController, etc)

---

**Última actualización**: 2026-06-17  
**Versión**: 1.0.0-SNAPSHOT  
**Estado**: Listo para ejecutar
