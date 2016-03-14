<?php 
$db_server = NULL;
$error = NULL;

function connect($db_hostname, $db_database, $db_username, $db_password)
{
	global $error, $db_server;

	$db_server = mysql_connect($db_hostname, $db_username, $db_password); 
	if ($db_server == FALSE) 
	{
		$error = "Unable to connect to MySQL: " . mysql_error();
		trigger_error('Database connection failed: ' . mysql_error(), E_USER_ERROR);
	}
	else
	{
		if (mysql_select_db($db_database) == FALSE)
		{			
			$error = "Unable to select MySQL DB: " . mysql_error();
			trigger_error('Selecting database failed: '  . $query . " - " . mysql_error(), E_USER_ERROR);
		}		
	}
}

function select($query)
{
	global $error;
		
	$result = mysql_query($query); 

	if ($result == FALSE)
	{
		$error = "MySQL query error: " . mysql_error();
		trigger_error('MySQL query error: ' . $query . " - " . mysql_error(), E_USER_ERROR);
	}
	else
	{
		$rows = mysql_num_rows($result); 
		for ($j = 0; $j < $rows; $j++) 
		{ 
			$row = mysql_fetch_row($result);
			$results[] = $row;
		}
	}	
	return $results;
}

function insert($query)
{
	global $error;
		
	$result = mysql_query($query); 

	if ($result == FALSE)
	{
		trigger_error('MySQL query error: ' . $query . " - "  . mysql_error(), E_USER_ERROR);
	}
	return;
}

function delete($query)
{
	global $error;
		
	$result = mysql_query($query); 

	if ($result == FALSE)
	{
		trigger_error('MySQL query error: ' . $query . " - "  . mysql_error(), E_USER_ERROR);
	}
	return;
}

function update($query)
{
	global $error;
		
	$result = mysql_query($query); 

	if ($result == FALSE)
	{
		trigger_error('MySQL query error: ' . $query . " - "  . mysql_error(), E_USER_ERROR);
	}
	return;
}

function disconnect()
{
	global $db_server;
	mysql_close($db_server);
}

function getValue($key)
{
	$ret = "";
	if (isset($_GET[$key]))
		$ret = $_GET[$key];
	else if (isset($_POST[$key]))
		$ret = $_POST[$key];
	else
		echo "getValue failed for " . $key . "\n\n";
	return $ret;
}
?>