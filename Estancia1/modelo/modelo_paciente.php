<?php
    class Modelo_Paciente{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }

        function listar_paciente(){
            $sql = "call SP_LISTAR_PACIENTE()";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)){
                while($consulta_VU = mysqli_fetch_assoc($consulta)){
                    $arreglo["data"][]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }

        function Registrar_Paciente($nombres,$fenac,$edad,$sexo,$relig,$domi,$tel,$estciv,$esco,$ocup,$lunac,$resiact,$da,$curp,$niveco,$grupet,$folio){
            $sql = "call SP_REGISTRAR_PACIENTE('$nombres','$fenac','$edad','$sexo','$relig','$domi','$tel','$estciv','$esco','$ocup','$lunac','$resiact',
            '$da','$curp','$niveco','$grupet','$folio')";
            if ($consulta = $this->conexion->conexion->query($sql)){
                if($row = mysqli_fetch_array($consulta)){
                    return $id = trim($row[0]);//retorna valores
                }
                $this->conexion->cerrar();
            }
        }

        function Modificar_Paciente($id,$nombres,$fenac,$edad,$sexo,$relig,$domi,$tel,$estciv,$esco,$ocup,$lunac,
        $resiact,$da,$curp,$niveco,$grupet,$folioactual,$folionuevo,$estatus){
            $sql = "call SP_MODIFICAR_PACIENTE('$id','$nombres','$fenac','$edad','$sexo','$relig','$domi','$tel','$estciv','$esco','$ocup','$lunac','$resiact',
            '$da','$curp','$niveco','$grupet','$folioactual','$folionuevo','$estatus')";
            if ($consulta = $this->conexion->conexion->query($sql)){
                if($row = mysqli_fetch_array($consulta)){
                    return $id = trim($row[0]);//retorna valores
                }
                $this->conexion->cerrar();
            }
        }

        function Modificar_Estatus_Paciente($id,$estatus){
            $sql = "call SP_MODIFICAR_ESTATUS_PACIENTE('$id','$estatus')";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				return 1;
				
			}else{
				return 0;
			}
        }
    }
?>

