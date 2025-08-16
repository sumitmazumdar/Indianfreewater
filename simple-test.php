<?php
// Simple test that returns plain text
header('Content-Type: text/plain');
header('Access-Control-Allow-Origin: *');

echo "PHP Test Successful!\n";
echo "Method: " . $_SERVER['REQUEST_METHOD'] . "\n";
echo "PHP Version: " . PHP_VERSION . "\n";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "POST data received:\n";
    $input = file_get_contents('php://input');
    echo "Raw input: " . $input . "\n";
    
    $data = json_decode($input, true);
    if ($data) {
        echo "JSON decoded successfully\n";
        print_r($data);
    } else {
        echo "JSON decode failed\n";
    }
} else {
    echo "No POST data\n";
}
?>

