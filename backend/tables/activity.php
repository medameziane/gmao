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
    $sql = "SELECT * FROM activite";
    $path = explode('/', $_SERVER['REQUEST_URI']);
    if (isset($path[5]) && is_numeric($path[5])){
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':id', $path[5]);
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
    $sql = "INSERT INTO activite VALUES (NULL, 'Activite 1', 'CURRENT_DATE', '10', '3', '7', '4');";
    $stmt = $conn->prepare($sql);
    if ($stmt->execute()) {
      $response = ['status' => 1, 'message' => 'Record created successfully.'];
    }else {
      $response = ['status' => 0, 'message' => 'Failed to create record.'];
    }
    break;

  case "DELETE":
    $sql = "DELETE FROM activite WHERE id = :id";
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $path[5]);
    $stmt->execute();
    break;
}