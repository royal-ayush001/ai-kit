<?php
   session_start();
   require_once('db.php');
   require_once('allowedOrigin.php');
   header("content-type: application/json");
   
   header('Access-control-allow-methods: get');
   header('Access-control-allow-headers: content-type,X-Requested-With');

   if($_SESSION['aun']){
      echo json_encode(['status'=>true]);
   }else{
      echo json_encode(['status'=>false]);
   }

?>