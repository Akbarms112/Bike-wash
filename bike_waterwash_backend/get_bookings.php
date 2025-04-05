<?php
require 'config.php';

header('Content-Type: application/json');

try {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        throw new Exception("Database connection failed: " . $conn->connect_error);
    }

    $query = "SELECT id, user, phone, shop_name, booking_time, 
    DATE_ADD(booking_time, INTERVAL 1 HOUR) AS pickup_time, 
    DATE_ADD(booking_time, INTERVAL 3 HOUR) AS drop_time, 
    status 
    FROM bookings ORDER BY booking_time DESC";

    $result = $conn->query($query);

    if (!$result) {
        throw new Exception("Database error: " . $conn->error);
    }

    $bookings = [];
    while ($row = $result->fetch_assoc()) {
        $bookings[] = $row;
    }

    echo json_encode(["status" => "success", "data" => $bookings]);

    $conn->close();
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
