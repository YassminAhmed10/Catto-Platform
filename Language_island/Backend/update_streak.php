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
$raw_data = file_get_contents('php://input');
$data = json_decode($raw_data, true);

if (!$data || !isset($data['streak'])) {
    echo json_encode(['success' => false, 'message' => 'No streak data received']);
    exit();
}

$streak = (int) $data['streak'];

$stmt = $connection->prepare("UPDATE users SET daily_streak = ? WHERE id = ?");
$stmt->bind_param("ii", $streak, $user_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'streak' => $streak]);
} else {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $stmt->error]);
}

$stmt->close();
$connection->close();
?>