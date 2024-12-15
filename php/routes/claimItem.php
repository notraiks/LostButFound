<?php
require_once '../config/connect.php';
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method."]);
    exit();
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized. Please log in to continue."]);
    exit();
}

// Retrieve input and validate
$data = json_decode(file_get_contents("php://input"), true);
$item_id = $data['item_id'] ?? null;
if (!$item_id || !is_numeric($item_id)) {
    http_response_code(400);
    echo json_encode(["error" => "Valid Item ID is required."]);
    exit();
}

$user_id = $_SESSION['user_id'];

// Check if the item exists
$itemCheckStmt = $conn->prepare("SELECT status FROM found_item WHERE item_id = ?");
$itemCheckStmt->bind_param("i", $item_id);
$itemCheckStmt->execute();
$result = $itemCheckStmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["error" => "Item not found."]);
    $itemCheckStmt->close();
    exit();
}

$item = $result->fetch_assoc();
if ($item['status'] === 'Claimed') {
    http_response_code(400);
    echo json_encode(["error" => "Item has already been claimed."]);
    $itemCheckStmt->close();
    exit();
}
$itemCheckStmt->close();

// Check for duplicate pending claims
$duplicateStmt = $conn->prepare("SELECT * FROM claim_requests WHERE item_id = ? AND user_id = ? AND status = 'pending'");
$duplicateStmt->bind_param("ii", $item_id, $user_id);
$duplicateStmt->execute();
if ($duplicateStmt->get_result()->num_rows > 0) {
    http_response_code(409);
    echo json_encode(["error" => "You already have a pending claim for this item."]);
    $duplicateStmt->close();
    exit();
}
$duplicateStmt->close();

// Insert the claim request
$stmt = $conn->prepare("INSERT INTO claim_requests (item_id, user_id, status, request_date) VALUES (?, ?, 'pending', NOW())");
$stmt->bind_param("ii", $item_id, $user_id);

if ($stmt->execute()) {
    echo json_encode(["success" => "Claim request submitted successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to submit claim request: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
