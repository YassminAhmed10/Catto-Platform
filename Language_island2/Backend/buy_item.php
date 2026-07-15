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
$item_name = isset($data['item_name']) ? trim($data['item_name']) : null;

if (!$item_name) {
    echo json_encode(['success' => false, 'message' => 'No item specified']);
    exit();
}

// Debug log
error_log("Attempting to buy item: " . $item_name);

mysqli_begin_transaction($connection);

try {
    // 1. Look up the item
    $stmt = $connection->prepare("SELECT id, price FROM shop_items WHERE item_name = ?");
    $stmt->bind_param("s", $item_name);
    $stmt->execute();
    $result = $stmt->get_result();
    $item = $result->fetch_assoc();
    $stmt->close();

    if (!$item) {
        error_log("Item not found: " . $item_name);
        throw new Exception("Item not found");
    }

    $item_id = (int) $item['id'];
    $price = (int) $item['price'];

    // 2. Check if user already owns it
    $stmt = $connection->prepare("SELECT id FROM user_inventory WHERE user_id = ? AND item_id = ?");
    $stmt->bind_param("ii", $user_id, $item_id);
    $stmt->execute();
    $already_owned = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if ($already_owned) {
        throw new Exception("You already own this item");
    }

    // 3. Check user balance
    $stmt = $connection->prepare("SELECT star_shells FROM users WHERE id = ? FOR UPDATE");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $user = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (!$user) {
        throw new Exception("User not found");
    }

    if ((int) $user['star_shells'] < $price) {
        throw new Exception("Insufficient coins");
    }

    // 4. Deduct coins
    $stmt = $connection->prepare("UPDATE users SET star_shells = star_shells - ? WHERE id = ?");
    $stmt->bind_param("ii", $price, $user_id);
    $stmt->execute();
    $stmt->close();

    // 5. Add to inventory - matches your table structure
    $stmt = $connection->prepare("INSERT INTO user_inventory (user_id, item_id, is_equipped) VALUES (?, ?, 0)");
    $stmt->bind_param("ii", $user_id, $item_id);
    $stmt->execute();
    $stmt->close();

    mysqli_commit($connection);

    // Get new balance
    $stmt = $connection->prepare("SELECT star_shells FROM users WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $newBalance = $stmt->get_result()->fetch_assoc()['star_shells'];
    $stmt->close();

    echo json_encode([
        'success' => true,
        'item_name' => $item_name,
        'star_shells' => (int) $newBalance
    ]);

} catch (Exception $e) {
    mysqli_rollback($connection);
    error_log("Purchase error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

$connection->close();
?>