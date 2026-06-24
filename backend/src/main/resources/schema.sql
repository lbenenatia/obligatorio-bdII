-- ============================================
-- SCHEMA MUNDIAL 2026
-- Base de datos: postgresql
-- ============================================

-- Tabla DIRECCION (varios usuarios pueden compartir la misma direccion)
CREATE TABLE IF NOT EXISTS direccion (
    nro_direccion INTEGER NOT NULL PRIMARY KEY,
    calle VARCHAR(100) NOT NULL,
    localidad VARCHAR(100) NOT NULL,
    pais_direccion VARCHAR(50) NOT NULL,
    codigo_postal VARCHAR(10)
);

-- Tabla USUARIO (Superclase)
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    pais_documento VARCHAR(50) NOT NULL,
    nro_documento VARCHAR(50) UNIQUE NOT NULL,
    documento_tipo VARCHAR(50) NOT NULL,
    direccion_id INTEGER,
    tipo_usuario VARCHAR(20) NOT NULL, -- ADMINISTRADOR, FUNCIONARIO, GENERAL
    FOREIGN KEY (direccion_id) REFERENCES direccion(nro_direccion) ON DELETE SET NULL,
    UNIQUE (email, nro_documento),
    CONSTRAINT email_format CHECK (email LIKE '%@%')
);

-- Tabla ADMINISTRADOR (Herencia)
CREATE TABLE IF NOT EXISTS administrador (
    id INTEGER PRIMARY KEY,
    fecha_asig_cargo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabla FUNCIONARIO (Herencia)
CREATE TABLE IF NOT EXISTS funcionario (
    id INTEGER PRIMARY KEY,
    legajo VARCHAR(50) UNIQUE NOT NULL,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabla GENERAL (Herencia - Espectadores)
CREATE TABLE IF NOT EXISTS general (
    id INTEGER PRIMARY KEY,
    verificacion BOOLEAN DEFAULT FALSE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabla ESTADIO
CREATE TABLE IF NOT EXISTS estadio (
    id SERIAL PRIMARY KEY,
    nombre_estadio VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla EQUIPO
CREATE TABLE IF NOT EXISTS equipo (
    id SERIAL PRIMARY KEY,
    nombre_equipo VARCHAR(100) NOT NULL UNIQUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla EVENTO (Partido)
CREATE TABLE IF NOT EXISTS evento (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL,
    estadio_id INTEGER NOT NULL,
    equipo_local_id INTEGER NOT NULL,
    equipo_visitante_id INTEGER NOT NULL,
    fecha_evento DATE NOT NULL,
    hora_evento TIME NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (estadio_id) REFERENCES estadio(id) ON DELETE RESTRICT,
    FOREIGN KEY (equipo_local_id) REFERENCES equipo(id) ON DELETE RESTRICT,
    FOREIGN KEY (equipo_visitante_id) REFERENCES equipo(id) ON DELETE RESTRICT,
    CONSTRAINT equipos_diferentes CHECK (equipo_local_id != equipo_visitante_id)
);

-- Tabla SECTOR
CREATE TABLE IF NOT EXISTS sector (
    id SERIAL PRIMARY KEY,
    estadio_id INTEGER NOT NULL,
    codigo CHAR(1) NOT NULL, -- A, B, C, D
    cap_max INTEGER NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (estadio_id) REFERENCES estadio(id) ON DELETE CASCADE,
    UNIQUE(estadio_id, codigo),
    CONSTRAINT codigo_valido CHECK (codigo IN ('A', 'B', 'C', 'D')),
    CONSTRAINT precio_positivo CHECK (precio > 0),
    CONSTRAINT capacidad_positiva CHECK (cap_max > 0)
);

-- Tabla DISPOSITIVO
CREATE TABLE IF NOT EXISTS dispositivo (
    id SERIAL PRIMARY KEY,
    autorizado BOOLEAN DEFAULT FALSE,
    funcionario_id INTEGER,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (funcionario_id) REFERENCES funcionario(id) ON DELETE SET NULL
);

-- Tabla FUNCIONARIO_SECTOR (asignacion de un funcionario a sector(es); el estadio se deriva
-- transitivamente via sector.estadio_id, ya que sector es entidad debil de estadio)
CREATE TABLE IF NOT EXISTS funcionario_sector (
    funcionario_id INTEGER NOT NULL,
    sector_id INTEGER NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (funcionario_id, sector_id),
    FOREIGN KEY (funcionario_id) REFERENCES funcionario(id) ON DELETE CASCADE,
    FOREIGN KEY (sector_id) REFERENCES sector(id) ON DELETE CASCADE,
    UNIQUE(funcionario_id, sector_id)
);

-- Tabla COMPRA
CREATE TABLE IF NOT EXISTS compra (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cant_entradas INTEGER NOT NULL,
    monto_total DECIMAL(12, 2) NOT NULL,
    costo DECIMAL(12, 2) NOT NULL,
    estado VARCHAR(50) DEFAULT 'PENDIENTE', -- PENDIENTE, CONFIRMADA, PAGA
    FOREIGN KEY (usuario_id) REFERENCES general(id) ON DELETE CASCADE,
    CONSTRAINT cant_entradas_valida CHECK (cant_entradas > 0 AND cant_entradas < 6)
);

-- Tabla ENTRADA
CREATE TABLE IF NOT EXISTS entrada (
    id SERIAL PRIMARY KEY,
    evento_id INTEGER NOT NULL,
    sector_id INTEGER NOT NULL,
    compra_id INTEGER NOT NULL,
    numero_asiento INTEGER,
    comision DECIMAL(5, 2) DEFAULT 10, -- Porcentaje de comisión
    estado VARCHAR(50) DEFAULT 'DISPONIBLE', -- DISPONIBLE, VENDIDA, TRANSFERIDA, CONSUMIDA
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- QR: atributo de la entrada que se regenera cada ~30s mientras la app esta en primer plano
    codigo_qr TEXT,
    fecha_generacion_qr TIMESTAMP,
    consumida BOOLEAN DEFAULT FALSE,
    fecha_consumo TIMESTAMP,
    validado_por INTEGER, -- Funcionario que valida
    dispositivo_id INTEGER,
    propietario_actual_email VARCHAR(100), -- General dueño actual (cambia al transferir)
    FOREIGN KEY (evento_id) REFERENCES evento(id) ON DELETE CASCADE,
    FOREIGN KEY (sector_id) REFERENCES sector(id) ON DELETE RESTRICT,
    FOREIGN KEY (compra_id) REFERENCES compra(id) ON DELETE CASCADE,
    FOREIGN KEY (validado_por) REFERENCES funcionario(id) ON DELETE SET NULL,
    FOREIGN KEY (dispositivo_id) REFERENCES dispositivo(id) ON DELETE SET NULL,
    FOREIGN KEY (propietario_actual_email) REFERENCES usuario(email) ON DELETE SET NULL,
    CONSTRAINT estado_valido CHECK (estado IN ('DISPONIBLE', 'VENDIDA', 'TRANSFERIDA', 'CONSUMIDA'))
);

-- Tabla TRANSFERENCIA
CREATE TABLE IF NOT EXISTS transferencia (
    id SERIAL PRIMARY KEY,
    entrada_id INTEGER NOT NULL,
    remitente_id INTEGER NOT NULL,
    destinatario_id INTEGER NOT NULL,
    fecha_transferencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    hora_transferencia TIME DEFAULT CURRENT_TIME,
    cant_transferida INTEGER NOT NULL,
    aprobacion BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (entrada_id) REFERENCES entrada(id) ON DELETE CASCADE,
    FOREIGN KEY (remitente_id) REFERENCES general(id) ON DELETE CASCADE,
    FOREIGN KEY (destinatario_id) REFERENCES general(id) ON DELETE CASCADE,
    CONSTRAINT cant_transferida_valida CHECK (cant_transferida > 0 AND cant_transferida < 4),
    CONSTRAINT usuarios_diferentes CHECK (remitente_id != destinatario_id)
);

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_usuario_email ON usuario(email);
CREATE INDEX IF NOT EXISTS idx_usuario_tipo ON usuario(tipo_usuario);
CREATE INDEX IF NOT EXISTS idx_evento_estadio ON evento(estadio_id);
CREATE INDEX IF NOT EXISTS idx_evento_fecha ON evento(fecha_evento);
CREATE INDEX IF NOT EXISTS idx_entrada_evento ON entrada(evento_id);
CREATE INDEX IF NOT EXISTS idx_entrada_estado ON entrada(estado);
CREATE INDEX IF NOT EXISTS idx_compra_usuario ON compra(usuario_id);
CREATE INDEX IF NOT EXISTS idx_compra_fecha ON compra(fecha_compra);
CREATE INDEX IF NOT EXISTS idx_transferencia_remitente ON transferencia(remitente_id);
CREATE INDEX IF NOT EXISTS idx_transferencia_destinatario ON transferencia(destinatario_id);
CREATE INDEX IF NOT EXISTS idx_entrada_codigo_qr ON entrada(codigo_qr);

-- Comentarios
COMMENT ON COLUMN usuario.tipo_usuario IS 'ADMINISTRADOR, FUNCIONARIO, GENERAL';
COMMENT ON COLUMN entrada.comision IS 'Porcentaje de comisión aplicado al costo';
COMMENT ON COLUMN transferencia.aprobacion IS 'True: aprobada por administrador, False: pendiente';
COMMENT ON COLUMN entrada.codigo_qr IS 'Código QR vigente; se regenera cada ~30s mientras la app está en primer plano';
COMMENT ON COLUMN entrada.consumida IS 'True: ya fue escaneada y validada';
