# ⚡ Inicio Rápido - Backend Spring Boot

## 🚀 En 5 Minutos (después de instalar dependencias)

### 1️⃣ Instalar dependencias (Primera vez solamente)

**Windows:**
```powershell
# Descargar e instalar desde:
# Java 17: https://www.oracle.com/java/technologies/downloads/
# Maven: https://maven.apache.org/
# PostgreSQL: https://www.postgresql.org/
```

**Verificar instalación:**
```powershell
java -version
mvn --version
psql --version
```

---

### 2️⃣ Preparar Base de Datos

**Opción A: Usando psql (recomendado)**
```powershell
# 1. Conectarse como admin
psql -U postgres

# 2. Ejecutar en la terminal:
CREATE DATABASE mundial_2026;
\c mundial_2026
```

Copiar todo el contenido de `src/main/resources/schema.sql` y pegar en psql.

**Opción B: Script directo**
```powershell
# Desde carpeta backend:
psql -U postgres -d mundial_2026 < src/main/resources/schema.sql
```

---

### 3️⃣ Configurar aplicación

Editar `src/main/resources/application.properties`:

```properties
# Cambiar contraseña si es necesario:
spring.datasource.username=postgres
spring.datasource.password=postgres

# Cambiar JWT secret (cualquier string largo):
app.jwt.secret=mi-super-secreto-key-de-256-bits-minimo-aqui
```

---

### 4️⃣ Compilar y ejecutar

```powershell
cd C:\Users\lucab\Desktop\UCU\BDII\obligatorio-bdII\backend

# Compilar
mvn clean install

# Ejecutar
mvn spring-boot:run
```

Deberías ver: `Tomcat started on port(s): 8080`

---

### 5️⃣ Probar API

```powershell
# Health check
curl http://localhost:8080/

# Registrar usuario
curl -X POST http://localhost:8080/api/auth/registro/espectador `
  -H "Content-Type: application/json" `
  -d '{
    "nombre":"Juan",
    "apellido":"Perez",
    "email":"juan@example.com",
    "password":"Test123!",
    "pais_documento":"AR",
    "nro_documento":"12345678",
    "documento_tipo":"DNI"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"juan@example.com","password":"Test123!"}'
```

---

## 📚 Documentación Completa

1. **README.md** - Setup inicial
2. **SETUP_WINDOWS.md** - Instalación detallada
3. **ARQUITECTURA.md** - Diagramas y flujos
4. **ENDPOINTS.md** - Todos los endpoints
5. **ROADMAP.md** - Fases de desarrollo
6. **VERIFICACION.md** - Checklist

---

## ⚠️ Problemas Comunes

| Problema | Solución |
|----------|----------|
| mvn not found | Agregar Maven a PATH |
| Cannot connect to DB | Verificar PostgreSQL está corriendo |
| Table doesn't exist | Ejecutar schema.sql en la BD |
| Port 8080 in use | Cambiar `server.port=8081` |

---

## 📊 Resultado esperado

```
Startup in 3.456 seconds (JVM running for 4.123)
Started MundialApplication in 3.456 seconds (JVM running for 4.123)
Tomcat started on port(s): 8080 (http)
```

---

**¡Listo!** Tu backend está corriendo en `http://localhost:8080`

Consulta **ENDPOINTS.md** para conocer todos los endpoints disponibles.
