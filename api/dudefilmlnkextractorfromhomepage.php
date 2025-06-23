<?php
/*
PASS THE DUDEFILM HOME PAGE URL IN GET WITH 'mvlnk' AND IT WILL RETURN THE DIRECT DOWNLOADABLE LINK
*/
$moviePageLnk=$_GET['mvlnk'];
$fileCode=getCodeOf($moviePageLnk);
$imgLnk=preg_match('/https:..i.imgur.com.*?(jpg)/',$fileCode,$imgAry);
$imgLnk=$imgAry[0];

$lnk=preg_match('/https:\/\/dflinks\.club\/archives\/\d*/', $fileCode ,$ar);
$fileCode=getCodeOf($ar[0]);
$lnk=preg_match_all('/http.*?(\.mkv)/',$fileCode,$ar);

$ar=[$ar[0][0],$imgLnk,count($ar[0])];
echo json_encode($ar);

function getCodeOf($url){
    $f=file($url);
    $srcCode="";
    foreach($f as $key => $line){
        $srcCode.=(htmlspecialchars($line)."\n");
    }
    return $srcCode;
}
?>
