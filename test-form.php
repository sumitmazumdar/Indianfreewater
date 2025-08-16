<?php
// Simple test file to check server capabilities
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Test if we can receive data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Log the received data
    error_log("Received data: " . print_r($data, true));
    
    echo json_encode([
        'success' => true,
        'message' => 'Test successful',
        'received_data' => $data,
        'server_info' => [
            'php_version' => PHP_VERSION,
            'curl_available' => function_exists('curl_init'),
            'json_available' => function_exists('json_encode'),
            'method' => $_SERVER['REQUEST_METHOD']
        ]
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Only POST requests allowed',
        'method' => $_SERVER['REQUEST_METHOD']
    ]);
}
?>

