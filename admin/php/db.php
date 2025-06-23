<?php

class pdoCls{
	private $dbn="ai_player",	
	$user="root",
	$pass="",
	$conn,
	$dbName;	

	function __construct(){
		$this->dbName="mysql:host=localhost;dbname=$this->dbn;";
		try{
			$this->conn=new PDO($this->dbName,$this->user,$this->pass);
		}catch(PDOException $r){
			die(json_encode(["status"=>0,"message"=>"Uable to connect ".$r->getMessage()]));
		}

		// echo json_encode($this->select("*","tab1","where name=? and percentage=?",["Aman Kumar",40]),JSON_PRETTY_PRINT);
		// echo json_encode($this->insert("tab1",["name"=>"Rajaraja","percentage"=>10,"cityid"=>2]),JSON_PRETTY_PRINT);
		// echo json_encode($this->delete("tab1","name=?",["Rajaraja"]),JSON_PRETTY_PRINT);

// UPDATE `tab1` SET `percentage` = '89' WHERE `tab1`.`uid` = 1;
		// echo json_encode($this->update("tab1",["name"=>"Rajendra","percentage"=>"60"],"name='Rajaraja'"),JSON_PRETTY_PRINT);
		// echo json_encode($this->update("tab1",["name"=>"Rajaraja","percentage"=>"40"],"name='Rajendra'"),JSON_PRETTY_PRINT);;
	}

	function fileUpload($file,$path="",$name="file",$ext=''){
		return move_uploaded_file($file['tmp_name'], $path.$name.".$ext");
	}

	function query($sql){
		return $this->execute($sql);
	}

	private function checkError($sql){
		/*send here the sql after executing only*/
		return (!$sql->errorInfo()[2])? true:false;
	}

	function returnResult($sql,$type=PDO::FETCH_ASSOC){
		/*function is to return the result in array and hides the real error*/
		if(!$sql->errorInfo()[2]){
			return $sql->fetchAll($type);
		}else{
			return ["status"=>0,"message"=>"There is problem"];
		}
	}

	public function execute($sql,$params=[]){
		/*
		pass parameter like this:
		$this->select("*","tab1","where name=? and percentage=?",["Aman Kumar",40])
		*/
		$sql=$this->conn->prepare($sql);
		$sql->execute($params);
		return $sql;
	}

	public function ifTabExist($tab){
		/*checkes if the tabel in datavase exists*/
		$sql=$this->conn->query("show tables from $this->dbn like'$tab'");
		$sql->execute();
		echo count($sql->fetchAll())>0?true:false;
	}

	public function insert($tab, $data){
		/*used to insert data into tabel and $data needs tha assoc array as the data*/
		$column=implode(',', array_keys($data));
		$values='"'.implode('","', array_values($data)).'"';
		$sql=$this->execute("INSERT into $tab($column) values($values)");

		if(!$sql->errorInfo()[2]){
			return ["status"=>true,"lastInserId"=>$this->conn->lastInsertId()];
		}else{
			return false;
		}
	}

	public function select($column,$tab,$where="",$param=[]){
		/*used to select it can be also used to login*/
		$data=$this->execute("select $column from $tab $where",$param);
		return $this->returnResult($data);
	}


	function update($tab,$data,$where,$param=[]){
		$str="";$sep="";
		foreach ($data as $key => $value) {
			$str.=$sep."$key='$value'";
			$sep=",";
		}
		$sql="UPDATE $tab set $str where $where";
		$sql=$this->execute($sql,$param);
		$numUp=$sql->rowCount();

		if($numUp){
			return ["status"=>true,"message"=>"Record update successfully.","rowCount"=>$numUp];
		}else{
			return ["status"=>false,"message"=>"found problem"];
		}
	}

	function delete($tab,$where,$param=[]){
		/*STRUCTURE: $this->delete("tab1","name=?",["Rajaraja"]*/
		$sql="DELETE FROM $tab where $where";
		$sql=$this->execute($sql,$param);
		$numDel=$sql->rowCount();
		if($numDel){
			return ["status"=>true,"message"=>"Record deleted succes fully","deleteCount"=>$numDel];
		}else{
			return ["status"=>false,"message"=>"found problem"];
		}
	}

	function __destruct(){
		$this->conn=null;
	}
}

$pdoc=new pdoCls();

class storage{

	/*
	$localStorage->set("dlrToInr","86");
	echo $localStorage->get("dlrToInr");
	$localStorage->delete("dlrToInr");
	*/
	function __construct(){
		global $pdoc;
		$this->pdoc=$pdoc;
	}
	function get($name){
		$result = $this->pdoc->select("*","storage","where name=?",["$name"]);
		if(count($result)>0){
			return $result[0]["value"];
		}else{
			return false;
		}
	}
	function set($name,$value){
		if($this->get($name)){
			$result = $this->pdoc->update("storage",["value"=>$value],"name=?",["$name"]);
		}
		else{
			$result = $this->pdoc->insert("storage",["name"=>$name,"value"=>$value]);	
		}
	}
	function delete($name){
		if($this->get($name)){
			$result = $this->pdoc->delete("storage","name=?",["$name"]);
		}
	}
}
$localStorage=new storage();

?>