<?php
session_start();
require 'dbc.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit();
}

$user_id = (int) $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received']);
    exit();
}

$activity_type = isset($data['activity_type']) ? trim($data['activity_type']) : null;
$activity_id = isset($data['activity_id']) ? trim($data['activity_id']) : null;
$stars_earned = isset($data['stars_earned']) ? (int) $data['stars_earned'] : 5;

if (!$activity_type || !$activity_id) {
    echo json_encode(['success' => false, 'message' => 'Missing activity data']);
    exit();
}

$valid_types = ['book', 'listening', 'video'];
if (!in_array($activity_type, $valid_types)) {
    echo json_encode(['success' => false, 'message' => 'Invalid activity type']);
    exit();
}

mysqli_begin_transaction($connection);

try {
    // Check if already completed
    $stmt = $connection->prepare("SELECT id FROM user_activities WHERE user_id = ? AND activity_type = ? AND activity_id = ?");
    $stmt->bind_param("iss", $user_id, $activity_type, $activity_id);
    $stmt->execute();
    $existing = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if ($existing) {
        throw new Exception("Activity already completed");
    }

    // Save activity
    $stmt = $connection->prepare("INSERT INTO user_activities (user_id, activity_type, activity_id, stars_earned) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("issi", $user_id, $activity_type, $activity_id, $stars_earned);
    $stmt->execute();
    $stmt->close();

    // Update total stars
    $stmt = $connection->prepare("UPDATE users SET total_stars = total_stars + ? WHERE id = ?");
    $stmt->bind_param("ii", $stars_earned, $user_id);
    $stmt->execute();
    $stmt->close();

    // Get updated total
    $stmt = $connection->prepare("SELECT total_stars FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $total_stars = $stmt->get_result()->fetch_assoc()['total_stars'];
    $stmt->close();

    mysqli_commit($connection);

    echo json_encode([
        'success' => true,
        'message' => 'Activity completed! +' . $stars_earned . ' stars',
        'stars_earned' => $stars_earned,
        'total_stars' => (int) $total_stars
    ]);

} catch (Exception $e) {
    mysqli_rollback($connection);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

$connection->close();
?>