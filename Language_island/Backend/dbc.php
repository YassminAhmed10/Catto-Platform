<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$connection = mysqli_connect('localhost', 'root', '', 'language_island');

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
?>