<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<h2>First Lines</h2>

<?php

echo "hello world! My first php script"."<br>";
echo 15 ."<br>";

?>

<h2>Variables</h2>

<?php 

$myName ="Rahi";
echo $myName ."<br>";

$num1 = 6;
$num2 = 4;
$result = $num1+$num2;
echo $result ."<br>";

?>

<h2>Variables Scope</h2>
<h3>Global & Local Variables</h3>

<?php 

$global = "I am a global variable";
$local = "I am actually golbal";
function printTxt(){

    $local = "I am a local variable";

    GLOBAL $global;
     echo $global ."<br>";
     echo $local ."<br>";
 }

 printTxt()

?>

<h3>Static Variable</h3>

<?php

 function trackNumber(){
     STATIC $number = 0;
     $number++;
     echo $number ."<br>";
 }

 trackNumber();
 trackNumber();
 trackNumber();
 trackNumber();
 trackNumber();
 trackNumber();

?>

<h2>Data Types</h2>

<h3>String</h3>

<?php 

$x = "Hello world!";

echo $x;
echo "<br>";
var_dump($x);

?>

<h3>Integer</h3>

<?php

$x = 5985;

echo $x;
echo "<br>";
var_dump($x);

?>

<h3>Float</h3>

<?php

$x = 10.365;

echo $x;
echo "<br>";
var_dump($x);

?>

<h3>Boolean</h3>

<?php

$x = true;
$y = false;

echo $x;
echo $y;
echo "<br>";
var_dump($x);
var_dump($y);

?>

<h3>Array</h3>

<?php

$cars = array("Volvo","BMW","Toyota");
var_dump($cars);

?>

<h2>Conditional Statements</h2>

<h3>If Statement</h3>

<?php

$t = date("H");

if ($t < "20") {
  echo "Have a good day!";
}

?>

<h3>If...else Statement</h3>

<?php

$t = date("H");

if ($t < "20") {
  echo "Have a good day!";
} else {
  echo "Have a good night!";
}

?>

<h3>If...elseif...else Statement</h3>

<?php

$t = date("H");

if ($t < "10") {
  echo "Have a good morning!";
} elseif ($t < "20") {
  echo "Have a good day!";
} else {
  echo "Have a good night!";
}

?>

<h3>Switch Statement</h3>

<?php

$favcolor = "red";

switch ($favcolor) {
  case "red":
    echo "Your favorite color is red!";
    break;
  case "blue":
    echo "Your favorite color is blue!";
    break;
  case "green":
    echo "Your favorite color is green!";
    break;
  default:
    echo "Your favorite color is neither red, blue, nor green!";
}

?>


    
</body>
</html>
