<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include './db.php';

$myTable = $_GET["table"];

switch($myTable){
  case "tache":
    $sql = "SELECT * FROM $myTable";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $etat = $stmt->fetchAll();
    break;
    
  case "service":
    $sql = "SELECT * FROM $myTable";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $etat = $stmt->fetchAll();
    break;

  case "technicien":
    $sql = "SELECT * FROM $myTable";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $etat = $stmt->fetchAll();
    break;

  case "activite":
    $sql = "SELECT * FROM $myTable";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $etat = $stmt->fetchAll();
    break;

  case "categorie":
    $sql = "SELECT * FROM $myTable";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $etat = $stmt->fetchAll();
    break;

}
echo json_encode($etat);

$method = $_SERVER['REQUEST_METHOD'];
$path = explode('/', $_SERVER['REQUEST_URI']);
// switch ($method){
//   case "GET":
//     if (isset($path[5]) && is_numeric($path[5])) {
//       $stmt = $conn->prepare($sql);
//       $stmt->execute();
//       $etat = $stmt->fetch();
//     } else {
//     }
//     echo json_encode($etat);
//     break;
// }