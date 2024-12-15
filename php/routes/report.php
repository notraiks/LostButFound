<?php
include_once '../config/connect.php';
include_once './checkSession.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $category = $_POST['category'];
    $locationFound = $_POST['locationFound'];
    $dateFound = $_POST['dateFound'];
    $timeFound = $_POST['timeFound'];
    $description = $_POST['description'];
    $image = $_FILES['image'];

    $userId = $_SESSION['user_id'];

    // Define the upload directory
    $uploadDir = __DIR__ . '/../../src/assets/user_uploads/';

    // Ensure the upload directory exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $imagePath = null;
    if ($image && $image['tmp_name']) {
        $uniqueName = uniqid() . '-' . basename($image['name']);
        $imagePath = $uploadDir . $uniqueName;

        if (!move_uploaded_file($image['tmp_name'], $imagePath)) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to upload image. Please try again."]);
            exit();
        }

        // Save the relative path to the database
        $imagePath = 'src/assets/user_uploads/' . $uniqueName;
    }

    // Insert found item into the database
    $stmt = $conn->prepare("
        INSERT INTO found_item (title, description, date_found, time_found, location_found, category, status, item_img, user_id)
        VALUES (?, ?, ?, ?, ?, ?, 'Unclaimed', ?, ?)
    ");
    $stmt->bind_param("sssssssi", $title, $description, $dateFound, $timeFound, $locationFound, $category, $imagePath, $userId);

    if ($stmt->execute()) {
        echo json_encode(["success" => "The item has been successfully reported."]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "An error occurred while reporting the item. Please try again."]);
    }

    $stmt->close();
} else {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method."]);
}
?>
