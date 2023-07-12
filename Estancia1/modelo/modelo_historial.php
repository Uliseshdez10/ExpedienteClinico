<?php
    class Modelo_Historial{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }

        function listar_historial(){
            $sql = "call SP_LISTAR_HISTORIAL()";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)){
                while($consulta_VU = mysqli_fetch_assoc($consulta)){
                    $arreglo["data"][]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }

        function listar_paciente_combo(){
            $sql = "call SP_LISTAR_PACIENTE_COMBO_HISTORIAL()";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)){
                while($consulta_VU = mysqli_fetch_array($consulta)){
                    $arreglo[]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }

        /*function Registrar_Historial($nombres,$dato1,$dato2,$dato3,$dato4,$dato5,$dato6,$dato7,$dato8,$dato9,$dato10,$dato11,
            $dato12,$dato13,$dato14,$dato15,$dato16,$dato17,$dato18,$dato19,$dato20,$dato21,$dato22,$dato23,$dato24,$dato25,$dato26,$dato27,$dato28,
            $dato29,$dato30,$dato31,$dato32,$dato33,$dato34,$dato35){
            $sql = "call SP_REGISTRAR_HISTORIAL('$nombres','$dato1','$dato2','$dato3','$dato4','$dato5','$dato6','$dato7','$dato8','$dato9','$dato10','$dato11','$dato12',
            '$dato13','$dato14','$dato15','$dato16','$dato17','$dato18','$dato19','$dato20','$dato21','$dato22','$dato23','$dato24','$dato25','$dato26','$dato27','$dato28','$dato29',
            '$dato30','$dato31','$dato32','$dato33','$dato34','$dato35')";
            if ($consulta = $this->conexion->conexion->query($sql)){
                if($row = mysqli_fetch_array($consulta)){
                    return $id = trim($row[0]);//retorna valores
                }
                $this->conexion->cerrar();
            }
        }*/

        function Registrar_Historial($nombres,$dato1,$dato2,$dato3,$dato4,$dato5,$dato6,$dato7,$dato8,$dato9,$dato10,$dato11,
        $dato12,$dato13,$dato14,$dato15,$dato16,$dato17,$dato18,$dato19,$dato20,$dato21,$dato22,$dato23,$dato24,$dato25,$dato26,$dato27,$dato28,
        $dato29,$dato30,$dato31,$dato32,$dato33,$dato34,$dato35){
            $sql = "call SP_REGISTRAR_HISTORIAL('$nombres','$dato1','$dato2','$dato3','$dato4','$dato5','$dato6','$dato7','$dato8','$dato9','$dato10','$dato11','
            $dato12','$dato13','$dato14','$dato15','$dato16','$dato17','$dato18','$dato19','$dato20','$dato21','$dato22','$dato23','$dato24','$dato25','$dato26','$dato27','$dato28','
            $dato29','$dato30','$dato31','$dato32','$dato33','$dato34','$dato35')";
            if ($consulta = $this->conexion->conexion->query($sql)){
                return 1;
            }else{
                return 0;
            }
            $this->conexion->cerrar();
        }

        function Modificar_Historial($id,$dato1,$dato2,$dato3,$dato4,$dato5,$dato6,$dato7,$dato8,$dato9,$dato10,$dato11,
        $dato12,$dato13,$dato14,$dato15,$dato16,$dato17,$dato18,$dato19,$dato20,$dato21,$dato22,$dato23,$dato24,$dato25,$dato26,$dato27,$dato28,
        $dato29,$dato30,$dato31,$dato32,$dato33,$dato34,$dato35){
            $sql = "call SP_MODIFICAR_HISTORIAL('$id','$dato1','$dato2','$dato3','$dato4','$dato5','$dato6','$dato7','$dato8','$dato9','$dato10','$dato11','
            $dato12','$dato13','$dato14','$dato15','$dato16','$dato17','$dato18','$dato19','$dato20','$dato21','$dato22','$dato23','$dato24','$dato25','$dato26','$dato27','$dato28','
            $dato29','$dato30','$dato31','$dato32','$dato33','$dato34','$dato35')";
            if ($consulta = $this->conexion->conexion->query($sql)){
                return 1;
            }else{
                return 0;
            }
            $this->conexion->cerrar();
        }
    }
?>


