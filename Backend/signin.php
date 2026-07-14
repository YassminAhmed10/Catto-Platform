<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require 'dbc.php';

$raw_data = file_get_contents('php://input');
$data = json_decode($raw_data, true);

if (!$data || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit();
}

$email = mysqli_real_escape_string($connection, trim($data['email']));
$password = $data['password'];

// Get user with ALL fields including equipped_skin
$query = "SELECT id, first_name, last_name, email, dob, gender, password_hash, star_shells, total_stars, daily_streak, equipped_skin, created_at FROM users WHERE email = '$email'";
$result = mysqli_query($connection, $query);

if ($result && mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);
    
    if (password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['first_name'] = $user['first_name'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['equipped_skin'] = $user['equipped_skin'] ?? 'default-catto';
        
        echo json_encode([
            'success' => true, 
            'user' => [
                'id' => $user['id'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'email' => $user['email'],
                'dob' => $user['dob'],
                'gender' => $user['gender'],
                'star_shells' => $user['star_shells'],
                'total_stars' => $user['total_stars'],
                'daily_streak' => $user['daily_streak'],
                'equipped_skin' => $user['equipped_skin'] ?? 'default-catto',
                'created_at' => $user['created_at']
            ],
            'message' => 'Login successful'
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
}
?>