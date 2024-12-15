<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../controllers/AuthController.php';

$data = json_decode(file_get_contents("php://input"), true);

$firstName = $data['firstName'] ?? '';
$lastName = $data['lastName'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$phoneNumber = $data['phoneNumber'] ?? '';

if (empty($firstName) || empty($lastName) || empty($email) || empty($password) || empty($phoneNumber)) {
    http_response_code(400);
    echo json_encode(["error" => "All fields are required."]);
    exit();
}

$authController = new AuthController();
$authController->register($firstName, $lastName, $email, $password, $phoneNumber);
?>
