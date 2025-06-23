<?php
   session_start();
   require_once('db.php');
   require_once('allowedOrigin.php');
   header("content-type: application/json");

   header('Access-control-allow-methods: post');
   header('Access-control-allow-headers: content-type,X-Requested-With');

   if($_SESSION['aun']){
        $data=json_decode(file_get_contents('php://input'),true);

        $name=$data['name'];
        $img=$data['img'];
        $directLink=$data['gd'];
        $movieQ=$data['movieQ'];
        $size=$data['s'];
        $duration=$data['t'];
        $hubDriveId=$data['id'];
        $type=$data['type'];
        
        $out=$pdoc->insert("movies",["name"=>"$name","quality"=>"$movieQ","hubdriveId"=>"$hubDriveId","img"=>"$img","directLink"=>"$directLink","duration"=>"$duration","size"=>"$size","type"=>$type]);
        echo json_encode($out,JSON_PRETTY_PRINT);
    } else {
        echo json_encode(['status'=>false,'message'=>'You are not logged in.']);
        exit;
   }
?>