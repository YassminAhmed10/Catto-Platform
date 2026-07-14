<?php
// Source folder
$catto_folder = 'imgs/Cattoimages/';
$shop_folder = 'imgs/shop/';
$profile_folder = 'imgs/profile/';

// Create profile folder if it doesn't exist
if (!file_exists($profile_folder)) {
    mkdir($profile_folder, 0777, true);
}

// Map actual filenames to what the code expects
$skin_mapping = [
    // From Cattoimages folder
    $catto_folder . 'King of Learning.png' => 'king-of-learning.png',
    $catto_folder . 'wizard-catto.png' => 'wizard-catto.png',
    $catto_folder . 'doctor-catto.png' => 'doctor-catto.png',
    $catto_folder . 'pirate-catto.png' => 'pirate-catto.png',
    $catto_folder . 'default-catto.png' => 'default-catto.png',
    // From shop folder
    $shop_folder . 'Artist Catto.png' => 'artist-catto.png',
    $shop_folder . 'Chef Catto.png' => 'chef-catto.png',
    $shop_folder . 'Astronaut-Catto.png' => 'astronaut-catto.png',
    $shop_folder . 'Ocean Explorer Catto.png' => 'ocean-explorer.png',
];

echo "<h2>📁 Copying skins with correct names to imgs/profile/</h2>";
echo "<hr>";

$copied = 0;
$missing = 0;

foreach ($skin_mapping as $source => $dest_name) {
    $dest = $profile_folder . $dest_name;
    
    if (!file_exists($source)) {
        echo "⚠️ Source missing: <strong>" . basename($source) . "</strong><br>";
        $missing++;
        continue;
    }
    
    // Copy the file with the new name (overwrite if exists)
    if (copy($source, $dest)) {
        $size = round(filesize($dest) / 1024, 1);
        echo "✅ Copied: <strong>$dest_name</strong> from " . basename($source) . " ({$size}KB)<br>";
        $copied++;
    } else {
        echo "❌ Failed to copy: <strong>$dest_name</strong><br>";
    }
}

echo "<hr>";
echo "<h3>📊 Summary:</h3>";
echo "<ul>";
echo "<li>✅ Copied: <strong>$copied</strong> files with correct names</li>";
echo "<li>⚠️ Missing sources: <strong>$missing</strong></li>";
echo "</ul>";

// Show what's in the profile folder
echo "<h3>🔍 Files now in imgs/profile/: </h3>";
echo "<ul>";
$files = glob($profile_folder . '*.png');
foreach ($files as $file) {
    $name = basename($file);
    $size = round(filesize($file) / 1024, 1);
    echo "<li style='color:green;'>✅ $name ({$size}KB)</li>";
}
echo "</ul>";

echo "<p><a href='profile.html'>Go to Profile</a></p>";
?>