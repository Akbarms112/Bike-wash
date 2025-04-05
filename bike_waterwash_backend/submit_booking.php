<?php
require 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['user'], $_POST['phone'], $_POST['shop_name'])) {
    $user = $_POST['user'];
    $phone = $_POST['phone'];
    $shop_name = $_POST['shop_name'];
    
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $query = "INSERT INTO bookings (user, phone, shop_name, booking_time, pickup_time, drop_time, status) 
              VALUES (?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 'Not Paid')";

    $stmt = $conn->prepare($query);
    $stmt->bind_param("sss", $user, $phone, $shop_name);
    $stmt->execute();
    
    if ($stmt->affected_rows > 0) {
        echo "Booking successfully added!";
    } else {
        echo "Error adding booking.";
    }

    $stmt->close();
    $conn->close();
}
?>
