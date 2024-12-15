<?php
session_start();
header("Content-Type: application/json");
require_once '../config/connect.php';

$data = json_decode(file_get_contents("php://input"), true);
$item_id = $data['item_id'] ?? null;

if (!$item_id) {
    echo json_encode(["success" => false, "error" => "Item ID is required."]);
    exit;
}

$sql = "UPDATE found_item SET status = 'Removed' WHERE item_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $item_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Item removed successfully."]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to remove item."]);
}
?>
