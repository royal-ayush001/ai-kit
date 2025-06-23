<?php
require_once('allowedOrigin.php');
require_once('db.php');
header("Access-Control-Allow-Methods: GET");
header("type: application/json");
$result=$pdoc->select("*","movies","group by name order by mid desc");
echo json_encode($result,JSON_PRETTY_PRINT);
?>