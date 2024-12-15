<?php
require_once '../config/connect.php';
require_once '../models/ClaimRequest.php';

class ClaimRequestController {
    public function getAllRequests() {
        global $conn;

        $sql = "SELECT cr.request_id, cr.item_id, cr.user_id, cr.status, cr.request_date, cr.processed_by,
                       u.first_name AS user_first_name, u.last_name AS user_last_name, u.email AS user_email, 
                       u.phone_number AS user_phone_number, u.yr_course AS user_yr_course,
                       fi.title AS item_title, fi.item_img
                FROM claim_requests AS cr
                JOIN users AS u ON cr.user_id = u.user_id
                JOIN found_item AS fi ON cr.item_id = fi.item_id
                ORDER BY cr.request_date DESC";

        $result = $conn->query($sql);

        if (!$result) {
            http_response_code(500);
            echo json_encode(["error" => "Failed to fetch claim requests: " . $conn->error]);
            return;
        }

        $requests = [];
        while ($row = $result->fetch_assoc()) {
            $requests[] = [
                "request_id" => $row["request_id"],
                "item_id" => $row["item_id"],
                "user_id" => $row["user_id"],
                "status" => $row["status"],
                "request_date" => $row["request_date"],
                "processed_by" => $row["processed_by"],
                "user_first_name" => $row["user_first_name"],
                "user_last_name" => $row["user_last_name"],
                "user_email" => $row["user_email"],
                "user_phone_number" => $row["user_phone_number"],
                "user_yr_course" => $row["user_yr_course"],
                "item_title" => $row["item_title"],
                "item_img" => $row["item_img"],
            ];
        }

        echo json_encode($requests);
    }

    public function updateRequestStatus($request_id, $status, $processed_by) {
        global $conn;

        $stmt = $conn->prepare("UPDATE claim_requests SET status = ?, processed_by = ? WHERE request_id = ?");
        $stmt->bind_param("sii", $status, $processed_by, $request_id);

        if ($stmt->execute()) {
            echo json_encode(["success" => "Request status updated successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Failed to update request status: " . $stmt->error]);
        }

        $stmt->close();
    }

    public function approveRequest($request_id, $item_id, $processed_by) {
        global $conn;
    
        try {
            $conn->begin_transaction();
    
            // Update claim_requests status and processed_by
            $stmt1 = $conn->prepare("UPDATE claim_requests SET status = 'approved', processed_by = ? WHERE request_id = ?");
            $stmt1->bind_param("ii", $processed_by, $request_id);
    
            if (!$stmt1->execute()) {
                throw new Exception("Failed to update claim_requests: " . $stmt1->error);
            }
    
            // Update found_item status
            $stmt2 = $conn->prepare("UPDATE found_item SET status = 'Claimed' WHERE item_id = ?");
            $stmt2->bind_param("i", $item_id);
    
            if (!$stmt2->execute()) {
                throw new Exception("Failed to update found_item: " . $stmt2->error);
            }
    
            $conn->commit();
        } catch (Exception $e) {
            $conn->rollback();
            throw $e;
        } finally {
            $stmt1->close();
            $stmt2->close();
        }
    }
    

}
?>
