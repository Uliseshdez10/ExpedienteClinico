<?php
session_start();
if(!isset($_SESSION['S_IDUSUARIO'])){
	header('Location: ../../../../Login/index.php');
}
?>

<?php

require_once __DIR__ . '/../vendor/autoload.php';
require_once '../../../conexion_reportes/r_conexion.php';
$consulta = " ='".$_GET['id']."'";
$html="<h1>REPORTE</h1>";

$mpdf = new \Mpdf\Mpdf(['mode' => 'utf-8', 'format' => 'A4']);
$mpdf->WriteHTML($html);
$mpdf->Output();