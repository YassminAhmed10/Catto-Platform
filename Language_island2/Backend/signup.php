<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require 'dbc.php'; 

$raw_data = file_get_contents('php://input');
$data = json_decode($raw_data, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received']);
    exit();
}

$firstName = mysqli_real_escape_string($connection, trim($data['first_name'] ?? ''));
$lastName = mysqli_real_escape_string($connection, trim($data['last_name'] ?? ''));
$email = mysqli_real_escape_string($connection, trim($data['email'] ?? ''));
$dob = mysqli_real_escape_string($connection, $data['dob'] ?? null);
$gender = mysqli_real_escape_string($connection, $data['gender'] ?? 'prefer-not');
$password = $data['password'] ?? '';

// Validate required fields
if (empty($firstName) || empty($lastName) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All required fields must be filled']);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit();
}

// Validate password length
if (strlen($password) < 8) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 8 characters']);
    exit();
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

// Check if the email already exists
$checkQuery = "SELECT id FROM users WHERE email = '$email'";
$checkResult = mysqli_query($connection, $checkQuery);

if (mysqli_num_rows($checkResult) > 0) {
    echo json_encode(['success' => false, 'message' => 'A User with this email already exists!']);
    exit();
}

$insertQuery = "INSERT INTO users (first_name, last_name, email, password_hash, dob, gender) 
                VALUES ('$firstName', '$lastName', '$email', '$passwordHash', '$dob', '$gender')";

if (mysqli_query($connection, $insertQuery)) {
    $userId = mysqli_insert_id($connection);
    $_SESSION['user_id'] = $userId;
    $_SESSION['first_name'] = $firstName;
    $_SESSION['email'] = $email;
    
    echo json_encode([
        'success' => true, 
        'message' => 'Account created!',
        'user_id' => $userId,
        'star_shells' => 0
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . mysqli_error($connection)]);
}
?>