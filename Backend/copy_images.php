<?php
$source = 'imgs/Cattoimages/wizard-catto.png';
$destination_folder = 'imgs/Cattoimages/';

$images = [
    'artist-catto.png',
    'chef-catto.png', 
    'astronaut-catto.png',
    'ocean-explorer-catto.png',
    'king-of-learning.png',
    'pirate-catto.png'
];

foreach ($images as $img) {
    $dest = $destination_folder . $img;
    if (!file_exists($dest)) {
        copy($source, $dest);
        echo "Created: $dest\n";
    } else {
        echo "Already exists: $dest\n";
    }
}
echo "Done!";
?>