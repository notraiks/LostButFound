<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
session_start();

if (isset($_SESSION['user_id'])) {
    echo json_encode(["success" => true, "user_id" => $_SESSION['user_id']]);
} else {
    echo json_encode(["success" => false]);
}
?>
