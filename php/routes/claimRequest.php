<?php
require_once '../controllers/ClaimRequestController.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$controller = new ClaimRequestController();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller->getAllRequests();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $request_id = $data['request_id'] ?? null;
    $status = $data['status'] ?? null;
    $processed_by = $_SESSION['user_id'] ?? null;

    if (!$request_id || !$status || !$processed_by) {
        http_response_code(400);
        echo json_encode(["error" => "Missing required fields."]);
        exit();
    }

    $controller->updateRequestStatus($request_id, $status, $processed_by);
} else {
    http_response_code(405);
    echo json_encode(["error" => "Invalid request method."]);
}
?>
