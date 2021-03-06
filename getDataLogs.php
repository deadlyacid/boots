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

	public function getLogs(){
		$details = $_POST['details'];

		$this->db->query('select u.fname, l.user_id, l.start_time, l.end_time, l.total, l.indx,
							case l.day_of_week 
								when "sunday" then "ראשון"
								when "monday" then "שני"
								when "tuesday" then "שלישי"
								when "wednesday" then "רביעי"
								when "thursday" then "חמישי"
								when "friday" then "שישי"
								when "saturday" then "שבת"
							end as day_of_week
							from logs as l, users as u where l.user_id = :user_id and l.user_id = u.id and l.start_time >= :start_time and l.end_time <= :end_time');
		$this->db->bind( ':user_id', $details['user_id'] );
		$this->db->bind( ':start_time', $details['start_time'] );
		$this->db->bind( ':end_time', $details['end_time'] );
		$rows = $this->db->resultset();

		echo json_encode( $rows );
	}

	public function edit_logs(){
		$start_time_new = $_POST['start_time_new'];
		$end_time_new = $_POST['end_time_new'];
		$log_id = $_POST['log_id'];

		$sDT = new DateTime( $start_time_new );
		$eDT = new DateTime( $end_time_new );

		$total = date_diff( $sDT, $eDT );
		
		$total_str = $total->format("%H:%I");

		$this->db->query('update logs set start_time =:start_time_new, end_time =:end_time_new, total =:total_str where indx =:log_id' );
		$this->db->bind( ':log_id', $log_id );
		$this->db->bind( ':start_time_new', $start_time_new );
		$this->db->bind( ':end_time_new', $end_time_new );
		$this->db->bind( ':total_str', $total_str );
		try{
			$row = $this->db->execute();
			echo json_encode( "ok" );
		}
		catch(Exception $e){
			echo json_encode($e);
		}
	}

	public function set_manual_time(){
		$sa_new_time = $_POST['new_time'];
		
		$dt 		= new DateTime();

		$dt->setTimezone(new DateTimeZone('Asia/Jerusalem'));
 		$currentDt	 = $dt->format('Y-m-d H:i:s');
 		$dayOfWeek = strtolower( date('l', strtotime($currentDt)) );

		$sDT = new DateTime( $sa_new_time["sa_time_from"] );
		$eDT = new DateTime( $sa_new_time["sa_time_to"] );

		$total = date_diff( $sDT, $eDT );
		$total_str = $total->format("%H:%I");

		$sT = date('Y-m-d H:i:s',  strtotime( $sa_new_time["sa_date"]. ' ' .  $sa_new_time["sa_time_from"] ) );
		$eT = date('Y-m-d H:i:s', strtotime( $sa_new_time["sa_date"]. ' ' .  $sa_new_time["sa_time_to"] ) );

		

		$this->db->query('insert into logs (start_time , end_time , total , user_id, day_of_week ) VALUES (:start_time_new, :end_time_new, :total_str, :user_id, :dayOfWeek)' );
		$this->db->bind( ':user_id', $sa_new_time["sa_uid"] );
		$this->db->bind( ':start_time_new',  $sT );
		$this->db->bind( ':end_time_new',  $eT );
		$this->db->bind( ':total_str', $total_str );
		$this->db->bind( ':dayOfWeek', $dayOfWeek);
		try{
			$row = $this->db->execute();
			echo ( "ok" );
		}
		catch(Exception $e){
			echo ($e);
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
