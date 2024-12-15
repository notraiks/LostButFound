<?php
session_start();
header("Content-Type: application/json");
require_once '../config/connect.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit();
}

$user_id = $_SESSION['user_id'];
$user_role = $_SESSION['role'];

try {
    if ($user_role === 'student') {
        // Student can only view items they claimed
        $stmt = $conn->prepare("
            SELECT fi.*
            FROM found_item fi
            JOIN claim_requests cr ON fi.item_id = cr.item_id
            WHERE cr.user_id = ? AND fi.status = 'Claimed'
        ");
        $stmt->bind_param("i", $user_id);
    } else {
        // Admin and staff can view all claimed items
        $stmt = $conn->prepare("
            SELECT fi.*
            FROM found_item fi
            WHERE fi.status = 'Claimed'
        ");
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $items = [];
    while ($row = $result->fetch_assoc()) {
        $items[] = $row;
    }

    echo json_encode($items);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error fetching claimed items: " . $e->getMessage()]);
}
?>
