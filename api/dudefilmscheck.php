<?php 

header("access-control-allow-origin: *");
header("content-type: application/json");
header("access-control-allow-methods: get");
header("access-control-allow-headers: content-type,access-control-allow-methods,access-control-allow-origin");

$urlToCheck=$_GET['urlcheck'];

$code=getCodeOfDudeFimlmsSpecial($urlToCheck);

preg_match_all("/(?<=href..).*?(?=. )/", $code, $ary);
$webseries=[];$movies=[];

$ary=$ary[0];


for($i=0; $i<count($ary)-2; $i+=2){
  strpos($ary[$i],'season')!=0?array_push($webseries, $ary[$i]):array_push($movies, $ary[$i]);
}

$domAry=explode('/', $movies[0]);
array_pop($domAry);
array_pop($domAry);
$dudedomain=implode('/', $domAry);

echo json_encode([
  "domain"=>$dudedomain,
  "movieAry"=>$movies,
  "seriesAry"=>$webseries,
]);

function getCodeOfDudeFimlmsSpecial($url){
    $f=file($url);
    $srcCode="";
    $startAdd=false;
    foreach($f as $key => $line){
      $lineCode=(htmlspecialchars($line)."\n");

      if($startAdd){
        $srcCode.=str_replace('quot;', '', $lineCode);
      }else if(strpos($lineCode, "how-to-download-movies") != false ){
        $startAdd=true;
      }
    }
    return $srcCode;
}
?>