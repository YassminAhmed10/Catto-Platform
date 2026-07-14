<?php
session_start();
require 'dbc.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit();
}

$user_id = (int) $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);
$new_theme = isset($data['theme']) ? trim($data['theme']) : 'default';

// If they are trying to equip a custom theme, verify they own it
if ($new_theme !== 'default') {
    $stmt = $connection->prepare(
        "SELECT ui.id FROM user_inventory ui
         JOIN shop_items s ON ui.item_id = s.id
         WHERE ui.user_id = ? AND s.item_name = ?"
    );
    $stmt->bind_param("is", $user_id, $new_theme);
    $stmt->execute();
    $owns_theme = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$owns_theme) {
        echo json_encode(['success' => false, 'message' => 'You do not own this theme']);
        exit();
    }
}

// Update the user's equipped theme
$stmt = $connection->prepare("UPDATE users SET equipped_theme = ? WHERE id = ?");
$stmt->bind_param("si", $new_theme, $user_id);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'theme' => $new_theme]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to update theme']);
}
$stmt->close();
?>