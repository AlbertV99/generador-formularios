<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$campos = json_decode(file_get_contents("php://input"));
print_r($campos);



?>
