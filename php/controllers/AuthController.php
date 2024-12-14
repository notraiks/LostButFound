<?php
require_once '../config/connect.php';
require_once '../models/User.php';

class AuthController {
    public function login($email, $password) {
        global $conn;

        $stmt = $conn->prepare("SELECT user_id, username, password, role FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();

            if (password_verify($password, $user['password'])) {
                echo json_encode([
                    "success" => true,
                    "user_id" => $user['user_id'],
                    "username" => $user['username'],
                    "role" => $user['role']
                ]);
            } else {
                http_response_code(401);
                echo json_encode(["error" => "Invalid Email or Password"]);
            }
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Invalid Email or Password"]);
        }

        $stmt->close();
    }

    public function register($username, $email, $password, $phoneNumber) {
        global $conn;

        $checkStmt = $conn->prepare("SELECT * FROM users WHERE email = ? OR username = ?");
        $checkStmt->bind_param("ss", $email, $username);
        $checkStmt->execute();
        $result = $checkStmt->get_result();

        if ($result->num_rows > 0) {
            http_response_code(400);
            echo json_encode(["error" => "Username or Email already exists"]);
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO users (username, email, password, phone_number, role) VALUES (?, ?, ?, ?, 'student')");
            $stmt->bind_param("ssss", $username, $email, $hashedPassword, $phoneNumber);

            if ($stmt->execute()) {
                echo json_encode(["success" => "Account created successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["error" => "Failed to create account: " . $stmt->error]);
            }

            $stmt->close();
        }

        $checkStmt->close();
    }
}
?>
