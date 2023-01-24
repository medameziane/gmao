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
    $sql = "SELECT * FROM categorie";
    $path = explode('/', $_SERVER['REQUEST_URI']);
    if (isset($path[5]) && is_numeric($path[5])){
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $categorie = $stmt->fetch();
    } else {
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $categorie = $stmt->fetchAll();
    }
    echo json_encode($categorie);
    break;
  case "POST":
    $equipe = json_decode(file_get_contents('php://input'));
    $sql = "INSERT INTO categorie VALUES(NULL,'$equipe->categorie')";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute()) {
      $response = ['status' => 1, 'message' => 'Record created successfully.'];
    }else {
      $response = ['status' => 0, 'message' => 'Failed to create record.'];
    }
    break;
}