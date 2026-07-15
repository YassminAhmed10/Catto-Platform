<?php
$profile_folder = 'imgs/profile/';

// Map each skin to its REAL source image (matching shop.js paths)
$skin_sources = [
    'default-catto'     => 'imgs/Cattoimages/default-catto.png',
    'wizard-catto'      => 'imgs/Cattoimages/wizard-catto.png',
    'doctor-catto'      => 'imgs/Cattoimages/doctor-catto.png',
    'pirate-catto'      => 'imgs/Cattoimages/pirate-catto.png',
    'artist-catto'      => 'imgs/shop/Artist Catto.png',
    'chef-catto'        => 'imgs/shop/Chef Catto.png',
    'astronaut-catto'   => 'imgs/shop/Astronaut-Catto.png',
    'ocean-explorer'    => 'imgs/shop/Ocean Explorer Catto.png',
    'king-of-learning'  => 'imgs/shop/King of Learning.png',
];

// Create profile folder if it doesn't exist
if (!file_exists($profile_folder)) {
    mkdir($profile_folder, 0777, true);
    echo "📁 Created profile folder<br>";
}

echo "<h2>📁 Copying REAL Catto Skin Images to imgs/profile/</h2>";
echo "<hr>";

$created = 0;
$skipped = 0;
$missing = 0;

foreach ($skin_sources as $skin => $src) {
    $dest = $profile_folder . $skin . '.png';

    // Check if source exists
    if (!file_exists($src)) {
        echo "⚠️ Source missing for <strong>$skin</strong>: " . basename($src) . "<br>";
        $missing++;
        continue;
    }

    // Delete existing file so it gets overwritten
    if (file_exists($dest)) {
        unlink($dest);
        echo "🗑️ Removed old: <strong>$skin.png</strong><br>";
    }

    // Copy the correct source image
    if (copy($src, $dest)) {
        $size = round(filesize($dest) / 1024, 1);
        echo "✅ Created: <strong>$skin.png</strong> from " . basename($src) . " ({$size}KB)<br>";
        $created++;
    } else {
        echo "❌ Failed to copy: <strong>$skin.png</strong><br>";
    }
}

echo "<hr>";
echo "<h3>📊 Summary:</h3>";
echo "<ul>";
echo "<li>✅ Created/Updated: <strong>$created</strong> files</li>";
echo "<li>⚠️ Missing sources: <strong>$missing</strong> files</li>";
echo "</ul>";

// Verify all files
echo "<h3>🔍 Verifying files in imgs/profile/: </h3>";
echo "<ul>";
$all_ok = true;
foreach ($skin_sources as $skin => $src) {
    $path = $profile_folder . $skin . '.png';
    if (file_exists($path) && filesize($path) > 0) {
        $size = round(filesize($path) / 1024, 1);
        echo "<li style='color:green;'>✅ $skin.png ({$size}KB)</li>";
    } else {
        echo "<li style='color:red;'>❌ $skin.png - MISSING!</li>";
        $all_ok = false;
    }
}
echo "</ul>";

if ($all_ok) {
    echo "<h3 style='color:green;'>🎉 All images created successfully with their own unique artwork!</h3>";
}

echo "<hr>";
echo "<p><a href='profile.html' style='display:inline-block;padding:10px 24px;background:#FF6B59;color:white;border-radius:999px;text-decoration:none;font-weight:bold;'>Go to Profile</a></p>";
?>