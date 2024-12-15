<?php
include_once '../controllers/ItemController.php';

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$itemController = new ItemController();

if ($id) {
    $itemController->getItemById($id);
} else {
    $itemController->getAllItems();
}
?>
