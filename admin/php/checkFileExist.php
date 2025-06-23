<?php
$url=$_GET["link"];
// $url = "https://pub-c457a64d90034e34aba3bb1cb1734650.r2.dev/Kesari.Veer.Legends.of.Somnath.2025.1080p.HDTC.Hindi.Line.x264.HDHub4u.Ms.mkv";
// $url="https://pub-2c4b42b3434b40fc8dc73353cd1501f8.r2.dev/Sitare.Zameen.Par.2025.HQ.1080p.V2.HDTC.Hindi.Line.HC.ESub.x264.HDHub4u.Ms.mkv";
// Initialize cURL
$ch = curl_init($url);

// Set cURL options to make a HEAD request
curl_setopt($ch, CURLOPT_NOBODY, true); // HEAD request
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true); // Return headers
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Follow redirects

// Execute the request
$response = curl_exec($ch);

// Get HTTP response code
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Close the cURL session
curl_close($ch);


// Output results
if ($httpCode == 200) {
    echo json_encode(["status"=>true,"lnk"=>$url]);
} else {
    echo json_encode(["status"=>false,"lnk"=>$url]);
}

?>
