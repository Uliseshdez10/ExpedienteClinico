-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 26-10-2022 a las 19:35:36
-- Versión del servidor: 5.7.33
-- Versión de PHP: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemaweb`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_CITA` ()   SELECT c.cita_id,c.cita_numatencion,c.cita_feregistro,c.cita_estatus,p.paciente_id,concat_ws(' ',p.paciente_nombre) as paciente,c.medico_id,concat_ws(' ',m.medico_nombre) as medico,e.especialidad_id,e.especialidad_nombre,c.cita_descripcion FROM cita as c 
inner join paciente as p on c.paciente_id=p.paciente_id
inner join medico as m on c.medico_id=m.medico_id
inner join especialidad as e on e.especialidad_id=m.especialidad_id
ORDER BY cita_id DESC$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_COMBO_ESPECIALIDAD` ()   SELECT * FROM especialidad where especialidad_estatus='ACTIVO'$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_COMBO_ROL` ()  NO SQL SELECT
rol.rol_id,
rol.rol_nombre
FROM
rol$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_ESPECIALIDAD` ()   SELECT * FROM especialidad$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_INSUMO` ()   SELECT * FROM insumo$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_MEDICAMENTO` ()   SELECT * FROM medicamento$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_MEDICO` ()   SELECT
	medico.*, 
	especialidad.especialidad_nombre, 
	usuario.usu_nombre, 
	usuario.rol_id, 
	usuario.usu_email
FROM
	medico
INNER JOIN especialidad ON medico.especialidad_id = especialidad.especialidad_id
INNER JOIN usuario ON medico.usu_id = usuario.usu_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_PACIENTE` ()   SELECT
paciente.paciente_id,
paciente.paciente_nombre,
paciente.paciente_fenac,
paciente.paciente_edad,
paciente.paciente_sexo,
paciente.paciente_relig,
paciente.paciente_domi,
paciente.paciente_tel,
paciente.paciente_estciv,
paciente.paciente_esco,
paciente.paciente_ocup,
paciente.paciente_lunac,
paciente.paciente_resiact,
paciente.paciente_da,
paciente.paciente_curp,
paciente.paciente_niveco,
paciente.paciente_grupet,
paciente.paciente_folio,
paciente.paciente_estatus
FROM
paciente$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_PROCEDIMIENTO` ()  NO SQL SELECT * FROM procedimiento$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_LISTAR_USUARIO` ()  READS SQL DATA BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD:=0;
SELECT 
@CANTIDAD:=@CANTIDAD+1 AS posicion,
usuario.usu_id,
usuario.usu_nombre,
usuario.usu_sexo,
usuario.rol_id,
usuario.usu_estatus,
rol.rol_nombre
FROM
usuario
INNER JOIN rol ON usuario.rol_id = rol.rol_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_CITA` (IN `IDCITA` INT, IN `IDPACIENTE` INT, IN `IDDOCTOR` INT, IN `DESCRIPCION` TEXT, IN `ESTATUS` VARCHAR(10))   UPDATE cita set
paciente_id=IDPACIENTE,
medico_id=IDDOCTOR,
cita_descripcion=DESCRIPCION,
cita_estatus=ESTATUS
where cita_id=IDCITA$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_CONTRA_USUARIO` (IN `IDUSUARIO` INT, IN `CONTRA` VARCHAR(255))   UPDATE usuario SET
usu_contrasena=CONTRA
where usu_id=IDUSUARIO$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_DATOS_USUARIO` (IN `IDUSUARIO` INT, IN `SEXO` CHAR(1), IN `IDROL` INT)   UPDATE usuario SET
usu_sexo=SEXO,
rol_id=IDROL
WHERE usu_id=IDUSUARIO$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_ESPECIALIDAD` (IN `ID` INT, IN `ESPECIALIDADACTUAL` VARCHAR(50), IN `ESPECIALIDADNUEVA` VARCHAR(50), IN `ESTATUS` VARCHAR(10))   BEGIN
DECLARE CANTIDAD INT;
IF ESPECIALIDADACTUAL=ESPECIALIDADNUEVA THEN
	UPDATE especialidad set
	especialidad_estatus=ESTATUS
	where especialidad_id=ID;
	SELECT 1;
ELSE
	SET @CANTIDAD:=(SELECT COUNT(*) FROM especialidad where especialidad_nombre=ESPECIALIDADNUEVA);
	IF @CANTIDAD=0 THEN
		UPDATE especialidad set 
		especialidad_nombre=ESPECIALIDADNUEVA,
		especialidad_estatus=ESTATUS
		where especialidad_id=ID;
		SELECT 1;
	ELSE
		SELECT 2;
	END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_ESTATUS_ESPECIALIDAD` (IN `IDESPECIALIDAD` INT, IN `ESTATUS` VARCHAR(20))   UPDATE especialidad SET
especialidad_estatus=ESTATUS
WHERE especialidad_id=IDESPECIALIDAD$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_ESTATUS_PACIENTE` (IN `IDPACIENTE` INT, IN `ESTATUS` VARCHAR(20))   UPDATE paciente SET
paciente_estatus=ESTATUS
WHERE paciente_id=IDPACIENTE$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_ESTATUS_USUARIO` (IN `IDUSUARIO` INT, IN `ESTATUS` VARCHAR(20))   UPDATE usuario SET
usu_estatus=ESTATUS
WHERE usu_id=IDUSUARIO$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_INSUMO` (IN `ID` INT, IN `INSUMOACTUAL` VARCHAR(50), IN `INSUMONUEVO` VARCHAR(50), IN `STOCK` INT, IN `ESTATUS` VARCHAR(10))   BEGIN 
DECLARE CANTIDAD INT;
IF INSUMOACTUAL = INSUMONUEVO THEN 
update insumo set 
insumo_stock=STOCK,
insumo_estatus=ESTATUS
where insumo_id=ID;
SELECT 1;
ELSE 
SET @CANTIDAD:=(SELECT COUNT(*) FROM insumo where insumo_nombre=INSUMONUEVO);
IF @CANTIDAD = 0 THEN
update insumo set 
insumo_nombre=INSUMONUEVO,
insumo_stock=STOCK,
insumo_estatus=ESTATUS
where insumo_id=ID;
SELECT 1;
ELSE
SELECT 2;
END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_MEDICAMENTO` (IN `ID` INT, IN `MEDICAMENTOACTUAL` VARCHAR(50), IN `MEDICAMENTONUEVO` VARCHAR(50), IN `ALIAS` VARCHAR(50), IN `STOCK` INT, IN `ESTATUS` VARCHAR(10))   BEGIN
DECLARE CANTIDAD INT;
IF MEDICAMENTOACTUAL = MEDICAMENTONUEVO THEN
UPDATE medicamento set
medicamento_alias=ALIAS,
medicamento_stock=STOCK,
medicamento_estatus=ESTATUS
where medicamento_id=ID;
ELSE
SET @CANTIDAD:= (SELECT COUNT(*) FROM medicamento where medicamento_nombre=MEDICAMENTONUEVO);
IF @CANTIDAD= 0 THEN
UPDATE medicamento set
medicamento_nombre=MEDICAMENTONUEVO,
medicamento_alias=ALIAS,
medicamento_stock=STOCK,
medicamento_estatus=ESTATUS
where medicamento_id=ID;
SELECT 1;
ELSE 
SELECT 2;
END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_MEDICO` (IN `IDMEDICO` INT, IN `NOMBRES` VARCHAR(50), IN `DIRECCION` VARCHAR(200), IN `MOVIL` VARCHAR(10), IN `SEXO` CHAR(2), IN `FECHANACIMIENTO` DATE, IN `NRODOCUMENTOACTUAL` CHAR(12), IN `NRODOCUMENTONUEVO` CHAR(12), IN `COLEGIATURAACTUAL` CHAR(12), IN `COLEGIATURANUEVO` CHAR(12), IN `ESPECIALIDAD` INT, IN `IDUSUARIO` INT, IN `EMAIL` VARCHAR(255))   BEGIN
DECLARE CANTIDAD INT;
IF NRODOCUMENTOACTUAL = NRODOCUMENTONUEVO OR COLEGIATURAACTUAL = COLEGIATURANUEVO THEN
	UPDATE usuario SET
	usu_email=EMAIL,
	usu_sexo=SEXO
	where usu_id=IDUSUARIO;
	update medico set
	medico_nombre=NOMBRES,
	medico_direccion=DIRECCION,
	medico_movil=MOVIL,
	medico_sexo=SEXO,
	medico_fenac=FECHANACIMIENTO,
	medico_nrodocumento=NRODOCUMENTONUEVO,
	medico_colegiatura=COLEGIATURANUEVO,
	especialidad_id=ESPECIALIDAD
	where medico_id=IDMEDICO;
	SELECT 1;
ELSE
	SET @CANTIDAD:=(SELECT COUNT(*) FROM medico where medico_nrodocumento=NRODOCUMENTONUEVO OR medico_colegiatura=COLEGIATURANUEVO);
	IF @CANTIDAD=0 THEN
		UPDATE usuario SET
		usu_email=EMAIL,
		usu_sexo=SEXO
		where usu_id=IDUSUARIO;
		update medico set
		medico_nombre=NOMBRES,
		medico_direccion=DIRECCION,
		medico_movil=MOVIL,
		medico_sexo=SEXO,
		medico_fenac=FECHANACIMIENTO,
		medico_nrodocumento=NRODOCUMENTONUEVO,
		medico_colegiatura=COLEGIATURANUEVO,
		especialidad_id=ESPECIALIDAD
		where medico_id=IDMEDICO;
		SELECT 1;
	ELSE
		SELECT 2;
	END IF;

END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_PACIENTE` (IN `ID` INT(11), IN `NOMBRE` VARCHAR(50), IN `FENAC` VARCHAR(70), IN `EDAD` VARCHAR(10), IN `SEXO` CHAR(11), IN `RELIG` VARCHAR(70), IN `DOMI` VARCHAR(200), IN `TEL` CHAR(10), IN `ESTCIV` VARCHAR(70), IN `ESCO` VARCHAR(70), IN `OCUP` VARCHAR(70), IN `LUNAC` VARCHAR(70), IN `RESIACT` VARCHAR(70), IN `DA` VARCHAR(70), IN `CURP` VARCHAR(70), IN `NIVECO` VARCHAR(70), IN `GRUPET` VARCHAR(70), IN `FOLIOACTUAL` VARCHAR(70), IN `FOLIONUEVO` VARCHAR(70), IN `ESTATUS` CHAR(10))   BEGIN
DECLARE CANTIDAD INT;
IF FOLIOACTUAL=FOLIONUEVO THEN
	UPDATE paciente SET 
		paciente_nombre=NOMBRE,
		paciente_fenac=FENAC,
		paciente_edad=EDAD,
		paciente_sexo=SEXO,
		paciente_relig=RELIG,
		paciente_domi=DOMI,
		paciente_tel=TEL,
		paciente_estciv=ESTCIV,
		paciente_esco=ESCO,
		paciente_ocup=OCUP,
		paciente_lunac=LUNAC,
		paciente_resiact=RESIACT,
		paciente_da=DA,
		paciente_curp=CURP,
		paciente_grupet=GRUPET,
		paciente_estatus=ESTATUS
   	WHERE paciente_id=ID;
   SELECT 1;
ELSE
SET @CANTIDAD :=(SELECT COUNT(*) FROM paciente WHERE paciente_folio = FOLIONUEVO);
	IF @CANTIDAD = 0 THEN
		UPDATE paciente SET 
		paciente_nombre=NOMBRE,
		paciente_fenac=FENAC,
		paciente_edad=EDAD,
		paciente_sexo=SEXO,
		paciente_relig=RELIG,
		paciente_domi=DOMI,
		paciente_tel=TEL,
		paciente_estciv=ESTCIV,
		paciente_esco=ESCO,
		paciente_ocup=OCUP,
		paciente_lunac=LUNAC,
		paciente_resiact=RESIACT,
		paciente_da=DA,
		paciente_curp=CURP,
		paciente_grupet=GRUPET,
		paciente_folio=FOLIONUEVO,
		paciente_estatus=ESTATUS
   	WHERE paciente_id=ID;
   	SELECT 1;
	ELSE
		SELECT 2;
	END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_MODIFICAR_PROCEDIMIENTO` (IN `ID` INT, IN `PROCEDIMIENTOACTUAL` VARCHAR(50), IN `PROCEDIMIENTONUEVO` VARCHAR(50), IN `ESTATUS` VARCHAR(10))  NO SQL BEGIN 
DECLARE CANTIDAD INT;
IF PROCEDIMIENTOACTUAL= PROCEDIMIENTONUEVO THEN
UPDATE procedimiento SET
procedimiento_estatus=ESTATUS
where procedimiento_id=ID;
SELECT 1;
ELSE
SET @CANTIDAD:=(select COUNT(*) from procedimiento where procedimiento_nombre=PROCEDIMIENTONUEVO);
IF @CANTIDAD = 0 THEN 
UPDATE procedimiento SET
procedimiento_estatus=ESTATUS,
procedimiento_nombre=PROCEDIMIENTONUEVO
where procedimiento_id=ID;
SELECT 1;
ELSE
SELECT 2;
END IF;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_CITA` (IN `IDPACIENTE` INT, IN `IDDOCTOR` INT, IN `DESCRIPCION` TEXT, IN `IDUSUARIO` INT)   BEGIN
DECLARE NUMCITA INT;
SET @NUMCITA:=(SELECT COUNT(*) +1 FROM cita WHERE cita_feregistro=CURDATE());
INSERT INTO cita(cita_numatencion,cita_feregistro,medico_id,paciente_id,cita_estatus,cita_descripcion,usuario_id) values(@NUMCITA,CURDATE(),IDDOCTOR,IDPACIENTE,'PENDIENTE',DESCRIPCION,IDUSUARIO);
SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_ESPECIALIDAD` (IN `ESPECIALIDAD` VARCHAR(50), IN `ESTATUS` VARCHAR(10))   BEGIN 
DECLARE CANTIDAD INT;
SET @CANTIDAD:=(select count(*) from especialidad where especialidad_nombre=ESPECIALIDAD);
IF @CANTIDAD= 0 THEN
	INSERT INTO especialidad(especialidad_nombre,especialidad_fregistro,especialidad_estatus) VALUES(ESPECIALIDAD,CURDATE(),ESTATUS);
	SELECT 1;
	
ELSE
	SELECT 2;
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_INSUMO` (IN `INSUMO` VARCHAR(50), IN `STOCK` INT, IN `ESTATUS` VARCHAR(10))   BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD:=(SELECT COUNT(*) FROM insumo where insumo_nombre=INSUMO);

IF @CANTIDAD = 0 THEN 
INSERT INTO insumo(insumo_nombre,insumo_stock,insumo_feregistro,insumo_estatus)
VALUES (INSUMO,STOCK,CURDATE(),ESTATUS);
SELECT 1;
ELSE
SELECT 2;
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_MEDICAMENTO` (IN `MEDICAMENTO` VARCHAR(50), IN `ALIAS` VARCHAR(50), IN `STOCK` INT, IN `ESTATUS` VARCHAR(10))   BEGIN 
DECLARE CANTIDAD INT;
SET @CANTIDAD:=(SELECT COUNT(*) FROM medicamento WHERE medicamento_nombre=MEDICAMENTO);
IF @CANTIDAD=0 THEN 
INSERT INTO medicamento(medicamento_nombre,medicamento_alias,medicamento_stock,medicamento_feregistro,medicamento_estatus) VALUES(MEDICAMENTO,ALIAS,STOCK,CURDATE(),ESTATUS);
SELECT 1;
ELSE
SELECT 2;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_MEDICO` (IN `NOMBRES` VARCHAR(50), IN `DIRECCION` VARCHAR(200), IN `MOVIL` VARCHAR(10), IN `SEXO` CHAR(2), IN `FECHANACIMIENTO` DATE, IN `NRODOCUMENTO` CHAR(12), IN `COLEGIATURA` CHAR(12), IN `ESPECIALIDAD` INT, IN `USUARIO` VARCHAR(70), IN `CONTRA` VARCHAR(255), IN `ROL` INT, IN `EMAIL` VARCHAR(255))   BEGIN
DECLARE CANTIDAD INT;
DECLARE CANTIDADME INT;
SET @CANTIDAD:=(SELECT COUNT(*) FROM usuario where usu_nombre=USUARIO);
IF @CANTIDAD = 0 THEN
	SET @CANTIDADME:=(SELECT COUNT(*) FROM medico where medico_nrodocumento=NRODOCUMENTO OR
medico_colegiatura=COLEGIATURA);
	IF @CANTIDADME = 0 THEN
		INSERT INTO usuario(usu_nombre,usu_contrasena,usu_sexo,rol_id,usu_estatus,usu_email,usu_intento)
	values (USUARIO,CONTRA,SEXO,ROL,'ACTIVO',EMAIL,0);
	INSERT INTO medico(medico_nombre,medico_direccion,medico_movil,medico_sexo,medico_fenac,medico_nrodocumento,medico_colegiatura,especialidad_id,usu_id)
	values(NOMBRES,DIRECCION,MOVIL,SEXO,FECHANACIMIENTO,NRODOCUMENTO,COLEGIATURA,ESPECIALIDAD,(select max(usu_id) from usuario));
	SELECT 1;
	ELSE
		SELECT 2;
	END IF;
ELSE
	SELECT 2;
END IF;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_PACIENTE` (IN `NOMBRE` VARCHAR(50), IN `FENAC` VARCHAR(70), IN `EDAD` VARCHAR(10), IN `SEXO` CHAR(1), IN `RELIG` VARCHAR(70), IN `DOMI` VARCHAR(200), IN `TEL` CHAR(10), IN `ESTCIV` VARCHAR(70), IN `ESCO` VARCHAR(70), IN `OCUP` VARCHAR(70), IN `LUNAC` VARCHAR(70), IN `RESIACT` VARCHAR(70), IN `DA` VARCHAR(70), IN `CURP` VARCHAR(18), IN `NIVECO` VARCHAR(70), IN `GRUPET` VARCHAR(70), IN `FOLIO` VARCHAR(70))   BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD :=(SELECT COUNT(*) FROM paciente WHERE paciente_folio = FOLIO);
IF @CANTIDAD=0 THEN
INSERT INTO paciente(paciente_nombre,paciente_fenac,paciente_edad,paciente_sexo,paciente_relig,paciente_domi,
paciente_tel,paciente_estciv,paciente_esco,paciente_ocup,paciente_lunac,paciente_resiact,paciente_da,paciente_curp,paciente_niveco,paciente_grupet,paciente_folio,paciente_estatus) VALUES(NOMBRE,FENAC,EDAD,SEXO,RELIG,DOMI,TEL,ESTCIV,ESCO,OCUP,LUNAC,RESIACT,DA,CURP,NIVECO,GRUPET,FOLIO,'ACTIVO');
SELECT 1;
ELSE
SELECT 2;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_PROCEDIMIENTO` (IN `PROCEDIMIENTO` VARCHAR(50), IN `ESTATUS` VARCHAR(10))  NO SQL BEGIN 
DECLARE CANTIDAD INT;
SET @CANTIDAD:=(select count(*) from procedimiento where procedimiento_nombre=PROCEDIMIENTO);
IF @CANTIDAD = 0 THEN
INSERT INTO procedimiento(procedimiento_nombre,procedimiento_fecregistro,procedimiento_estatus)
VALUES (PROCEDIMIENTO,CURDATE(),ESTATUS);
SELECT 1;
ELSE
SELECT 2;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_REGISTRAR_USUARIO` (IN `USU` VARCHAR(70), IN `CONTRA` VARCHAR(255), IN `SEXO` CHAR(1), IN `rol` INT)   BEGIN
    DECLARE
        CANTIDAD INT;
    SET
        @CANTIDAD :=(
        SELECT
            COUNT(*)
        FROM
            usuario
        WHERE
            usu_nombre = BINARY USU
    ); IF @CANTIDAD = 0 THEN
INSERT INTO usuario(
    usu_nombre,
    usu_contrasena,
    usu_sexo,
    rol_id,
    usu_estatus
)
VALUES(USU, CONTRA, SEXO, rol, 'ACTIVO');
SELECT
    1; ELSE
SELECT
    2;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_RESTABLECER_CONTRA` (IN `EMAIL` VARCHAR(255), IN `CONTRA` VARCHAR(255))  MODIFIES  DATA BEGIN
DECLARE CANTIDAD INT;
SET @CANTIDAD:=(SELECT COUNT(*) FROM usuario WHERE usu_email = EMAIL); 
IF @CANTIDAD>0 THEN
UPDATE usuario SET
usu_contrasena = CONTRA
WHERE usu_email = EMAIL;
SELECT 1; 
ELSE
SELECT 2;
END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_VERIFICAR_USUARIO` (IN `usuario` VARCHAR(20))   SELECT
usuario.usu_id,
usuario.usu_nombre,
usuario.usu_contrasena,
usuario.usu_sexo,
usuario.rol_id,
usuario.usu_estatus,
rol.rol_nombre
FROM
usuario
INNER JOIN rol ON usuario.rol_id = rol.rol_id
WHERE usu_nombre  = BINARY usuario$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `cita_id` int(11) NOT NULL,
  `cita_numatencion` int(11) NOT NULL,
  `cita_feregistro` date NOT NULL,
  `medico_id` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `cita_estatus` enum('PENDIENTE','ATENDIDA','CANCELADA') NOT NULL,
  `cita_descripcion` text NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`cita_id`, `cita_numatencion`, `cita_feregistro`, `medico_id`, `paciente_id`, `cita_estatus`, `cita_descripcion`, `usuario_id`) VALUES
(1, 123456789, '2022-09-27', 2, 2, 'PENDIENTE', 'Ya se curo el paciente ', 0),
(2, 1, '2022-10-10', 3, 1, 'CANCELADA', 'si', 1),
(3, 2, '2022-10-10', 1, 2, 'CANCELADA', 'Le duele todo pero ya casi se recupera ', 1),
(4, 1, '2022-10-25', 2, 2, 'PENDIENTE', 'Ya por fin?', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--

CREATE TABLE `consulta` (
  `consulta_id` int(11) NOT NULL,
  `consulta_descripcion` text NOT NULL,
  `consulta_diagnostico` text NOT NULL,
  `consulta_feregistro` date NOT NULL,
  `consulta_estatus` enum('ATENDIDA','PENDIENTE') NOT NULL,
  `cita_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `especialidad_id` int(11) NOT NULL,
  `especialidad_nombre` varchar(50) NOT NULL,
  `especialidad_fregistro` date NOT NULL,
  `especialidad_estatus` enum('ACTIVO','INACTIVO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`especialidad_id`, `especialidad_nombre`, `especialidad_fregistro`, `especialidad_estatus`) VALUES
(1, 'PSICOLOGIA', '2022-08-23', 'ACTIVO'),
(2, 'NEUROLOGIA', '2022-08-23', 'ACTIVO'),
(3, 'DERMATOLOGIA', '2022-08-23', 'ACTIVO'),
(5, 'PEDIATRIA', '2022-08-23', 'ACTIVO'),
(6, 'EMATOLOGIA', '2022-08-24', 'INACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historia`
--

CREATE TABLE `historia` (
  `historia_id` int(11) NOT NULL,
  `paciente_id` int(11) NOT NULL,
  `historia_fereg` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialc`
--

CREATE TABLE `historialc` (
  `id_hiscli` int(11) NOT NULL,
  `ant_heredofami` longtext NOT NULL,
  `ant_personopatolo` longtext NOT NULL,
  `ant_perinetales` longtext NOT NULL,
  `ant_persopatolo` longtext NOT NULL,
  `pade_actual` longtext NOT NULL,
  `sintomas_generales` longtext NOT NULL,
  `Aparato_respiratorio` longtext NOT NULL,
  `organos_sentidos` longtext NOT NULL,
  `Aparato_cardiovascular` longtext NOT NULL,
  `Aparato_genitour` longtext NOT NULL,
  `Aparato_digestivo` longtext NOT NULL,
  `Aparato_endocrino` longtext NOT NULL,
  `Aparato_nervioso` longtext NOT NULL,
  `Hemolinfatico` longtext NOT NULL,
  `Sist_ostemus` longtext NOT NULL,
  `interro_esp` longtext NOT NULL,
  `Habitus_exterior` longtext NOT NULL,
  `frecu_cardi` int(11) NOT NULL,
  `tension_arterial` varchar(70) NOT NULL,
  `frecu_respiratoria` int(11) NOT NULL,
  `temperatura` decimal(20,6) NOT NULL,
  `peso` int(11) NOT NULL,
  `talla` int(11) NOT NULL,
  `ICM` decimal(20,6) NOT NULL,
  `Cabeza` longtext NOT NULL,
  `Cuello` longtext NOT NULL,
  `Torax` longtext NOT NULL,
  `Abdomen` longtext NOT NULL,
  `Extremidades` longtext NOT NULL,
  `Genitales` longtext NOT NULL,
  `Explo_esp` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumo`
--

CREATE TABLE `insumo` (
  `insumo_id` int(11) NOT NULL,
  `insumo_stock` int(11) NOT NULL,
  `insumo_feregistro` date NOT NULL,
  `insumo_nombre` varchar(100) NOT NULL,
  `insumo_estatus` enum('ACTIVO','INACTIVO','AGOTADO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `insumo`
--

INSERT INTO `insumo` (`insumo_id`, `insumo_stock`, `insumo_feregistro`, `insumo_nombre`, `insumo_estatus`) VALUES
(1, 10, '2022-09-04', 'Gazas', 'ACTIVO'),
(2, 5, '2022-09-04', 'Guantes', 'ACTIVO'),
(3, 15, '2022-09-04', 'Jeringas ', 'INACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicamento`
--

CREATE TABLE `medicamento` (
  `medicamento_id` int(11) NOT NULL,
  `medicamento_nombre` varchar(50) NOT NULL,
  `medicamento_alias` varchar(50) NOT NULL,
  `medicamento_stock` int(11) NOT NULL,
  `medicamento_feregistro` date NOT NULL,
  `medicamento_estatus` enum('ACTIVO','INACTIVO','AGOTADO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `medicamento`
--

INSERT INTO `medicamento` (`medicamento_id`, `medicamento_nombre`, `medicamento_alias`, `medicamento_stock`, `medicamento_feregistro`, `medicamento_estatus`) VALUES
(1, 'Paracetamol', 'Omeprazol', 10, '2022-09-10', 'ACTIVO'),
(2, 'Naproxenos', 'Napros', 10, '2022-09-10', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medico`
--

CREATE TABLE `medico` (
  `medico_id` int(11) NOT NULL,
  `medico_nombre` varchar(50) NOT NULL,
  `medico_direccion` varchar(200) NOT NULL,
  `medico_sexo` char(2) NOT NULL,
  `medico_movil` varchar(10) NOT NULL,
  `medico_fenac` date NOT NULL,
  `medico_nrodocumento` char(12) NOT NULL,
  `medico_colegiatura` char(12) NOT NULL,
  `especialidad_id` int(11) NOT NULL,
  `usu_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `medico`
--

INSERT INTO `medico` (`medico_id`, `medico_nombre`, `medico_direccion`, `medico_sexo`, `medico_movil`, `medico_fenac`, `medico_nrodocumento`, `medico_colegiatura`, `especialidad_id`, `usu_id`) VALUES
(6, 'Doctor', 'prueba', 'M', '0123456789', '1988-11-18', '18721005', '5748200', 2, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `paciente_id` int(11) NOT NULL,
  `paciente_nombre` varchar(50) NOT NULL,
  `paciente_fenac` varchar(70) NOT NULL,
  `paciente_edad` varchar(10) NOT NULL,
  `paciente_sexo` char(1) NOT NULL,
  `paciente_relig` varchar(70) NOT NULL,
  `paciente_domi` varchar(200) NOT NULL,
  `paciente_tel` char(10) NOT NULL,
  `paciente_estciv` varchar(70) NOT NULL,
  `paciente_esco` varchar(70) NOT NULL,
  `paciente_ocup` varchar(70) NOT NULL,
  `paciente_lunac` varchar(70) NOT NULL,
  `paciente_resiact` varchar(70) NOT NULL,
  `paciente_da` varchar(70) NOT NULL,
  `paciente_curp` varchar(18) NOT NULL,
  `paciente_niveco` varchar(70) NOT NULL,
  `paciente_grupet` varchar(70) NOT NULL,
  `paciente_folio` varchar(70) NOT NULL,
  `paciente_estatus` enum('ACTIVO','INACTIVO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`paciente_id`, `paciente_nombre`, `paciente_fenac`, `paciente_edad`, `paciente_sexo`, `paciente_relig`, `paciente_domi`, `paciente_tel`, `paciente_estciv`, `paciente_esco`, `paciente_ocup`, `paciente_lunac`, `paciente_resiact`, `paciente_da`, `paciente_curp`, `paciente_niveco`, `paciente_grupet`, `paciente_folio`, `paciente_estatus`) VALUES
(1, 'John Doe', '1992-04-05', '30 año(s)', 'M', 'Desconocida', 'Desconocido', '0000000000', 'SOLTERO', 'Desconocida', 'Desconocida', 'Desconocido', 'Desconocida', 'NO', 'Desconocida', 'Desconocido', 'Desconocido', '666', 'ACTIVO'),
(2, 'Jane Doe', '1992-04-05', '30 año(s)', 'M', 'Desconocida', 'Desconocido', '1111111111', 'CASADO', 'Desconocida', 'Desconocida', 'Desconocido', 'Desconocida', 'SI', '123456789', 'Desconocido', 'Desconocido', '555', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `procedimiento`
--

CREATE TABLE `procedimiento` (
  `procedimiento_id` int(11) NOT NULL,
  `procedimiento_nombre` varchar(50) NOT NULL,
  `procedimiento_fecregistro` date NOT NULL,
  `procedimiento_estatus` enum('ACTIVO','INACTIVO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `procedimiento`
--

INSERT INTO `procedimiento` (`procedimiento_id`, `procedimiento_nombre`, `procedimiento_fecregistro`, `procedimiento_estatus`) VALUES
(1, 'Cirugía ', '2022-07-09', 'ACTIVO'),
(2, 'nose', '2022-07-12', 'INACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `rol_id` int(11) NOT NULL,
  `rol_nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`rol_id`, `rol_nombre`) VALUES
(1, 'ADMINISTRADOR'),
(2, 'INVITADO'),
(3, 'MEDICO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usu_id` int(11) NOT NULL,
  `usu_nombre` varchar(70) NOT NULL,
  `usu_contrasena` varchar(255) NOT NULL,
  `usu_sexo` char(1) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `usu_estatus` enum('ACTIVO','INACTIVO') NOT NULL,
  `usu_email` varchar(255) NOT NULL,
  `usu_intento` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usu_id`, `usu_nombre`, `usu_contrasena`, `usu_sexo`, `rol_id`, `usu_estatus`, `usu_email`, `usu_intento`) VALUES
(1, 'Ulises', 'sshshs', 'M', 1, 'ACTIVO', 'uliseshdez10@gmail.com', 0),
(2, 'Diego', '$2y$10$hXf.WlXv2NQGTZcjSNqduexbJegj9OoNKVZxTorsNJubr3c9gb7uu', 'M', 1, 'ACTIVO', '', 0),
(3, 'Admin2', '$2y$10$ndKFVLtfQyzXutDZGx9tWOIYokqUXITOctr1W9NzWcG3jR53Y0scu', 'M', 1, 'ACTIVO', '', 0),
(4, 'Oscar', '$2y$10$6D3vfScwV9oNfMy8JVHqguJkCpT9OPtHXKfbRTwCbxNEbnPtMP3Oa', 'M', 2, 'ACTIVO', '', 0),
(11, 'Doctor', '$2y$10$CM64aLJEx7QIKuDjlcnQ0uXZrKJOMk.6BnD7NlwCQiG1FpksPf7kG', 'M', 3, 'ACTIVO', 'doctor@gmail.com', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`cita_id`),
  ADD KEY `FK_cita_medico` (`medico_id`),
  ADD KEY `FK_cita_paciente` (`paciente_id`);

--
-- Indices de la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`consulta_id`),
  ADD KEY `FK_consulta_cita` (`cita_id`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`especialidad_id`);

--
-- Indices de la tabla `historia`
--
ALTER TABLE `historia`
  ADD PRIMARY KEY (`historia_id`),
  ADD KEY `paciente_id` (`paciente_id`);

--
-- Indices de la tabla `historialc`
--
ALTER TABLE `historialc`
  ADD PRIMARY KEY (`id_hiscli`);

--
-- Indices de la tabla `insumo`
--
ALTER TABLE `insumo`
  ADD PRIMARY KEY (`insumo_id`);

--
-- Indices de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  ADD PRIMARY KEY (`medicamento_id`);

--
-- Indices de la tabla `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`medico_id`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`paciente_id`);

--
-- Indices de la tabla `procedimiento`
--
ALTER TABLE `procedimiento`
  ADD PRIMARY KEY (`procedimiento_id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usu_id`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `cita_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `consulta`
--
ALTER TABLE `consulta`
  MODIFY `consulta_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `especialidad_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `historialc`
--
ALTER TABLE `historialc`
  MODIFY `id_hiscli` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `insumo`
--
ALTER TABLE `insumo`
  MODIFY `insumo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `medicamento`
--
ALTER TABLE `medicamento`
  MODIFY `medicamento_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `medico`
--
ALTER TABLE `medico`
  MODIFY `medico_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `paciente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `procedimiento`
--
ALTER TABLE `procedimiento`
  MODIFY `procedimiento_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `usu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`medico_id`) REFERENCES `medico` (`medico_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`paciente_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `FK_consulta_cita` FOREIGN KEY (`cita_id`) REFERENCES `cita` (`cita_id`);

--
-- Filtros para la tabla `historia`
--
ALTER TABLE `historia`
  ADD CONSTRAINT `paciente_id` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`paciente_id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `rol_id` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`rol_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
