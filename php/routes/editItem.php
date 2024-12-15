<?php
session_start();
header("Content-Type: application/json");
require_once '../config/connect.php';

$item_id = $_POST['item_id'] ?? null;
$title = $_POST['title'] ?? null;
$category = $_POST['category'] ?? null;
$location_found = $_POST['location_found'] ?? null;
$description = $_POST['description'] ?? null;
$date_found = $_POST['date_found'] ?? null;
$time_found = $_POST['time_found'] ?? null;
$item_img = $_FILES['item_img'] ?? null;

if (
    !$item_id ||
    !$title ||
    !$category ||
    !$location_found ||
    !$description ||
    !$date_found ||
    !$time_found
) {
    echo json_encode(["success" => false, "error" => "Incomplete input"]);
    exit;
}

$imagePath = null;

if ($item_img && $item_img['tmp_name']) {
    $uploadDir = '../../src/assets/user_uploads/';
    $imagePath = $uploadDir . basename($item_img['name']);
    if (!move_uploaded_file($item_img['tmp_name'], $imagePath)) {
        echo json_encode(["success" => false, "error" => "Failed to upload image"]);
        exit;
    }
}

$sql = "UPDATE found_item SET title=?, category=?, location_found=?, description=?, date_found=?, time_found=?";
$params = [$title, $category, $location_found, $description, $date_found, $time_found];

if ($imagePath) {
    $sql .= ", item_img=?";
    $params[] = "src/assets/user_uploads/" . basename($item_img['name']);
}

$sql .= " WHERE item_id=?";
$params[] = $item_id;

$stmt = $conn->prepare($sql);
$stmt->bind_param(str_repeat("s", count($params) - 1) . "i", ...$params);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Database update failed"]);
}
?>
