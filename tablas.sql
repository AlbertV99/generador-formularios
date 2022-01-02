CREATE TABLE tipo_campo(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo varchar(30) NOT NULL COMMENT 'Nombre del tipo de campo que podra ser utilizado en los formularios creados'
) ENGINE=INNODB;


CREATE TABLE formulario (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
    titulo VARCHAR(30) NOT NULL COMMENT 'Ttitulo visible en el formulario generado',
    tabla_guardar VARCHAR(50) NOT NULL COMMENT 'Nombre de la tabla donde deberan guardarse los datos capturados en el formulario',
    direccion_guardar VARCHAR(100) NOT NULL COMMENT 'Direccion del archivo donde debe enviarse los datos capturados en el formulario para su guardado',

) ENGINE=INNODB;

CREATE TABLE campos_formulario(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_formulario INT NOT NULL,
    id_tipo_campo INT NOT NULL,
    nombre_campo VARCHAR(30) NOT NULL,
    nombre_campo_tabla VARCHAR(40) NOT NULL,
    placeholder VARCHAR(60),
    titulo VARCHAR(20) NOT NULL,
    clase_css VARCHAR(100) NOT NULL,
    tipo_lista_valores VARCHAR(10) COMMENT 'Validacion para los campos de tipo lista desplegable, dependiendo de este valor se ejecutara el select cargado o se utilizaran los valores en formato JSON [{"id":"valor"},{"id":"valor"}]' CHECK ( tipo_lista_valores in ('','FIJO','DINAMICO')),
    lista_valores VARCHAR(100) COMMENT 'Valores a mostrar en lista desplegable, se puede almacenar un select o una lista en formato JSON' ,
    validacion_vacio VARCHAR(1) DEFAULT 'N' COMMENT 'Para validar si el campo puede venir con o sin valor , (S/N)' CHECK (validacion_vacio IN ('S','N')),
    menor_valor VARCHAR(15) COMMENT 'Minimo valor posible para los campos de tipo numerico / fecha [formato de fecha = aaaa-mm-dd]' ,
    mayor_valor VARCHAR(15) COMMENT 'Maximo valor posible para los campos de tipo numerico / fecha [formato de fecha = aaaa-mm-dd]',
    FOREIGN KEY (id_formulario)
       REFERENCES formulario(id)
       ON DELETE RESTRICT,
   FOREIGN KEY (id_tipo_campo)
      REFERENCES tipo_campo(id)
      ON DELETE RESTRICT

) ENGINE=INNODB;

--INSERCIONES DE LOS CAMPOS UTILIZABLES EN EL FORMULARIO
INSERT INTO  tipo_campo (tipo) VALUES ("texto"),("numerico"),("lista"),("buscador"),("fecha");
