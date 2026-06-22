# 🚀 Setup en Windows - Backend Spring Boot

## 📋 Requisitos Previos

### 1️⃣ Java 17+
```powershell
# Verificar si está instalado
java -version

# Descargar desde: https://www.oracle.com/java/technologies/downloads/#java17
# O usar Chocolatey:
choco install openjdk17
```

### 2️⃣ Maven 3.8+
```powershell
# Descargar desde: https://maven.apache.org/download.cgi
# Extraer a: C:\Program Files\apache-maven-3.9.x

# Agregar a PATH:
# 1. Click derecho "Mi PC" → Propiedades
# 2. Variables de entorno → Nueva variable del sistema
# 3. MAVEN_HOME = C:\Program Files\apache-maven-3.9.x
# 4. Agregar a PATH: %MAVEN_HOME%\bin

# Verificar instalación:
mvn --version
```

### 3️⃣ PostgreSQL 12+
```powershell
# Descargar desde: https://www.postgresql.org/download/windows/
# O usar Chocolatey:
choco install postgresql12

# Durante instalación:
# - Password superuser: postgres (cambiar luego!)
# - Puerto: 5432
```

---

## 🗄️ Setup Base de Datos

### Opción A: Usando pgAdmin (GUI)
```
1. Abrir pgAdmin (viene con PostgreSQL)
2. Conectar a "localhost" con usuario "postgres"
3. Click derecho en "Databases" → Create → Database
4. Nombre: mundial_2026
5. Owner: postgres
6. Crear
7. Abrir Query Tool y ejecutar schema.sql completo
```

### Opción B: Usando comando (PowerShell)
```powershell
# 1. Abrir conexión
psql -U postgres

# 2. En la terminal de psql:
CREATE DATABASE mundial_2026 OWNER postgres;
\c mundial_2026

# 3. Copiar contenido de schema.sql y ejecutar
# O:
\i 'C:/Users/lucab/Desktop/UCU/BDII/obligatorio-bdII/backend/src/main/resources/schema.sql'

# 4. Verificar tablas
\dt
```

### Opción C: Usando batch script
```powershell
# Crear archivo: create_db.bat

@echo off
setlocal enabledelayedexpansion

set DB_HOST=localhost
set DB_PORT=5432
set DB_USER=postgres
set DB_NAME=mundial_2026
set SCHEMA_FILE=src\main\resources\schema.sql

REM Create database
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -c "CREATE DATABASE %DB_NAME%;"

REM Execute schema
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f %SCHEMA_FILE%

echo Base de datos %DB_NAME% creada exitosamente!
```

---

## 🔧 Configurar application.properties

Editar `src/main/resources/application.properties` con tus datos:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/mundial_2026
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL12Dialect
spring.jpa.show-sql=false
spring.jpa.hibernate.ddl-auto=validate

# JWT
app.jwt.secret=tu-secret-key-super-secreto-de-minimo-256-bits-aqui
app.jwt.expiration=86400000

# Logging
logging.level.root=INFO
logging.level.com.mundial2026=DEBUG
```

---

## 📦 Compilar y Ejecutar

### Opción 1: Maven directo
```powershell
cd "C:\Users\lucab\Desktop\UCU\BDII\obligatorio-bdII\backend"

# Limpiar y compilar
mvn clean install

# Ejecutar
mvn spring-boot:run
```

### Opción 2: Build JAR y ejecutar
```powershell
# Compilar a JAR
mvn clean package -DskipTests

# Ejecutar JAR
java -jar target/mundial-2026-1.0.0-SNAPSHOT.jar
```

### Opción 3: Usar IDE (IntelliJ / VS Code)
- **IntelliJ**: File → Open → Seleccionar carpeta backend
- **VS Code**: 
  - Instalar extensiones: "Extension Pack for Java", "Spring Boot Dashboard"
  - Click en el proyecto y presionar Run

---

## ✅ Verificar que funciona

```powershell
# 1. Verificar que Spring Boot está corriendo:
curl http://localhost:8080/

# 2. Pruebar login (debe retornar 401 o error):
curl -X POST http://localhost:8080/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"test@example.com","password":"123456"}'

# 3. Ver logs:
# El proceso mostrará en consola algo como:
# "Tomcat started on port(s): 8080 (http)"
# "JdbcTypeManager - Loaded typeCode " ... "PostgreSQL JDBC Driver"
```

---

## 🔐 Cambiar contraseña PostgreSQL (Importante!)

```powershell
# Conectarse como admin
psql -U postgres

# En psql:
ALTER USER postgres WITH PASSWORD 'nueva-contraseña-segura';
\q

# Actualizar en application.properties:
spring.datasource.password=nueva-contraseña-segura
```

---

## 📚 Recursos

- **Java 17**: https://www.oracle.com/java/technologies/downloads/
- **Maven**: https://maven.apache.org/
- **PostgreSQL**: https://www.postgresql.org/
- **pgAdmin**: https://www.pgadmin.org/
- **Spring Boot Docs**: https://spring.io/projects/spring-boot

---

## ❌ Troubleshooting

### Maven no se encuentra
```powershell
# Agregar al PATH de Windows:
$env:Path += ';C:\Program Files\apache-maven-3.9.x\bin'

# O permanentemente (como admin):
[Environment]::SetEnvironmentVariable("Path", "$env:Path;C:\Program Files\apache-maven-3.9.x\bin", "User")
```

### PostgreSQL no conecta
```powershell
# Verificar que el servicio está corriendo:
Get-Service postgresql-x64-* | Format-List

# Si no está, iniciar:
Start-Service postgresql-x64-15
```

### Puerto 8080 en uso
```powershell
# Cambiar en application.properties:
server.port=8081
```

### Error "ddl-auto=validate"
```properties
# Si las tablas no existen aún:
spring.jpa.hibernate.ddl-auto=create
# Ejecutar una vez, luego cambiar a:
spring.jpa.hibernate.ddl-auto=validate
```

---

**Soporte**: Consulta con tu profesor o Lee la documentación de Spring Boot
