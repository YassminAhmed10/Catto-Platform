<?php
session_start();
require 'dbc.php'; // Ensures we can talk to the database

// 1. Check if the user is logged in and requested an item
if (!isset($_SESSION['user_id']) || !isset($_GET['item'])) {
    die("Unauthorized access. Please log in.");
}

$user_id = (int) $_SESSION['user_id'];
$item_name = trim($_GET['item']);

// 2. Verify in the database that they actually own this specific item
$stmt = $connection->prepare(
    "SELECT ui.id FROM user_inventory ui
     JOIN shop_items s ON ui.item_id = s.id
     WHERE ui.user_id = ? AND s.item_name = ?"
);
$stmt->bind_param("is", $user_id, $item_name);
$stmt->execute();
$owns_item = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$owns_item) {
    die("You must purchase this item from the shop first.");
}

// 3. Define the path to your secure folder
$file_path = __DIR__ . '/secure_files/' . $item_name . '.pdf';

// 4. Serve the file directly to the browser for download
if (file_exists($file_path)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . basename($file_path) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file_path));
    
    ob_clean();
    flush();
    readfile($file_path);
    exit;
} else {
    die("Error: The file could not be found on the server.");
}
?>