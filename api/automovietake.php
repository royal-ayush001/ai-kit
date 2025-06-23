<?php
/*
PASS THE DUDEFILM HOME PAGE URL IN GET WITH 'mvlnk' AND IT WILL RETURN THE DIRECT DOWNLOADABLE LINK
*/

header("access-control-allow-origin: *");
header("access-control-allow-methods: get");
header("content-type: application/json");

$moviePageLnk=$_GET['mvlnk'];
$moveieLnk= json_decode($moviePageLnk,true);

$data=[];

forEach($moveieLnk as $lnk){
    $fileCode=getCodeOf($lnk);
    $imgLnk=preg_match('/https:..i.imgur.com.*?(jpg)/',$fileCode,$imgAry);
    $imgLnk=$imgAry[0];

    $lnk=preg_match('/https:\/\/dflinks\.club\/archives\/\d*/', $fileCode ,$ar);
    $fileCode=getCodeOf($ar[0]);
    $lnk=preg_match_all('/http.*?(\.mkv)/',$fileCode,$ar);

    $ar=[$ar[0][0],$imgLnk,count($ar[0])];
    array_push($data, $ar);
}

function getCodeOf($url){
    $f=file($url);
    $srcCode="";
    foreach($f as $key => $line){
        $srcCode.=(htmlspecialchars($line)."\n");
    }
    return $srcCode;
}
echo json_encode($data);


?>