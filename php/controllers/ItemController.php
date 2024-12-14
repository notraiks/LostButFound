<?php
include_once '../config/connect.php';
include_once '../models/Item.php';

class ItemController {
    public function getItemById($id) {
        global $conn;

        $stmt = $conn->prepare("
            SELECT fi.item_id, fi.title, fi.description, fi.date_found, fi.time_found, fi.location_found, fi.category, fi.status, 
                   fi.item_img, u.username, u.email 
            FROM found_item AS fi
            LEFT JOIN users AS u ON fi.user_id = u.user_id
            WHERE fi.item_id = ?
        ");

        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to prepare statement: " . $conn->error]);
            return;
        }

        $stmt->bind_param("i", $id);
        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["error" => "Execution failed: " . $stmt->error]);
            return;
        }

        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            echo json_encode($result->fetch_assoc());
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Item not found"]);
        }

        $stmt->close();
    }

    public function getAllItems() {
        global $conn;

        $sql = "
            SELECT fi.item_id, fi.title, fi.description, fi.date_found, fi.time_found, fi.location_found, fi.category, fi.status, 
                   fi.item_img, u.username, u.email 
            FROM found_item AS fi
            LEFT JOIN users AS u ON fi.user_id = u.user_id
            ORDER BY fi.date_found DESC
        ";

        $result = $conn->query($sql);

        if (!$result) {
            http_response_code(500);
            echo json_encode(["error" => "Query failed: " . $conn->error]);
            return;
        }

        $items = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $items[] = new Item(
                    $row['item_id'],
                    $row['title'],
                    $row['description'],
                    $row['date_found'],
                    $row['time_found'],
                    $row['location_found'],
                    $row['category'],
                    $row['status'],
                    $row['item_img'],
                    $row['username'],
                    $row['email']
                );
            }
        } else {
            http_response_code(404);
            echo json_encode(["message" => "No items found"]);
            return;
        }

        echo json_encode($items);
    }
}
?>
