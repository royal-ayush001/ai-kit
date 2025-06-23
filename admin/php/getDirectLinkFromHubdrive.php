<?php
header("type: application/json");
require_once('allowedOrigin.php');
header("Access-Control-Allow-Methods: GET");
$link= $_GET['link'];
$domain=implode('/', array_slice(explode('/', $link), 0, 3));
$id= implode('/', array_slice(explode('/', $link), -1));
$triedTime=0;

$url = "$domain/ajax.php?ajax=direct-download";
$data = "id=$id";

// Initialize cURL
function tryLink($triedTime,$url,$data){

$ch = curl_init($url);

// Set headers
$headers = [
    'accept: application/json, text/javascript, */*; q=0.01',
    'accept-language: en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7',
    'content-type: application/x-www-form-urlencoded; charset=UTF-8',
    'x-requested-with: XMLHttpRequest'
];

// cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_REFERER, "$domain/"); // mimic origin
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); // Optional

// Execute request
$response = curl_exec($ch);
$triedTime++;

// Handle errors
if (curl_errno($ch)) {
    echo 'cURL Error: ' . curl_error($ch);
} else {
    header('Content-Type: application/json');
    // echo $response;
    $resData= json_decode($response, true);
    if($resData['code']==200){
        $resData['triedTime']=$triedTime;
        echo json_encode($resData,JSON_PRETTY_PRINT);
    }else{
        tryLink($triedTime,$url,$data);

    }
}
}
tryLink($triedTime,$url,$data);
curl_close($ch);

?>
