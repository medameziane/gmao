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
    if (isset($path[3]) && is_numeric($path[3])) {
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $categories = $stmt->fetch(PDO::FETCH_ASSOC);
    } else {
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    echo json_encode($categories);
    break;

    case "POST":
    $equipe = json_decode(file_get_contents('php://input'));
    $sql = "INSERT INTO categorie VALUES (NULL,'$equipe->name', '$equipe->description',NULL,CURRENT_DATE, '$equipe->prix', '$equipe->marque', '$equipe->reference', '$equipe->piecedeRechange','$equipe->document', NULL)";
    $stmt = $conn->prepare($sql);

    if ($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Record created successfully.'];
    } else {
        $response = ['status' => 0, 'message' => 'Failed to create record.'];
    }
    echo "succes";
    break;
}
