<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/connect.php';

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$firstName = $data['firstName'] ?? '';
$lastName = $data['lastName'] ?? '';
$email = $data['email'] ?? '';
$phoneNumber = $data['phoneNumber'] ?? '';
$yrCourse = $data['yrCourse'] ?? '';
$newPassword = $data['newPassword'] ?? '';

if (!$user_id) {
    http_response_code(400);
    echo json_encode(["error" => "User ID is required"]);
    exit();
}

try {
    // Check if the email is already used by another user
    $checkStmt = $conn->prepare("SELECT user_id FROM users WHERE email = ? AND user_id != ?");
    $checkStmt->bind_param("si", $email, $user_id);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();

    if ($checkResult->num_rows > 0) {
        http_response_code(400);
        echo json_encode(["error" => "Email is already taken by another user"]);
        exit();
    }

    // Update user details
    if ($newPassword) {
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE users SET first_name = ?, last_name = ?, email = ?, phone_number = ?, yr_course = ?, password = ? WHERE user_id = ?");
        $stmt->bind_param("ssssssi", $firstName, $lastName, $email, $phoneNumber, $yrCourse, $hashedPassword, $user_id);
    } else {
        $stmt = $conn->prepare("UPDATE users SET first_name = ?, last_name = ?, email = ?, phone_number = ?, yr_course = ? WHERE user_id = ?");
        $stmt->bind_param("sssssi", $firstName, $lastName, $email, $phoneNumber, $yrCourse, $user_id);
    }

    if ($stmt->execute()) {
        echo json_encode(["success" => "Profile updated successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to update profile: " . $stmt->error]);
    }

    $stmt->close();
    $checkStmt->close();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "An error occurred: " . $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
