<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Credentials: true');

// Check if dbc.php exists
if (!file_exists('dbc.php')) {
    echo json_encode(['error' => 'dbc.php not found in ' . __DIR__]);
    exit();
}

require 'dbc.php';

// Check if connection was successful
if (!isset($connection) || !$connection) {
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['logged_in' => false]);
    exit();
}

$user_id = (int) $_SESSION['user_id'];

// Get ALL user data including equipped_theme
$stmt = $connection->prepare("SELECT id, first_name, last_name, email, dob, gender, star_shells, total_stars, daily_streak, equipped_skin, equipped_theme, created_at FROM users WHERE id = ?");
if (!$stmt) {
    echo json_encode(['error' => 'Prepare failed: ' . $connection->error]);
    exit();
}

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
        'equipped_skin' => $user['equipped_skin'] ?? 'default-catto',
        'equipped_theme' => $user['equipped_theme'] ?? 'default',
        'created_at' => $user['created_at']
    ]
]);
?>