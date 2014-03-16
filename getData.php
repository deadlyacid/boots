<?php
include 'database.class.php';
try{
	$db = new Database();
}
catch(Exception $e){
	die ("some_err: ".$e);
}

class dbAction{

	public $db;

	function __construct(){
		try{
			$this->db = new Database();
		}
		catch(Exception $e){
			die ("some_err: ".$e);
		}
	}

	public function getData(){
		$this->db->query('select * from users');
		$rows = $this->db->resultset();

		echo json_encode( $rows );
	}

	public function checkTim(){
		$user_id = $_POST['user_id'];
		$this->db->query('select * from logs where end_time is null and start_time is not null and user_id = :user_id ');
		$this->db->bind( ':user_id', $user_id );
		$row = $this->db->single();
	
		echo json_encode( $row );
	}

	public function logAction(){
		$user_id 	= $_POST['user_id'];
		$type 		= $_POST['type'];
		$dt 		= new DateTime();

		$dt->setTimezone(new DateTimeZone('Asia/Jerusalem'));
 		$currentDt	 = $dt->format('Y-m-d H:i:s');
 		$dayOfWeek = strtolower( date('l', strtotime($currentDt)) );

		($type === "login") ? ($this->login($user_id, $currentDt, $dayOfWeek)) : ($this->logout($user_id, $currentDt)) ;

	}

	private function login($user_id, $currentDt, $dayOfWeek){
		$this->db->query('insert into logs (user_id, start_time, day_of_week) VALUES (:user_id, :start_time, :day_of_week)');
		$this->db->bind( ':user_id', $user_id );
		$this->db->bind( ':start_time', $currentDt );
		$this->db->bind( ':day_of_week', $dayOfWeek );
		try{
			$row = $this->db->execute();
			echo ( $currentDt );
		}
		catch(Exception $e){
			echo ($e);
		}
	}

	private function logout($user_id, $currentDtstr){
		$this->db->query('select start_time from logs where end_time is null and start_time is not null and user_id = :user_id ');
		$this->db->bind( ':user_id', $user_id );
		$row = $this->db->single();
		$start_time = new DateTime( $row['start_time'] );
		$currentDt  = new DateTime( $currentDtstr );
		$total = date_diff($start_time, $currentDt);
		
		$total_str = $total->format("%H:%I");;

		$this->db->query('update logs set end_time = :end_time, total = :total_str where user_id = :user_id and end_time is null and start_time is not null');
		$this->db->bind( ':user_id', $user_id );
		$this->db->bind( ':end_time', $currentDtstr );
		$this->db->bind( ':total_str', $total_str );
		try{
			$row = $this->db->execute();
			$allInfo = array( $currentDtstr, $total_str );
			echo json_encode( $allInfo );
		}
		catch(Exception $e){
			echo json_encode($e);
		}
	}
}

if ( isset($_POST['Action'] )) {
	$dbAction 	= new dbAction;
	$mathod		= $_POST['Action'];

	if ( is_callable( (array( $dbAction, $mathod )) ) )
	{
  		$dbAction->$mathod();
 	}
	else
		throw new Exception("Error Processing Request, undefined callable mathod!", 1);
		
} 
