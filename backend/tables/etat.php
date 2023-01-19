<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../db.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method){
  case "GET":
    $sql = "SELECT * FROM etat";
    $path = explode('/', $_SERVER['REQUEST_URI']);
    if (isset($path[5]) && is_numeric($path[5])) {
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $etat = $stmt->fetch();
    } else {
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $etat = $stmt->fetchAll();
    }
    echo json_encode($etat);
    break;
}