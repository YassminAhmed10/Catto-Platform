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
$new_skin = isset($data['equipped_skin']) ? trim($data['equipped_skin']) : null;

if (!$new_skin) {
    echo json_encode(['success' => false, 'message' => 'No skin specified']);
    exit();
}

// Always allow the free default skin
$owned_item_id = null;

if ($new_skin !== 'default-catto') {
    // Check if user owns this skin
    $stmt = $connection->prepare(
        "SELECT ui.item_id FROM user_inventory ui
         JOIN shop_items s ON ui.item_id = s.id
         WHERE ui.user_id = ? AND s.item_name = ? AND s.item_type = 'skin'"
    );
    $stmt->bind_param("is", $user_id, $new_skin);
    $stmt->execute();
    $owns_it = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$owns_it) {
        echo json_encode(['success' => false, 'message' => 'You do not own this skin']);
        exit();
    }
    $owned_item_id = (int) $owns_it['item_id'];
}

mysqli_begin_transaction($connection);

try {
    // 1. Update user's equipped_skin in users table
    $stmt = $connection->prepare("UPDATE users SET equipped_skin = ? WHERE id = ?");
    $stmt->bind_param("si", $new_skin, $user_id);
    $stmt->execute();
    $stmt->close();

    // 2. Un-equip every other skin this user owns
    $stmt = $connection->prepare(
        "UPDATE user_inventory ui
         JOIN shop_items s ON ui.item_id = s.id
         SET ui.is_equipped = 0
         WHERE ui.user_id = ? AND s.item_type = 'skin'"
    );
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->close();

    // 3. Mark the newly equipped one (skip for default-catto)
    if ($owned_item_id !== null) {
        $stmt = $connection->prepare(
            "UPDATE user_inventory SET is_equipped = 1 WHERE user_id = ? AND item_id = ?"
        );
        $stmt->bind_param("ii", $user_id, $owned_item_id);
        $stmt->execute();
        $stmt->close();
    }

    mysqli_commit($connection);
    
    // Update session
    $_SESSION['equipped_skin'] = $new_skin;
    
    echo json_encode([
        'success' => true, 
        'equipped_skin' => $new_skin,
        'message' => 'Skin equipped successfully'
    ]);

} catch (Exception $e) {
    mysqli_rollback($connection);
    echo json_encode(['success' => false, 'message' => 'Database update failed: ' . $e->getMessage()]);
}

$connection->close();
?>