<?php
    require '../../modelo/modelo_paciente.php';
    $MP = new Modelo_Paciente();//Instanciamos
    $nombres = htmlspecialchars($_POST['nombres'],ENT_QUOTES,'UTF-8');
    $fenac = htmlspecialchars($_POST['fenac'],ENT_QUOTES,'UTF-8');
    $edad = htmlspecialchars($_POST['edad'],ENT_QUOTES,'UTF-8');
    $sexo = htmlspecialchars($_POST['sexo'],ENT_QUOTES,'UTF-8');
    $relig = htmlspecialchars($_POST['relig'],ENT_QUOTES,'UTF-8');
    $domi = htmlspecialchars($_POST['domi'],ENT_QUOTES,'UTF-8');
    $tel = htmlspecialchars($_POST['tel'],ENT_QUOTES,'UTF-8');
    $estciv = htmlspecialchars($_POST['estciv'],ENT_QUOTES,'UTF-8');
    $esco = htmlspecialchars($_POST['esco'],ENT_QUOTES,'UTF-8');
    $ocup = htmlspecialchars($_POST['ocup'],ENT_QUOTES,'UTF-8');
    $lunac = htmlspecialchars($_POST['lunac'],ENT_QUOTES,'UTF-8');
    $resiact = htmlspecialchars($_POST['resiact'],ENT_QUOTES,'UTF-8');
    $da = htmlspecialchars($_POST['da'],ENT_QUOTES,'UTF-8');
    $curp = htmlspecialchars($_POST['curp'],ENT_QUOTES,'UTF-8');
    $niveco = htmlspecialchars($_POST['niveco'],ENT_QUOTES,'UTF-8');
    $grupet = htmlspecialchars($_POST['grupet'],ENT_QUOTES,'UTF-8');
    $folio = htmlspecialchars($_POST['folio'],ENT_QUOTES,'UTF-8');
    $consulta = $MP->Registrar_Paciente($nombres,$fenac,$edad,$sexo,$relig,$domi,$tel,$estciv,$esco,$ocup,$lunac,
    $resiact,$da,$curp,$niveco,$grupet,$folio);
    echo $consulta;
?>