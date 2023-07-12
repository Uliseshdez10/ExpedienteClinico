<?php
    require '../../modelo/modelo_paciente.php';

    $MP = new Modelo_Paciente();
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
    $consulta = $MP->Modificar_Estatus_Paciente($id,$estatus);
    echo $consulta;

?>