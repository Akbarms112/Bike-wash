<?php
// session_start();
// $conn = new mysqli("localhost", "root", "", "user_db"); // Update database name if needed

// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $email = $_POST["email"];
//     $password = $_POST["password"];

//     $query = "SELECT * FROM users WHERE email='$email'";
//     $result = $conn->query($query);

//     if ($result->num_rows > 0) {
//         $row = $result->fetch_assoc();
//         if (password_verify($password, $row["password"])) {
//             $_SESSION["user"] = $row["full_name"];
//             echo "<script>alert('Login successful! Redirecting to dashboard...'); window.location='dashboard.html';</script>";
//             exit();
//         } else {
//             echo "<script>alert('Invalid password!');</script>";
//         }
//     } else {
//         echo "<script>alert('No user found with this email!');</script>";
//     }
// }



ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

// CORS Headers (Set only for OPTIONS request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit(0); // Exit to prevent further execution
}

// Set JSON response headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Database connection
$conn = new mysqli("localhost", "root", "", "user_db");

// Check if database connection failed
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Read JSON input
$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

// Validate JSON input
if (!$data) {
    echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
    exit();
}

// Extract email and password with validation
$email = isset($data['email']) ? trim($data['email']) : "";
$password = isset($data['pass']) ? trim($data['pass']) : "";

if (empty($email) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Email and password are required"]);
    exit();
}

// Prevent SQL Injection by using prepared statements
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
    exit();
}

$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Check if user exists
if ($row = $result->fetch_assoc()) {
    if (password_verify($password, $row['password'])) {
        $_SESSION['email'] = $email;
        echo json_encode(["success" => true, "message" => "Login successful"]);
        exit();
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect password"]);
        exit();
    }
} else {
    echo json_encode(["success" => false, "message" => "User not found"]);
}

// Close database connection
$stmt->close();
$conn->close();



















// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// session_start();

// // CORS Headers (Only set once)
// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Methods: POST");

// // Database connection
// $conn = new mysqli("localhost", "root", "", "user_db");

// // Check if database connection failed
// if ($conn->connect_error) {
//     echo json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]);
//     exit();
// }

// // Read JSON input
// // $jsonData = file_get_contents("php://input");
// // $data = json_decode($jsonData, true);
// $data = json_decode(file_get_contents("php://input"), true);
// // Validate JSON input
// if (!$data) {
//     echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
//     exit;
// }

// print_r($_POST); // ✅ Debug incoming POST data
// error_log(json_encode($_POST));
// // Get email and password
// $email = trim($data['email'] ?? '');
// $password = trim($data['pass'] ?? '');

// // Validate input fields
// if (empty($email) || empty($password)) {
//     echo json_encode(["success" => false, "message" => "Email and password are required"]);
//     exit();
// }

// // Check if user exists in database
// $sql = "SELECT * FROM users WHERE email = ?";
// $stmt = $conn->prepare($sql);
// $stmt->bind_param("s", $email);
// $stmt->execute();
// $result = $stmt->get_result();

// // If user found, verify password
// if ($row = $result->fetch_assoc()) {
//     if (password_verify($password, $row['password'])) {
//         $_SESSION['email'] = $email;
//         echo json_encode(["success" => true, "message" => "Login successful"]);
//     } else {
//         echo json_encode(["success" => false, "message" => "Incorrect password"]);
//     }
// } else {
//     echo json_encode(["success" => false, "message" => "User not found"]);
// }
// $response = ["success" => true, "message" => "Test response"];
// echo json_encode($response);
// // Close database connection
// $stmt->close();
// $conn->close();













// header("Access-Control-Allow-Origin: http://localhost:5173/Userlogin"); 
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");
// header("Content-Type: application/json"); // Set JSON response type

// session_start();

// // Database connection
// $conn = new mysqli("localhost", "root", "", "user_db");

// if ($conn->connect_error) {
//     echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
//     exit();
// }

// // Get input data and validate
// $data = json_decode(file_get_contents("php://input"), true);



// $email = isset($data["email"]) ? trim($data["email"]) : "";
// $password = isset($data["pass"]) ? $data["pass"] : "";

// if (empty($email) || empty($password)) {
//     echo json_encode(["success" => false, "message" => "Email and password are required."]);
//     exit();
// }

// // Use prepared statements to prevent SQL injection
// $query = "SELECT full_name, password FROM users WHERE email = ?";
// $stmt = $conn->prepare($query);
// $stmt->bind_param("s", $email);
// $stmt->execute();
// $result = $stmt->get_result();

// // Check if user exists
// if ($result->num_rows > 0) {
//     $row = $result->fetch_assoc();
//     if (password_verify($password, $row["password"])) {
//         $_SESSION["user"] = $row["full_name"];
//         echo json_encode(["success" => true, "message" => "Login successful!", "user" => $row["full_name"]]);
//     } else {
//         echo json_encode(["success" => false, "message" => "Invalid password!"]);
//     }
// } else {
//     echo json_encode(["success" => false, "message" => "No user found with this email!"]);
// }

// // Close the statement and connection
// session_regenerate_id(true); // Prevents session fixation
// $_SESSION["user"] = $row["full_name"];

// $stmt->close();
// $conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Login</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
        body { display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #1e3c72, #2a5298); }
        .container { display: flex; justify-content: center; align-items: center; width: 100%; }
        .form-box { background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); width: 350px; text-align: center; }
        h2 { margin-bottom: 20px; }
        .input-group { margin: 10px 0; }
        input { width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 5px; }
        .btn { width: 100%; padding: 10px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px; font-size: 16px; }
        .btn:hover { background: #0056b3; }
        .toggle-text { margin-top: 15px; }
        .toggle-text a { color: #007bff; text-decoration: none; }
        .toggle-text a:hover { text-decoration: underline; }
    </style>
</head>
<body>

    <div class="container">
        <div class="form-box">
            <h2>Login</h2>
            <form method="POST">
                <div class="input-group">
                    <input type="email" name="email" placeholder="Email Address" required>
                </div>
                <div class="input-group">
                    <input type="password" name="password" placeholder="Password" required>
                </div>
                <button type="submit" class="btn">Login</button>
            </form>
            <p class="toggle-text">
                Don't have an account? <a href="User_signup.php">Sign Up</a>
            </p>
        </div>
    </div>

</body>
</html>
