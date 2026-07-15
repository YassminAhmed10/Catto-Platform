<?php
// This will create unique colored images for each skin
$profile_folder = 'imgs/profile/';

// Create profile folder if it doesn't exist
if (!file_exists($profile_folder)) {
    mkdir($profile_folder, 0777, true);
    echo "📁 Created profile folder<br>";
}

// Define skin colors and emojis
$skin_data = [
    'default-catto' => ['color' => [255, 107, 89], 'name' => 'Default Catto'],
    'wizard-catto' => ['color' => [106, 13, 173], 'name' => 'Wizard Catto'],
    'doctor-catto' => ['color' => [52, 152, 219], 'name' => 'Doctor Catto'],
    'pirate-catto' => ['color' => [0, 0, 0], 'name' => 'Pirate Catto'],
    'artist-catto' => ['color' => [231, 76, 60], 'name' => 'Artist Catto'],
    'chef-catto' => ['color' => [255, 255, 255], 'name' => 'Chef Catto'],
    'astronaut-catto' => ['color' => [189, 195, 199], 'name' => 'Astronaut Catto'],
    'ocean-explorer' => ['color' => [30, 144, 255], 'name' => 'Ocean Explorer'],
    'king-of-learning' => ['color' => [255, 215, 0], 'name' => 'King of Learning']
];

function createSkinImage($path, $color, $name) {
    $width = 200;
    $height = 200;
    $image = imagecreatetruecolor($width, $height);
    
    // Background gradient
    $r = $color[0];
    $g = $color[1];
    $b = $color[2];
    
    // Darker version for gradient
    $r2 = max(0, $r - 40);
    $g2 = max(0, $g - 40);
    $b2 = max(0, $b - 40);
    
    $bg = imagecolorallocate($image, $r, $g, $b);
    $bg2 = imagecolorallocate($image, $r2, $g2, $b2);
    
    // Create gradient background
    for ($i = 0; $i < $height; $i++) {
        $ratio = $i / $height;
        $cr = $r + ($r2 - $r) * $ratio;
        $cg = $g + ($g2 - $g) * $ratio;
        $cb = $b + ($b2 - $b) * $ratio;
        $color = imagecolorallocate($image, $cr, $cg, $cb);
        imageline($image, 0, $i, $width, $i, $color);
    }
    
    // Circle face (lighter center)
    $face_r = min(255, $r + 60);
    $face_g = min(255, $g + 60);
    $face_b = min(255, $b + 60);
    $face = imagecolorallocate($image, $face_r, $face_g, $face_b);
    imagefilledellipse($image, $width/2, $height/2, 150, 150, $face);
    
    // Border
    $border = imagecolorallocate($image, max(0, $r - 80), max(0, $g - 80), max(0, $b - 80));
    imageellipse($image, $width/2, $height/2, 150, 150, $border);
    imageellipse($image, $width/2, $height/2, 148, 148, $border);
    
    // Eyes (white)
    $white = imagecolorallocate($image, 255, 255, 255);
    imagefilledellipse($image, 70, 75, 30, 35, $white);
    imagefilledellipse($image, 130, 75, 30, 35, $white);
    
    // Eye borders
    $dark = imagecolorallocate($image, 46, 38, 87);
    imageellipse($image, 70, 75, 30, 35, $dark);
    imageellipse($image, 130, 75, 30, 35, $dark);
    
    // Pupils
    imagefilledellipse($image, 75, 80, 12, 14, $dark);
    imagefilledellipse($image, 125, 80, 12, 14, $dark);
    
    // Pupil highlights
    $highlight = imagecolorallocate($image, 255, 255, 255);
    imagefilledellipse($image, 72, 76, 4, 4, $highlight);
    imagefilledellipse($image, 122, 76, 4, 4, $highlight);
    
    // Smile
    $smile_color = imagecolorallocate($image, max(0, $r - 100), max(0, $g - 100), max(0, $b - 100));
    imagearc($image, 100, 110, 50, 35, 0, 180, $smile_color);
    imagearc($image, 100, 110, 52, 37, 0, 180, $smile_color);
    
    // Add small text label (optional)
    $label_color = imagecolorallocate($image, 255, 255, 255);
    $label = substr($name, 0, 1);
    imagestring($image, 3, 95, 140, $label, $label_color);
    
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
    $display_name = $data['name'];
    
    if (file_exists($dest) && filesize($dest) > 0) {
        echo "✅ Already exists: <strong>$skin_name.png</strong> ($display_name)<br>";
        $skipped++;
    } else {
        if (createSkinImage($dest, $color, $display_name)) {
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
echo "<li>✅ Created: <strong>$created</strong> files</li>";
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
        echo "<li style='color:green;'>✅ $skin_name.png ({$data['name']}) - {$size}KB</li>";
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