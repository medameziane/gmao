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
    $sql = "SELECT * FROM tache";
    $path = explode('/', $_SERVER['REQUEST_URI']);
    if (isset($path[3]) && is_numeric($path[3])) {
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $tasks = $stmt->fetch();
    } else {
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $tasks = $stmt->fetchAll();
    }
    echo json_encode($tasks);
    break;

  case "POST":
    $equipe = json_decode(file_get_contents('php://input'));
    $sql = "INSERT INTO tache VALUES (NULL,'$equipe->titre','$equipe->description',CURRENT_DATE,'10', '$equipe->etat_id', '$equipe->equipement_id')";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute()) {
      $response = ['status' => 1, 'message' => 'Record created successfully.'];
    }else {
      $response = ['status' => 0, 'message' => 'Failed to create record.'];
    }
    break;
}

