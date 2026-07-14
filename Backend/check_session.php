<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Credentials: true');

require 'dbc.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['logged_in' => false]);
    exit();
}

$user_id = (int) $_SESSION['user_id'];

// Get ALL user data including total_stars
$stmt = $connection->prepare("SELECT id, first_name, last_name, email, dob, gender, star_shells, total_stars, daily_streak, equipped_skin, created_at FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$user) {
    session_destroy();
    echo json_encode(['logged_in' => false]);
    exit();
}

echo json_encode([
    'logged_in' => true,
    'user' => [
        'id' => $user['id'],
        'first_name' => $user['first_name'],
        'last_name' => $user['last_name'],
        'email' => $user['email'],
        'dob' => $user['dob'],
        'gender' => $user['gender'],
        'star_shells' => (int) $user['star_shells'],
        'total_stars' => (int) $user['total_stars'],
        'daily_streak' => (int) $user['daily_streak'],
        'equipped_skin' => $user['equipped_skin'],
        'created_at' => $user['created_at']
    ]
]);
?>