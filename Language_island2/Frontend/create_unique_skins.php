<?php
// This creates unique colored images for each skin
$profile_folder = 'imgs/profile/';

// Create profile folder if it doesn't exist
if (!file_exists($profile_folder)) {
    mkdir($profile_folder, 0777, true);
    echo "📁 Created profile folder<br>";
}

// Define unique colors for each skin
$skin_data = [
    'default-catto' => ['color' => [255, 107, 89], 'bg' => [255, 200, 180], 'name' => 'Default Catto'],
    'wizard-catto' => ['color' => [106, 13, 173], 'bg' => [200, 150, 230], 'name' => 'Wizard Catto'],
    'doctor-catto' => ['color' => [52, 152, 219], 'bg' => [180, 220, 255], 'name' => 'Doctor Catto'],
    'pirate-catto' => ['color' => [44, 44, 44], 'bg' => [150, 150, 150], 'name' => 'Pirate Catto'],
    'artist-catto' => ['color' => [231, 76, 60], 'bg' => [255, 200, 190], 'name' => 'Artist Catto'],
    'chef-catto' => ['color' => [255, 180, 50], 'bg' => [255, 240, 210], 'name' => 'Chef Catto'],
    'astronaut-catto' => ['color' => [100, 100, 120], 'bg' => [200, 200, 210], 'name' => 'Astronaut Catto'],
    'ocean-explorer' => ['color' => [30, 144, 255], 'bg' => [180, 220, 255], 'name' => 'Ocean Explorer'],
    'king-of-learning' => ['color' => [255, 215, 0], 'bg' => [255, 240, 180], 'name' => 'King of Learning']
];

function createUniqueSkinImage($path, $color, $bg_color, $name) {
    $width = 200;
    $height = 200;
    $image = imagecreatetruecolor($width, $height);
    
    $r = $color[0];
    $g = $color[1];
    $b = $color[2];
    
    $br = $bg_color[0];
    $bg_g = $bg_color[1];
    $bg_b = $bg_color[2];
    
    // Background (solid)
    $bg = imagecolorallocate($image, $br, $bg_g, $bg_b);
    imagefilledrectangle($image, 0, 0, $width, $height, $bg);
    
    // Main circle (the skin color)
    $skin_color = imagecolorallocate($image, $r, $g, $b);
    imagefilledellipse($image, $width/2, $height/2, 150, 150, $skin_color);
    
    // Circle border
    $border = imagecolorallocate($image, max(0, $r - 60), max(0, $g - 60), max(0, $b - 60));
    imageellipse($image, $width/2, $height/2, 150, 150, $border);
    imageellipse($image, $width/2, $height/2, 148, 148, $border);
    
    // Inner circle highlight
    $highlight = imagecolorallocate($image, min(255, $r + 80), min(255, $g + 80), min(255, $b + 80));
    imagefilledellipse($image, 90, 80, 40, 30, $highlight);
    
    // Eyes (white)
    $white = imagecolorallocate($image, 255, 255, 255);
    imagefilledellipse($image, 70, 80, 28, 32, $white);
    imagefilledellipse($image, 130, 80, 28, 32, $white);
    
    // Eye borders
    $dark = imagecolorallocate($image, 46, 38, 87);
    imageellipse($image, 70, 80, 28, 32, $dark);
    imageellipse($image, 130, 80, 28, 32, $dark);
    
    // Pupils
    imagefilledellipse($image, 75, 85, 10, 12, $dark);
    imagefilledellipse($image, 125, 85, 10, 12, $dark);
    
    // Pupil highlights
    $pupil_highlight = imagecolorallocate($image, 255, 255, 255);
    imagefilledellipse($image, 72, 82, 4, 4, $pupil_highlight);
    imagefilledellipse($image, 122, 82, 4, 4, $pupil_highlight);
    
    // Nose
    $nose = imagecolorallocate($image, max(0, $r - 40), max(0, $g - 40), max(0, $b - 40));
    imagefilledellipse($image, 100, 100, 14, 10, $nose);
    
    // Smile
    $smile_color = imagecolorallocate($image, max(0, $r - 80), max(0, $g - 80), max(0, $b - 80));
    imagearc($image, 100, 115, 45, 30, 0, 180, $smile_color);
    imagearc($image, 100, 115, 47, 32, 0, 180, $smile_color);
    
    // Whiskers
    $whisker = imagecolorallocate($image, max(0, $r - 40), max(0, $g - 40), max(0, $b - 40));
    // Left whiskers
    imageline($image, 40, 95, 15, 90, $whisker);
    imageline($image, 40, 100, 15, 100, $whisker);
    imageline($image, 40, 105, 15, 110, $whisker);
    // Right whiskers
    imageline($image, 160, 95, 185, 90, $whisker);
    imageline($image, 160, 100, 185, 100, $whisker);
    imageline($image, 160, 105, 185, 110, $whisker);
    
    // Save
    imagepng($image, $path);
    imagedestroy($image);
    return true;
}

echo "<h2>🎨 Creating Unique Catto Skin Images in imgs/profile/</h2>";
echo "<hr>";

$created = 0;
$skipped = 0;

foreach ($skin_data as $skin_name => $data) {
    $dest = $profile_folder . $skin_name . '.png';
    $color = $data['color'];
    $bg = $data['bg'];
    $display_name = $data['name'];
    
    if (file_exists($dest) && filesize($dest) > 500) {
        echo "✅ Already exists: <strong>$skin_name.png</strong> ($display_name)<br>";
        $skipped++;
    } else {
        if (createUniqueSkinImage($dest, $color, $bg, $display_name)) {
            echo "✅ Created: <strong>$skin_name.png</strong> ($display_name)<br>";
            $created++;
        } else {
            echo "❌ Failed to create: <strong>$skin_name.png</strong><br>";
        }
    }
}

echo "<hr>";
echo "<h3>📊 Summary:</h3>";
echo "<ul>";
echo "<li>✅ Created: <strong>$created</strong> unique files</li>";
echo "<li>⏭️ Skipped: <strong>$skipped</strong> files (already exist)</li>";
echo "</ul>";

// Verify all files
echo "<h3>🔍 Verifying files in imgs/profile/: </h3>";
echo "<ul>";
$all_ok = true;
foreach ($skin_data as $skin_name => $data) {
    $path = $profile_folder . $skin_name . '.png';
    if (file_exists($path) && filesize($path) > 0) {
        $size = round(filesize($path) / 1024, 1);
        $color = $data['color'];
        echo "<li style='color:green;'>✅ $skin_name.png ({$data['name']}) - RGB({$color[0]},{$color[1]},{$color[2]}) - {$size}KB</li>";
    } else {
        echo "<li style='color:red;'>❌ $skin_name.png - MISSING!</li>";
        $all_ok = false;
    }
}
echo "</ul>";

if ($all_ok) {
    echo "<h3 style='color:green;'>🎉 All unique images created successfully!</h3>";
    echo "<p>Each skin now has its own unique color!</p>";
}

echo "<hr>";
echo "<p><a href='profile.html' style='display:inline-block;padding:10px 24px;background:#FF6B59;color:white;border-radius:999px;text-decoration:none;font-weight:bold;'>Go to Profile</a></p>";
?>