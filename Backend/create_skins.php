<?php
// Set the path to your profile folder
$profile_folder = 'imgs/profile/';

// List of all skin names that need images
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
    die("❌ No source image found! Please make sure an image exists in imgs/Cattoimages/ or imgs/profile/");
}

echo "<h2>📁 Creating Catto Skin Images in imgs/profile/</h2>";
echo "<p>📁 Source image: <strong>" . basename($source) . "</strong></p>";
echo "<p>📁 Destination folder: <strong>imgs/profile/</strong></p>";
echo "<hr>";

$created = 0;
$skipped = 0;

// Create profile folder if it doesn't exist
if (!file_exists($profile_folder)) {
    mkdir($profile_folder, 0777, true);
    echo "📁 Created profile folder<br>";
}

foreach ($skin_names as $skin) {
    $dest = $profile_folder . $skin . '.png';
    
    if (file_exists($dest)) {
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
    if (file_exists($path)) {
        echo "<li style='color:green;'>✅ $skin.png</li>";
    } else {
        echo "<li style='color:red;'>❌ $skin.png - MISSING!</li>";
        $all_ok = false;
    }
}
echo "</ul>";

if ($all_ok) {
    echo "<h3 style='color:green;'>🎉 All images created successfully!</h3>";
}

echo "<p><a href='profile.html' style='display:inline-block;padding:10px 24px;background:#FF6B59;color:white;border-radius:999px;text-decoration:none;font-weight:bold;'>Go to Profile</a></p>";
?>