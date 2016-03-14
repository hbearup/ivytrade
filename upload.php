<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
ini_set('display_errors', 1);
ini_set('html_errors', false);
error_reporting(E_ALL ^ E_DEPRECATED);

$config = parse_ini_file('database.ini'); 

include 'functions.php';

connect($config['server'], $config['database'], $config['user'], $config['password']);

$index = getValue("index");
$name = getValue("itemName");
$cat = getValue("itemCategory");
$price = getValue("itemPrice");
$desc = getValue("itemDesc");
$date = date('Y-m-d');
$time = date('H:i:s');
$end = date('Y-m-d', strtotime($date . ' + 14 days'));

$result = mysql_query("SELECT MAX(ITEM_ID) FROM Item");
$itemIndex = mysql_result($result, 0);
$itemIndex++;

$sourcePath = $_FILES['pic']['tmp_name'];
$targetPath = "uploads/". $index . "." . $_FILES['pic']['type'];
$filename = $_FILES["pic"]["name"];
$extension = end(explode(".", $filename));
$newfilename = $index . "-" . $itemIndex . "." . $extension;
move_uploaded_file($sourcePath, "uploads/" . $newfilename);

$query = "INSERT INTO Item (USER_ID, ITEM_NAME, ITEM_CAT, ITEM_PRICE, ITEM_POSTDATE, ITEM_EXPDATE, ITEM_DESC, ITEM_PHOTODIR) VALUES ($index, '$name','$cat',$price,'$date', '$end','$desc','$newfilename')";
insert($query);
echo json_encode($error);
?>