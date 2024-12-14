<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../controllers/AuthController.php';

$data = json_decode(file_get_contents("php://input"), true);


$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$authController = new AuthController();
$authController->login($email, $password);
?>
