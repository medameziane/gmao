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
    $sql = "SELECT * FROM equipement";
    $path = explode('/', $_SERVER['REQUEST_URI']);
    if (isset($path[5]) && is_numeric($path[5])) {
      $sql = "SELECT * FROM equipement Where id =:id";
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(':id', $path[5]);
      $stmt->execute();
      $equipements = $stmt->fetch();
    } else {
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $equipements = $stmt->fetchAll();
    }
    echo json_encode($equipements);
    break;
  
  case "POST":
    $equipe = json_decode(file_get_contents('php://input'));

    $target_dir = "../images/";
    $target_file = $target_dir . basename($_FILES["picture"]["name"]);
    move_uploaded_file($_FILES["picture"]["tmp_name"], $target_file);
    
    $target_dir_document = "../documents/";
    $target_file_document = $target_dir_document . basename($_FILES["document"]["name"]);
    move_uploaded_file($_FILES["document"]["tmp_name"], $target_file_document);

    $sql = "INSERT INTO equipement VALUES(
              NULL,
              '$equipe->nom',
              '$equipe->description',
                CURRENT_DATE,
              '$equipe->prix',
              '$equipe->marque',
              '$equipe->reference',
              '$equipe->piecedeRechange',
              '$equipe->document',
              '$equipe->imageData',
              '$equipe->categorie_id',
              '$equipe->service_id'
            )";

    $stmt = $conn->prepare($sql);
    if ($stmt->execute()) {
      $response = ['status' => 1, 'message' => 'Record created successfully.'];
    }else {
      $response = ['status' => 0, 'message' => 'Failed to create record.'];
    }
    break;

  case "PUT":
    $equipe = json_decode( file_get_contents('php://input'));
    $target_dir = "../images/";
    $target_file = $target_dir . basename($_FILES["picture"]["name"]);
    move_uploaded_file($_FILES["picture"]["tmp_name"], $target_file);
    
    $target_dir_document = "../documents/";
    $target_file_document = $target_dir_document . basename($_FILES["document"]["name"]);
    move_uploaded_file($_FILES["document"]["tmp_name"], $target_file_document);

    $sql = "UPDATE equipement SET 
                                  nom='$equipe->nom',
                                  description='$equipe->description',
                                  prix='$equipe->prix',
                                  marque='$equipe->marque',
                                  reference='$equipe->reference',
                                  categorie_id='$equipe->categorie_id',
                                  service_id='$equipe->service_id' 
                                WHERE id= :id";
    
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $path[5]);

    if($stmt->execute()) {
        $response = ['status' => 1, 'message' => 'Record updated successfully.'];
    } else {
        $response = ['status' => 0, 'message' => 'Failed to update record.'];
    }
    echo json_encode($response);
    break;

  case "DELETE":
    $sql = "DELETE FROM equipement WHERE id = :id";
    $path = explode('/', $_SERVER['REQUEST_URI']);
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $path[5]);
    $stmt->execute();
    break;
}
