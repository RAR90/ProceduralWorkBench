<?php
	$self = $_SERVER['PHP_SELF'];
	$theme = 'default'; //put theme names here
	$company = 'Empresa';
	$url = 'http://'.$_SERVER['SERVER_NAME'].$_SERVER['PHP_SELF'];
?>

<!DOCTYPE html>
<html lang="pt">
<head>
	<title><?=$company?></title>

	<!-- Page Defaults -->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="cache-control" content="Public">
	<meta name="document-state" content="Dynamic">

	<!-- Favorite Icon -->
	<link rel="shortcut icon" href="imgs/favicon.ico" type="image/x-icon">
	<link rel="icon" href="imgs/favicon.ico" type="image/x-icon">

	<!-- Page Description -->
	<meta name="description" content="">
	<meta name="author" content="">
	<meta name="revisit-after" content="7 days">
	<meta name="document-distribution" content="Global">
	<meta name="keywords" content="">
	<meta name="title" content="">

	<!-- Custom Fonts -->
	<link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">

	<!-- JQuery -->
	<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.min.js"></script>

	<!-- Bootstrap Core CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

	<!-- Plugins -->
	<link href="includes/plugins.min.css" rel="stylesheet">
	<script src="includes/plugins.min.js"></script>

	<!-- Custom -->
	<link href="includes/style.min.css" rel="stylesheet">
	<script src="includes/scripts.min.js"></script>

	<!-- Theme File Import -->
	<link href="includes/themes/<? echo $theme; ?>.css" rel="stylesheet">

</head>
<body class="body <? echo $theme; ?>">
<h1 class="invisible">
	<?=$company?>
</h1>
