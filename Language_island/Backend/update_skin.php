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
$new_skin = isset($data['equipped_skin']) ? trim($data['equipped_skin']) : null;

if (!$new_skin) {
    echo json_encode(['success' => false, 'message' => 'No skin specified']);
    exit();
}

// Always allow the free default skin. Anything else must actually be
// in the user's inventory, otherwise someone could equip a skin they
// never bought by calling this endpoint directly.
$owned_item_id = null;

if ($new_skin !== 'default-catto') {
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
    // 1. Save which skin is equipped on the user record (this is what
    //    profile.html / avatar-system.js read to show the avatar image).
    $stmt = $connection->prepare("UPDATE users SET equipped_skin = ? WHERE id = ?");
    $stmt->bind_param("si", $new_skin, $user_id);
    $stmt->execute();
    $stmt->close();

    // 2. Un-equip every other skin this user owns...
    $stmt = $connection->prepare(
        "UPDATE user_inventory ui
         JOIN shop_items s ON ui.item_id = s.id
         SET ui.is_equipped = 0
         WHERE ui.user_id = ? AND s.item_type = 'skin'"
    );
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->close();

    // 3. ...then mark the newly equipped one (nothing to mark if it's
    //    the free default-catto, since that has no shop_items/inventory row).
    if ($owned_item_id !== null) {
        $stmt = $connection->prepare(
            "UPDATE user_inventory SET is_equipped = 1 WHERE user_id = ? AND item_id = ?"
        );
        $stmt->bind_param("ii", $user_id, $owned_item_id);
        $stmt->execute();
        $stmt->close();
    }

    mysqli_commit($connection);
    echo json_encode(['success' => true, 'equipped_skin' => $new_skin]);

} catch (Exception $e) {
    mysqli_rollback($connection);
    echo json_encode(['success' => false, 'message' => 'Database update failed: ' . $e->getMessage()]);
}
?>