<?php
   session_start();
   require_once('db.php');
   require_once('allowedOrigin.php');
   header("content-type: application/json");
   
   header('Access-control-allow-methods: post');
   header('Access-control-allow-headers: content-type,X-Requested-With');
   $data=json_decode(file_get_contents('php://input'),true);
   $aun=$data['username'];
   $pa=$data['password'];
   try{
	  $out=$pdoc->select("id,password,name","admin","where id=? and password=?",["$aun","$pa"]);

      if($out[0]['password']==$pa){
         $_SESSION['aun']=$out[0]['id'];
         $aun=$out[0]['id'];
	      unset($out[0]['password']);
	      $out[0]['status']=true;
	      echo json_encode($out[0],JSON_PRETTY_PRINT);

      }else{
	      $ms='Wrong email or password.';
	      echo json_encode(['status'=>false,'message'=>$ms]);
      }
   }catch(PDOException $e){
      $ms='An error occured.';
      echo json_encode(['status'=>false,'message'=>$ms]);
   }


?>