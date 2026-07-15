<?php
// This is a UTILITY script - goes in Frontend/ folder
// It creates skin images in the imgs/profile/ folder

$profile_folder = 'imgs/profile/';

// Create profile folder if it doesn't exist
if (!file_exists($profile_folder)) {
    mkdir($profile_folder, 0777, true);
    echo "📁 Created profile folder<br>";
}

// List of all skin names
$skin_names = [
    'default-catto',
    'wizard-catto',
    'doctor-catto',
    'pirate-catto',
    'artist-catto',
    'chef-catto',
    'astronaut-catto',
    'ocean-explorer',
    'king-of-learning'
];

// Try to find a source image
$source_paths = [
    'imgs/Cattoimages/default-catto.png',
    'imgs/Cattoimages/wizard-catto.png',
    'imgs/Cattoimages/cattologo.png',
    'imgs/profile/Coins.png',
    'imgs/profile/Stars.png'
];

$source = null;
foreach ($source_paths as $path) {
    if (file_exists($path)) {
        $source = $path;
        break;
    }
}

if (!$source) {
    // Create a simple default image using GD
    $width = 200;
    $height = 200;
    $image = imagecreatetruecolor($width, $height);
    
    // Background
    $bg = imagecolorallocate($image, 255, 107, 89);
    imagefilledrectangle($image, 0, 0, $width, $height, $bg);
    
    // Circle
    $circle = imagecolorallocate($image, 230, 80, 60);
    imagefilledellipse($image, $width/2, $height/2, 160, 160, $circle);
    
    // Eyes
    $white = imagecolorallocate($image, 255, 255, 255);
    imagefilledellipse($image, 70, 75, 30, 35, $white);
    imagefilledellipse($image, 130, 75, 30, 35, $white);
    
    // Pupils
    $dark = imagecolorallocate($image, 46, 38, 87);
    imagefilledellipse($image, 75, 80, 12, 14, $dark);
    imagefilledellipse($image, 125, 80, 12, 14, $dark);
    
    // Smile
    $red = imagecolorallocate($image, 200, 50, 40);
    imagearc($image, 100, 110, 60, 40, 0, 180, $red);
    
    $source = $profile_folder . 'default-catto.png';
    imagepng($image, $source);
    imagedestroy($image);
    echo "✅ Created default image: " . basename($source) . "<br>";
}

echo "<h2>📁 Creating Catto Skin Images in imgs/profile/</h2>";
echo "<p>📁 Source image: <strong>" . basename($source) . "</strong></p>";
echo "<hr>";

$created = 0;
$skipped = 0;

foreach ($skin_names as $skin) {
    $dest = $profile_folder . $skin . '.png';
    
    if (file_exists($dest) && filesize($dest) > 0) {
        echo "✅ Already exists: <strong>$skin.png</strong><br>";
        $skipped++;
    } else {
        if (copy($source, $dest)) {
            echo "✅ Created: <strong>$skin.png</strong><br>";
            $created++;
        } else {
            echo "❌ Failed to create: <strong>$skin.png</strong><br>";
        }
    }
}

echo "<hr>";
echo "<h3>📊 Summary:</h3>";
echo "<ul>";
echo "<li>✅ Created: <strong>$created</strong> files</li>";
echo "<li>⏭️ Skipped: <strong>$skipped</strong> files (already exist)</li>";
echo "</ul>";

// Verify all files
echo "<h3>🔍 Verifying files in imgs/profile/: </h3>";
echo "<ul>";
$all_ok = true;
foreach ($skin_names as $skin) {
    $path = $profile_folder . $skin . '.png';
    if (file_exists($path) && filesize($path) > 0) {
        echo "<li style='color:green;'>✅ $skin.png</li>";
    } else {
        echo "<li style='color:red;'>❌ $skin.png - MISSING!</li>";
        $all_ok = false;
    }
}
echo "</ul>";

if ($all_ok) {
    echo "<h3 style='color:green;'>🎉 All images created successfully!</h3>";
} else {
    echo "<h3 style='color:red;'>⚠️ Some images are still missing. Check folder permissions.</h3>";
}

echo "<hr>";
echo "<p><a href='profile.html' style='display:inline-block;padding:10px 24px;background:#FF6B59;color:white;border-radius:999px;text-decoration:none;font-weight:bold;'>Go to Profile</a></p>";
?>