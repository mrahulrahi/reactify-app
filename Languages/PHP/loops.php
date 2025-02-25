<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<h2>Loops</h2>

<h3>For Loop</h3>

<?php

for ($x = 0; $x <= 10; $x++) {
  echo "The number is: $x <br>";
}

?>

<h3>Foreach Loop</h3>

<?php

$colors = array("red", "green", "blue", "yellow");

foreach ($colors as $value) {
  echo "$value <br>";
}

?>

<h3>While Loop</h3>

<?php

$x = 1;

while($x <= 5) {
  echo "The number is: $x <br>";
  $x++;
}

?>

<h3>Do...while Loop</h3>

<?php

$x = 1;

do {
  echo "The number is: $x <br>";
  $x++;
} while ($x <= 5);

?>

<h3>PHP Break</h3>

<?php

for ($x = 0; $x < 10; $x++) {
  if ($x == 4) {
    break;
  }
  echo "The number is: $x <br>";
}

?>

<h3>PHP Continue</h3>

<?php

for ($x = 0; $x < 10; $x++) {
  if ($x == 4) {
    continue;
  }
  echo "The number is: $x <br>";
}

?>

<h2>PHP Functions</h2>

<?php

function familyName($fname, $year) {
  echo "$fname Refsnes. Born in $year <br>";
}

familyName("Hege", "1975");
familyName("Stale", "1978");
familyName("Kai Jim", "1983");

?>

<h2>PHP Superglobals</h2>

<h3>PHP $GLOBALS</h3>

<?php

$x = 75;
$y = 25;
 
function addition() {
  $GLOBALS['z'] = $GLOBALS['x'] + $GLOBALS['y'];
}
 
addition();
echo $z;

?>

<h3>PHP $_GET</h3>

<?php

echo "Study " . $_GET['subject'] . " at " . $_GET['web'];

?>

<h3>PHP $_POST</h3>

<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
  Name: <input type="text" name="fname">
  <input type="submit">
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // collect value of input field
  $name = $_POST['fname'];
  if (empty($name)) {
    echo "Name is empty";
  } else {
    echo $name;
  }
}
?>

<h3>PHP $_SERVER</h3>

<?php
echo $_SERVER['PHP_SELF'];
echo "<br>";
echo $_SERVER['SERVER_NAME'];
echo "<br>";
echo $_SERVER['HTTP_HOST'];
echo "<br>";
echo $_SERVER['HTTP_REFERER'];
echo "<br>";
echo $_SERVER['HTTP_USER_AGENT'];
echo "<br>";
echo $_SERVER['SCRIPT_NAME'];
?>

<h3>PHP $_REQUEST</h3>

<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
  Name: <input type="text" name="fname">
  <input type="submit">
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // collect value of input field
  $name = $_REQUEST['fname'];
  if (empty($name)) {
    echo "Name is empty";
  } else {
    echo $name;
  }
}
?>


</body>
</html>