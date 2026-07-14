<?php
session_start();
require 'dbc.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Credentials: true');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'not_logged_in']);
    exit();
}

$user_id = (int) $_SESSION['user_id'];

// 1. Get all user data - INCLUDING equipped_skin
$query = "SELECT id, first_name, last_name, email, dob, gender, star_shells, total_stars, daily_streak, equipped_skin, created_at FROM users WHERE id = ?";
$stmt = $connection->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$user_result = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$user_result) {
    echo json_encode(['success' => false, 'error' => 'User not found']);
    exit();
}

// 2. Calculate age from dob
function calculateAge($dob) {
    if (empty($dob)) return null;
    $birthDate = new DateTime($dob);
    $today = new DateTime('today');
    $age = $birthDate->diff($today)->y;
    return $age;
}

$user_result['age'] = calculateAge($user_result['dob']);

// 3. Format gender display
$genderDisplay = [
    'girl' => 'Girl',
    'boy' => 'Boy',
    'prefer-not' => 'Not specified'
];
$user_result['gender_display'] = $genderDisplay[$user_result['gender']] ?? 'Not specified';

// 4. Format date of birth for display
$user_result['dob_display'] = !empty($user_result['dob']) ? date('F j, Y', strtotime($user_result['dob'])) : 'Not set';

// 5. Format member since
$user_result['member_since'] = !empty($user_result['created_at']) ? date('F j, Y', strtotime($user_result['created_at'])) : 'Not set';

// 6. Get inventory with details
$inv_query = "SELECT s.item_name, s.item_type FROM user_inventory ui 
              JOIN shop_items s ON ui.item_id = s.id 
              WHERE ui.user_id = ?";
$inv_stmt = $connection->prepare($inv_query);
$inv_stmt->bind_param("i", $user_id);
$inv_stmt->execute();
$inv_result = $inv_stmt->get_result();

$inventory = [];
$inventory_details = [];
while ($row = $inv_result->fetch_assoc()) {
    $inventory[] = $row['item_name'];
    $inventory_details[] = $row;
}
$inv_stmt->close();

$user_result['inventory'] = $inventory;
$user_result['inventory_details'] = $inventory_details;

// 7. Calculate Total XP and Level
$xp_query = "SELECT SUM(score) as total_xp FROM user_progress WHERE user_id = ?";
$xp_stmt = $connection->prepare($xp_query);
$xp_stmt->bind_param("i", $user_id);
$xp_stmt->execute();
$xp_result = $xp_stmt->get_result()->fetch_assoc();
$xp_stmt->close();

$total_xp = $xp_result['total_xp'] ?? 0;
$level = floor($total_xp / 100) + 1;

$user_result['total_xp'] = $total_xp;
$user_result['level'] = $level;

// Return with 'data' wrapper
echo json_encode([
    'success' => true, 
    'data' => $user_result
]);
?>