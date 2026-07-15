<?php
session_start();
require 'dbc.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Credentials: true');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit();
}

$user_id = (int) $_SESSION['user_id'];
$language = isset($_GET['language']) ? trim($_GET['language']) : null;

// Validate language if provided
if ($language) {
    $valid_languages = ['en', 'ar', 'de', 'es', 'fr', 'it'];
    if (!in_array($language, $valid_languages)) {
        echo json_encode(['success' => false, 'message' => 'Invalid language code']);
        exit();
    }
}

// Build query - get all game progress
$query = "SELECT language_code, game_type, games_played, games_won, total_score, stars_earned, last_played 
          FROM game_progress 
          WHERE user_id = ?";
$params = [$user_id];
$types = "i";

if ($language) {
    $query .= " AND language_code = ?";
    $params[] = $language;
    $types .= "s";
}

$query .= " ORDER BY last_played DESC";

$stmt = $connection->prepare($query);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$progress = [];
while ($row = $result->fetch_assoc()) {
    $key = $row['language_code'] . '_' . $row['game_type'];
    $progress[$key] = [
        'language_code' => $row['language_code'],
        'game_type' => $row['game_type'],
        'games_played' => (int) $row['games_played'],
        'games_won' => (int) $row['games_won'],
        'total_score' => (int) $row['total_score'],
        'stars_earned' => (int) $row['stars_earned'],
        'last_played' => $row['last_played']
    ];
}
$stmt->close();

// Get user totals
$stmt = $connection->prepare("SELECT coins, total_stars FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$user_result = $stmt->get_result()->fetch_assoc();
$stmt->close();

echo json_encode([
    'success' => true,
    'progress' => $progress,
    'coins' => (int) $user_result['coins'],
    'total_stars' => (int) $user_result['total_stars']
]);

$connection->close();
?>