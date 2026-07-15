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

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Please log in to update your profile']);
    exit();
}

$raw_data = file_get_contents('php://input');
$data = json_decode($raw_data, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received']);
    exit();
}

$userId = $_SESSION['user_id'];
$firstName = trim($data['first_name'] ?? '');
$lastName = trim($data['last_name'] ?? '');
$email = trim($data['email'] ?? '');
$gender = $data['gender'] ?? 'prefer-not';
$dob = $data['dob'] ?? '';

// Validate required fields
if (empty($firstName) || empty($lastName) || empty($email)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit();
}

// Check if email is already used by another user
$checkQuery = "SELECT id FROM users WHERE email = ? AND id != ?";
$checkStmt = $connection->prepare($checkQuery);
$checkStmt->bind_param("si", $email, $userId);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email is already used by another account']);
    $checkStmt->close();
    $connection->close();
    exit();
}
$checkStmt->close();

// Update user profile
$updateQuery = "UPDATE users SET first_name = ?, last_name = ?, email = ?, gender = ?, dob = ? WHERE id = ?";
$updateStmt = $connection->prepare($updateQuery);
$updateStmt->bind_param("sssssi", $firstName, $lastName, $email, $gender, $dob, $userId);

if ($updateStmt->execute()) {
    // Update session data
    $_SESSION['first_name'] = $firstName;
    $_SESSION['email'] = $email;
    
    // Get updated user data
    $getUserQuery = "SELECT id, first_name, last_name, email, gender, dob FROM users WHERE id = ?";
    $getUserStmt = $connection->prepare($getUserQuery);
    $getUserStmt->bind_param("i", $userId);
    $getUserStmt->execute();
    $updatedUser = $getUserStmt->get_result()->fetch_assoc();
    $getUserStmt->close();
    
    echo json_encode([
        'success' => true,
        'message' => 'Profile updated successfully',
        'first_name' => $updatedUser['first_name'],
        'last_name' => $updatedUser['last_name'],
        'email' => $updatedUser['email'],
        'gender' => $updatedUser['gender'],
        'dob' => $updatedUser['dob']
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $connection->error]);
}

$updateStmt->close();
$connection->close();
?>