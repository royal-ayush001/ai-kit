<?php
require_once('allowedOrigin.php');
require_once('db.php');
header("Access-Control-Allow-Methods: GET");
header("type: application/json");
$name=$_GET['name'];
$result=$pdoc->select("*","movies","where name=?",["$name"]);
echo json_encode($result,JSON_PRETTY_PRINT);
?>