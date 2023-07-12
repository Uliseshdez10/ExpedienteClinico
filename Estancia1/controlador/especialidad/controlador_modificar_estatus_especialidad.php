<?php
    require '../../modelo/modelo_especialidad.php';

    $MP = new Modelo_Especialidad();
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $estatus = htmlspecialchars($_POST['estatus'],ENT_QUOTES,'UTF-8');
    $consulta = $MP->Modificar_Estatus_Especialidad($id,$estatus);
    echo $consulta;

?>