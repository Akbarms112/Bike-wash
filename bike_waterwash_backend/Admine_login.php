<?php
session_start();
$conn = new mysqli("localhost", "root", "", "admin_db"); // Update database name if needed

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $query = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row["password"])) {
            $_SESSION["user"] = $row["full_name"];
            echo "<script>alert('Login successful! Redirecting to dashboard...'); window.location='admine_board.html';</script>";
            exit();
        } else {
            echo "<script>alert('Invalid password!');</script>";
        }
    } else {
        echo "<script>alert('No user found with this email!');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login</title>
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
                Don't have an account? <a href="Admine_signup.php">Sign Up</a>
            </p>
        </div>
    </div>

</body>
</html>
