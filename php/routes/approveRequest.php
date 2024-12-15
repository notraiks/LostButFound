<?php
require_once '../config/connect.php';
require_once '../controllers/ClaimRequestController.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
session_start();

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Validate POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["error" => "Invalid request method."]);
    exit();
}

// Get and validate request body
$data = json_decode(file_get_contents("php://input"), true);
$request_id = $data['request_id'] ?? null;
$item_id = $data['item_id'] ?? null;
$processed_by = $_SESSION['user_id'] ?? null; // User performing the approval

if (!$request_id || !$item_id || !$processed_by) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Request ID, Item ID, and processed_by are required."]);
    exit();
}

try {
    $conn->begin_transaction();

    // Update claim_requests: Set status to 'approved' and processed_by to the approving user's ID
    $updateClaimRequest = $conn->prepare("
        UPDATE claim_requests 
        SET status = 'approved', processed_by = ? 
        WHERE request_id = ? AND status = 'pending'
    ");
    $updateClaimRequest->bind_param("ii", $processed_by, $request_id);

    if (!$updateClaimRequest->execute() || $updateClaimRequest->affected_rows === 0) {
        throw new Exception("Failed to update claim_requests. Either it doesn't exist or is already approved.");
    }

    // Update found_item: Set status to 'Claimed' if it is currently 'Unclaimed'
    $updateFoundItem = $conn->prepare("
        UPDATE found_item 
        SET status = 'Claimed' 
        WHERE item_id = ? AND status = 'Unclaimed'
    ");
    $updateFoundItem->bind_param("i", $item_id);

    if (!$updateFoundItem->execute() || $updateFoundItem->affected_rows === 0) {
        throw new Exception("Failed to update found_item. Either it doesn't exist or is already claimed.");
    }

    $conn->commit();

    echo json_encode(["success" => "Request approved successfully."]);
} catch (Exception $e) {
    // Rollback the transaction on error
    $conn->rollback();
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => $e->getMessage()]);
} finally {
    // Close prepared statements
    if (isset($updateClaimRequest)) {
        $updateClaimRequest->close();
    }
    if (isset($updateFoundItem)) {
        $updateFoundItem->close();
    }

    // Close the database connection
    $conn->close();
}
