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

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received']);
    exit();
}

// Required fields
$language = isset($data['language']) ? trim($data['language']) : null;
$game_type = isset($data['game_type']) ? trim($data['game_type']) : null;
$coins_earned = isset($data['coins_earned']) ? (int) $data['coins_earned'] : 0;
$score = isset($data['score']) ? (int) $data['score'] : 0;
$won = isset($data['won']) ? (bool) $data['won'] : false;

// Log what we received for debugging
error_log("save_game_progress: language=$language, game_type=$game_type, coins_earned=$coins_earned, score=$score, won=" . ($won ? 'true' : 'false'));

if (!$language || !$game_type) {
    echo json_encode(['success' => false, 'message' => 'Missing language or game type']);
    exit();
}

// Validate language code
$valid_languages = ['en', 'ar', 'de', 'es', 'fr', 'it'];
if (!in_array($language, $valid_languages)) {
    echo json_encode(['success' => false, 'message' => 'Invalid language code']);
    exit();
}

// Validate game type
$valid_games = ['memory', 'quiz', 'listen', 'crush'];
if (!in_array($game_type, $valid_games)) {
    echo json_encode(['success' => false, 'message' => 'Invalid game type']);
    exit();
}

mysqli_begin_transaction($connection);

try {
    // 1. Update or insert game progress 
    $stmt = $connection->prepare("
        INSERT INTO game_progress (user_id, language_code, game_type, games_played, games_won, total_score, stars_earned)
        VALUES (?, ?, ?, 1, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            games_played = games_played + 1,
            games_won = games_won + ?,
            total_score = total_score + ?,
            stars_earned = stars_earned + ?,
            last_played = CURRENT_TIMESTAMP
    ");
    
    $games_won = $won ? 1 : 0;

    $stmt->bind_param("issiiiiii", 
        $user_id, 
        $language, 
        $game_type,
        $games_won,
        $score,
        $score, // Initial stars_earned gets the score
        $games_won,
        $score,
        $score // Add score to existing stars_earned
    );
    
    if (!$stmt->execute()) {
        throw new Exception("Failed to update game progress: " . $stmt->error);
    }
    $stmt->close();

    // 2. Update user's coins and total_stars
    $stmt = $connection->prepare("
        UPDATE users 
        SET coins = coins + ?,
            total_stars = total_stars + ?
        WHERE id = ?
    ");

    $stmt->bind_param("iii", $coins_earned, $score, $user_id);
    
    if (!$stmt->execute()) {
        throw new Exception("Failed to update user coins: " . $stmt->error);
    }
    $stmt->close();

    // 3. Get updated totals
    $stmt = $connection->prepare("SELECT coins, total_stars FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    mysqli_commit($connection);

    echo json_encode([
        'success' => true,
        'message' => 'Progress saved successfully',
        'coins' => (int) $result['coins'],
        'total_stars' => (int) $result['total_stars'],
        'coins_earned' => $coins_earned,
        'stars_earned' => $score 
    ]);

} catch (Exception $e) {
    mysqli_rollback($connection);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}

$connection->close();
?>