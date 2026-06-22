-- ============================================
-- SCHEMA MUNDIAL 2026
-- Base de datos: postgresql
-- ============================================

-- Tabla DIRECCION (varios usuarios pueden compartir la misma direccion)
CREATE TABLE IF NOT EXISTS direccion (
    id SERIAL PRIMARY KEY,
    calle VARCHAR(100) NOT NULL,
    nro_direccion INTEGER NOT NULL,
    localidad VARCHAR(100) NOT NULL,
    pais_direccion VARCHAR(50) NOT NULL,
    codigo_postal VARCHAR(10)
);

-- Tabla USUARIO (Superclase)
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    pais_documento VARCHAR(50) NOT NULL,
    nro_documento VARCHAR(50) UNIQUE NOT NULL,
    documento_tipo VARCHAR(50) NOT NULL,
    telefonos VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    direccion_id INTEGER,
    tipo_usuario VARCHAR(20) NOT NULL, -- ADMINISTRADOR, FUNCIONARIO, GENERAL
    CONSTRAINT email_format CHECK (email LIKE '%@%'),
    FOREIGN KEY (direccion_id) REFERENCES direccion(id) ON DELETE SET NULL
);

-- Tabla ADMINISTRADOR (Herencia)
CREATE TABLE IF NOT EXISTS administrador (
    id INTEGER PRIMARY KEY,
    legajo VARCHAR(50) UNIQUE NOT NULL,
    fecha_asig_cargo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verificacion BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabla FUNCIONARIO (Herencia)
CREATE TABLE IF NOT EXISTS funcionario (
    id INTEGER PRIMARY KEY,
    legajo VARCHAR(50) UNIQUE NOT NULL,
    fecha_asig_cargo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verificacion BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id) REFERENCES usuario(id) ON DELETE CASCADE
);

-- Tabla GENERAL (Herencia - Espectadores)
CREATE TABLE IF NOT EXISTS general (
    id INTEGER PRIMARY KEY,
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
    estadio_id INTEGER NOT NULL,
    equipo_local_id INTEGER NOT NULL,
    equipo_visitante_id INTEGER NOT NULL,
    fecha_evento DATE NOT NULL,
    hora_evento TIME NOT NULL,
    estado VARCHAR(50) DEFAULT 'PENDIENTE', -- PENDIENTE, APROBADO, CANCELADO
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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

-- Tabla EVENTO_SECTOR (capacidad/precio efectivos del sector para ese evento puntual;
-- si el admin no manda override al crear/editar el evento, se copian del Sector del estadio)
CREATE TABLE IF NOT EXISTS evento_sector (
    id SERIAL PRIMARY KEY,
    evento_id INTEGER NOT NULL,
    sector_id INTEGER NOT NULL,
    cap_max INTEGER NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (evento_id) REFERENCES evento(id) ON DELETE CASCADE,
    FOREIGN KEY (sector_id) REFERENCES sector(id) ON DELETE CASCADE,
    UNIQUE(evento_id, sector_id),
    CONSTRAINT eventosector_precio_positivo CHECK (precio > 0),
    CONSTRAINT eventosector_capacidad_positiva CHECK (cap_max > 0)
);

-- Tabla DISPOSITIVO
CREATE TABLE IF NOT EXISTS dispositivo (
    id SERIAL PRIMARY KEY,
    dispositivo_id VARCHAR(100) UNIQUE NOT NULL,
    autorizado BOOLEAN DEFAULT FALSE,
    funcionario_id INTEGER,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (funcionario_id) REFERENCES funcionario(id) ON DELETE SET NULL
);

-- Tabla FUNCIONARIO_SECTOR (asignacion de un funcionario a sector(es); el estadio se deriva
-- transitivamente via sector.estadio_id, ya que sector es entidad debil de estadio)
CREATE TABLE IF NOT EXISTS funcionario_sector (
    id SERIAL PRIMARY KEY,
    funcionario_id INTEGER NOT NULL,
    sector_id INTEGER NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (funcionario_id) REFERENCES funcionario(id) ON DELETE CASCADE,
    FOREIGN KEY (sector_id) REFERENCES sector(id) ON DELETE CASCADE,
    UNIQUE(funcionario_id, sector_id)
);

-- Tabla ENTRADA
CREATE TABLE IF NOT EXISTS entrada (
    id SERIAL PRIMARY KEY,
    evento_id INTEGER NOT NULL,
    sector_id INTEGER NOT NULL,
    numero_asiento INTEGER,
    estado VARCHAR(50) DEFAULT 'DISPONIBLE', -- DISPONIBLE, VENDIDA, TRANSFERIDA, CONSUMIDA
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- QR: atributo de la entrada que se regenera cada ~30s mientras la app esta en primer plano
    codigo_qr TEXT,
    fecha_generacion_qr TIMESTAMP,
    consumida BOOLEAN DEFAULT FALSE,
    fecha_consumo TIMESTAMP,
    validado_por INTEGER, -- Funcionario que valida
    dispositivo_id INTEGER,
    propietario_actual_id INTEGER, -- General dueño actual (cambia al transferir)
    FOREIGN KEY (evento_id) REFERENCES evento(id) ON DELETE CASCADE,
    FOREIGN KEY (sector_id) REFERENCES sector(id) ON DELETE RESTRICT,
    FOREIGN KEY (validado_por) REFERENCES funcionario(id) ON DELETE SET NULL,
    FOREIGN KEY (dispositivo_id) REFERENCES dispositivo(id) ON DELETE SET NULL,
    FOREIGN KEY (propietario_actual_id) REFERENCES general(id) ON DELETE SET NULL
);

-- Tabla COMPRA
CREATE TABLE IF NOT EXISTS compra (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cant_entradas INTEGER NOT NULL,
    monto_total DECIMAL(12, 2) NOT NULL,
    costo DECIMAL(12, 2) NOT NULL,
    comision DECIMAL(5, 2) DEFAULT 10, -- Porcentaje de comisión
    estado VARCHAR(50) DEFAULT 'PENDIENTE', -- PENDIENTE, CONFIRMADA, PAGA
    FOREIGN KEY (usuario_id) REFERENCES general(id) ON DELETE CASCADE,
    CONSTRAINT cant_entradas_valida CHECK (cant_entradas > 0 AND cant_entradas < 6)
);

-- Tabla que relaciona COMPRA con ENTRADA
CREATE TABLE IF NOT EXISTS compra_entrada (
    compra_id INTEGER NOT NULL,
    entrada_id INTEGER NOT NULL,
    PRIMARY KEY (compra_id, entrada_id),
    FOREIGN KEY (compra_id) REFERENCES compra(id) ON DELETE CASCADE,
    FOREIGN KEY (entrada_id) REFERENCES entrada(id) ON DELETE CASCADE
);

-- Tabla TRANSFERENCIA
CREATE TABLE IF NOT EXISTS transferencia (
    id SERIAL PRIMARY KEY,
    remitente_id INTEGER NOT NULL,
    destinatario_id INTEGER NOT NULL,
    fecha_trans TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    hora_trans TIME DEFAULT CURRENT_TIME,
    cant_transf INTEGER NOT NULL,
    aprobacion BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (remitente_id) REFERENCES general(id) ON DELETE CASCADE,
    FOREIGN KEY (destinatario_id) REFERENCES general(id) ON DELETE CASCADE,
    CONSTRAINT cant_transf_valida CHECK (cant_transf > 0 AND cant_transf < 4),
    CONSTRAINT usuarios_diferentes CHECK (remitente_id != destinatario_id)
);

-- Tabla que relaciona TRANSFERENCIA con ENTRADA
CREATE TABLE IF NOT EXISTS transferencia_entrada (
    transferencia_id INTEGER NOT NULL,
    entrada_id INTEGER NOT NULL,
    PRIMARY KEY (transferencia_id, entrada_id),
    FOREIGN KEY (transferencia_id) REFERENCES transferencia(id) ON DELETE CASCADE,
    FOREIGN KEY (entrada_id) REFERENCES entrada(id) ON DELETE CASCADE
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
COMMENT ON COLUMN compra.comision IS 'Porcentaje de comisión aplicado al costo';
COMMENT ON COLUMN transferencia.aprobacion IS 'True: aprobada por administrador, False: pendiente';
COMMENT ON COLUMN entrada.codigo_qr IS 'Código QR vigente; se regenera cada ~30s mientras la app está en primer plano';
COMMENT ON COLUMN entrada.consumida IS 'True: ya fue escaneada y validada';
