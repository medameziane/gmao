<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include '../db.php';

$method = $_SERVER['REQUEST_METHOD'];
switch ($method){
  case "POST":
    $equipe = json_decode(file_get_contents('php://input'));
    $sql = "INSERT INTO tache VALUES (NULL, '$equipe->description',CURRENT_DATE,'10', NULL, NULL)";
    $stmt = $conn->prepare($sql);

    if ($stmt->execute()) {
      $response = ['status' => 1, 'message' => 'Record created successfully.'];
    } else {
      $response = ['status' => 0, 'message' => 'Failed to create record.'];
    }
    break;
}

