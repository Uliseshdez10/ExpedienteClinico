<?php
    require'../../modelo/modelo_historial.php';
    $MH = new Modelo_Historial();//Instanciamos
    $consulta = $MH->listar_paciente_combo();
    echo json_encode($consulta);
?>