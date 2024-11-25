<?php
// Start session at the beginning
session_start();

// Connection to the MySQL database
$con = mysqli_connect("localhost", "root", "", "user");

// Check the connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// Get the username and password from the form
$usertrim = trim($_POST['Email']);
$userstrip = stripcslashes($usertrim);
$finaluser = htmlspecialchars($userstrip);

// For password handling
$passtrim = trim($_POST['password']);
$passstrip = stripcslashes($passtrim);
$finalpass = htmlspecialchars($passstrip);

// Use prepared statements to avoid SQL injection
$stmt = $con->prepare("SELECT * FROM user_table WHERE Email = ? AND password = ?");
$stmt->bind_param("ss", $finaluser, $finalpass);  // 'ss' denotes two string parameters

// Execute the query
$stmt->execute();
$result = $stmt->get_result();

// Check if a matching user was found
if (mysqli_num_rows($result) > 0) {
    // Set session and redirect to the index page
    $_SESSION["myuser"] = $finaluser;
    header("Location: index.html");
    exit(); // Always call exit after header redirection
} else {
    // Set error message and redirect to error page
    $_SESSION["error"] = "You are not a valid user";
    header("Location: error.html");
    exit(); // Always call exit after header redirection
}

// Close the statement and connection
$stmt->close();
$con->close();
?>