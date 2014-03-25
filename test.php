<?php
/*
$hours = '05:30';
print_r(explode(':', $hours));
*/
function __autoload($classname) {
    $filename = $classname .".class.php";
    include_once($filename);
}
print_r($_SERVER, true);

echo conf::getProtected('REMOTE_IP');