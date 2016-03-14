<?php
session_start();
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
ini_set('display_errors', 1);
ini_set('html_errors', false);
error_reporting(E_ALL ^ E_DEPRECATED);

$db_hostname = 'localhost:3306';
$db_database = 'ivytrade';
$db_username = 'root'; 
$db_password = 'root'; 

include 'functions.php';

connect($db_hostname, $db_database, $db_username, $db_password);

$cmd = getValue("cmd");

if ( $cmd == "login" AND isset($_POST['user']) AND isset($_POST['pass']))
{
	$user = getValue("user");
	$pass = getValue("pass");

	$results = select("SELECT * FROM User WHERE USER_NAME='$user' AND USER_PASS='$pass'");

	if($results == null)
	{
		$_SESSION["loggedIn"] = FALSE;
	}
	else
	{
		$_SESSION["loggedIn"] = TRUE;
	}

	echo json_encode($results);
}
else if($cmd == "populate")
{
	$index = getValue("index");

	$results = select("SELECT * FROM Item WHERE USER_ID=$index");
	echo json_encode($results);
}
else if($cmd == "addItem")
{
	$index = getValue("index");
	$name = getValue("name");
	$cat = getValue("category");
	$price = getValue("price");
	//$desc = getValue("desc");
	$desc = basename($_FILES["fileToUpload"]["name"]);
	$date = date('Y-m-d');
	$time = date('H:i:s');
	$end = date('Y-m-d', strtotime($date . ' + 14 days'));

	$sourcePath = $_FILES['file']['tmp_name'];       // Storing source path of the file in a variable
	$targetPath = "uploads/".$_FILES['file']['name']; // Target path where file is to be stored
	move_uploaded_file($sourcePath,$targetPath) ;    // Moving Uploaded file
	
	/*
	$target_dir = "uploads/";
	$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
	$uploadOk = 1;
	$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

	if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file))
    {
        $desc = "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    }
    else
    {
        $desc = "Sorry, there was an error uploading your file. -- " . $_FILE['ufile']['error'];
    }
	*/

	$query = "INSERT INTO Item (USER_ID, ITEM_NAME, ITEM_CAT, ITEM_PRICE, ITEM_POSTDATE, ITEM_EXPDATE, ITEM_DESC) VALUES ($index, '$name','$cat',$price,'$date', '$end','$desc')";
	insert($query);
	echo json_encode($error);
}
else if($cmd == "category")
{
	$cat = getValue("cat");

	$results = select("SELECT * FROM Item WHERE ITEM_CAT='$cat'");
	echo json_encode($results);
}
?>