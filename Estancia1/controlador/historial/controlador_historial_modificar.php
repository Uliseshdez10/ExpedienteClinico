<?php
    require '../../modelo/modelo_historial.php';
    $MH = new Modelo_Historial();//Instanciamos

    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    //$nombres = htmlspecialchars($_POST['nombres'],ENT_QUOTES,'UTF-8');
    $dato1 = htmlspecialchars($_POST['dato1'],ENT_QUOTES,'UTF-8');
    $dato2 = htmlspecialchars($_POST['dato2'],ENT_QUOTES,'UTF-8');
    $dato3 = htmlspecialchars($_POST['dato3'],ENT_QUOTES,'UTF-8');
    $dato4 = htmlspecialchars($_POST['dato4'],ENT_QUOTES,'UTF-8');
    $dato5 = htmlspecialchars($_POST['dato5'],ENT_QUOTES,'UTF-8');
    $dato6 = htmlspecialchars($_POST['dato6'],ENT_QUOTES,'UTF-8');
    $dato7 = htmlspecialchars($_POST['dato7'],ENT_QUOTES,'UTF-8');
    $dato8 = htmlspecialchars($_POST['dato8'],ENT_QUOTES,'UTF-8');
    $dato9 = htmlspecialchars($_POST['dato9'],ENT_QUOTES,'UTF-8');
    $dato10 = htmlspecialchars($_POST['dato10'],ENT_QUOTES,'UTF-8');
    $dato11 = htmlspecialchars($_POST['dato11'],ENT_QUOTES,'UTF-8');
    $dato12 = htmlspecialchars($_POST['dato12'],ENT_QUOTES,'UTF-8');
    $dato13 = htmlspecialchars($_POST['dato13'],ENT_QUOTES,'UTF-8');
    $dato14 = htmlspecialchars($_POST['dato14'],ENT_QUOTES,'UTF-8');
    $dato15 = htmlspecialchars($_POST['dato15'],ENT_QUOTES,'UTF-8');
    $dato16 = htmlspecialchars($_POST['dato16'],ENT_QUOTES,'UTF-8');
    $dato17 = htmlspecialchars($_POST['dato17'],ENT_QUOTES,'UTF-8');
    $dato18 = htmlspecialchars($_POST['dato18'],ENT_QUOTES,'UTF-8');
    $dato19 = htmlspecialchars($_POST['dato19'],ENT_QUOTES,'UTF-8');
    $dato20 = htmlspecialchars($_POST['dato20'],ENT_QUOTES,'UTF-8');
    $dato21 = htmlspecialchars($_POST['dato21'],ENT_QUOTES,'UTF-8');
    $dato22 = htmlspecialchars($_POST['dato22'],ENT_QUOTES,'UTF-8');
    $dato23 = htmlspecialchars($_POST['dato23'],ENT_QUOTES,'UTF-8');
    $dato24 = htmlspecialchars($_POST['dato24'],ENT_QUOTES,'UTF-8');
    $dato25 = htmlspecialchars($_POST['dato25'],ENT_QUOTES,'UTF-8');
    $dato26 = htmlspecialchars($_POST['dato26'],ENT_QUOTES,'UTF-8');
    $dato27 = htmlspecialchars($_POST['dato27'],ENT_QUOTES,'UTF-8');
    $dato28 = htmlspecialchars($_POST['dato28'],ENT_QUOTES,'UTF-8');
    $dato29 = htmlspecialchars($_POST['dato29'],ENT_QUOTES,'UTF-8');
    $dato30 = htmlspecialchars($_POST['dato30'],ENT_QUOTES,'UTF-8');
    $dato31 = htmlspecialchars($_POST['dato31'],ENT_QUOTES,'UTF-8');
    $dato32 = htmlspecialchars($_POST['dato32'],ENT_QUOTES,'UTF-8');
    $dato33 = htmlspecialchars($_POST['dato33'],ENT_QUOTES,'UTF-8');
    $dato34 = htmlspecialchars($_POST['dato34'],ENT_QUOTES,'UTF-8');
    $dato35 = htmlspecialchars($_POST['dato35'],ENT_QUOTES,'UTF-8');

    $consulta = $MH->Modificar_Historial($id,$dato1,$dato2,$dato3,$dato4,$dato5,$dato6,$dato7,$dato8,$dato9,$dato10,$dato11,
    $dato12,$dato13,$dato14,$dato15,$dato16,$dato17,$dato18,$dato19,$dato20,$dato21,$dato22,$dato23,$dato24,$dato25,$dato26,$dato27,$dato28,
    $dato29,$dato30,$dato31,$dato32,$dato33,$dato34,$dato35);
    echo $consulta;
?>