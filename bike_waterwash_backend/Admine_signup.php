<?php
session_start();
$conn = new mysqli("localhost", "root", "", "admin_db"); // Update database name if needed

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = $_POST["fullName"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $query = "INSERT INTO users (full_name, email, password) VALUES ('$fullName', '$email', '$hashedPassword')";
    if ($conn->query($query) === TRUE) {
        echo "<script>alert('Registration successful!'); window.location='Admine_login.php';</script>";
    } else {
        echo "<script>alert('Error: Email already registered!');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Signup</title>
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
            <h2>Sign Up</h2>
            <form method="POST">
                <div class="input-group">
                    <input type="text" name="fullName" placeholder="Full Name" required>
                </div>
                <div class="input-group">
                    <input type="email" name="email" placeholder="Email Address" required>
                </div>
                <div class="input-group">
                    <input type="password" name="password" placeholder="Password" required>
                </div>
                <button type="submit" class="btn">Sign Up</button>
            </form>
            <p class="toggle-text">
                Already have an account? <a href="Admine_login.php">Login</a>
            </p>
        </div>
    </div>

</body>
</html>
