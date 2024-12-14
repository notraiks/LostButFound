<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include_once '../controllers/ItemController.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$itemController = new ItemController();

if ($id) {
    $itemController->getItemById($id);
} else {
    $itemController->getAllItems();
}
?>
