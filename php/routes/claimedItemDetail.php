<?php
include_once '../config/connect.php';

session_start();

$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($id) {
    // Query for claimed item details, including claimer information
    $sql = "
        SELECT fi.*, u.first_name AS claimer_first_name, u.last_name AS claimer_last_name,
               u.email AS claimer_email, u.phone_number AS claimer_phone_number,
               u.yr_course AS claimer_yr_course
        FROM found_item fi
        LEFT JOIN claim_requests cr ON fi.item_id = cr.item_id
        LEFT JOIN users u ON cr.user_id = u.user_id
        WHERE fi.item_id = ? AND fi.status = 'Claimed'
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        echo json_encode($result->fetch_assoc());
    } else {
        echo json_encode(["error" => "Claimed item not found."]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Item ID is required."]);
}
?>
