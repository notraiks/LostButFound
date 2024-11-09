<?php
header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json"); 
header("Access-Control-Allow-Methods: GET, POST"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization");
include("connect.php");

$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($id) {
    $stmt = $conn->prepare("
        SELECT fi.item_id, fi.title, fi.description, fi.date_found, fi.time_found, fi.location_found, fi.category, fi.status, 
               fi.item_img, u.username, u.email 
        FROM found_item AS fi
        LEFT JOIN users AS u ON fi.user_id = u.user_id
        WHERE fi.item_id = ?
    ");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    } else {
        echo json_encode(["error" => "Item not found"]);
    }
} else {
    $sql = "
        SELECT fi.item_id, fi.title, fi.description, fi.date_found, fi.time_found, fi.location_found, fi.category, fi.status, 
               fi.item_img, u.username, u.email 
        FROM found_item AS fi
        LEFT JOIN users AS u ON fi.user_id = u.user_id
        ORDER BY fi.date_found DESC
    ";

    $result = $conn->query($sql);

    $items = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $items[] = [
                'item_id' => $row['item_id'],  
                'title' => $row['title'],
                'description' => $row['description'],
                'date_found' => $row['date_found'],
                'time_found' => $row['time_found'],
                'location_found' => $row['location_found'],
                'category' => $row['category'],
                'status' => $row['status'],
                'item_img' => $row['item_img'],
                'username' => $row['username'],
                'email' => $row['email']
            ];
        }
    }
    echo json_encode($items);  
}

$conn->close();
?>