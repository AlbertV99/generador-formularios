<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$campos = json_decode(file_get_contents("php://input"));
$columnas = obtener_columnas($campos->campos);
$valores = obtener_valores($campos->campos);
$query = "INSERT INTO ".$campos->tabla." ".implode(',',$columnas)." VALUES (".generar_interrogaciones(count($valores)).")";
//prepare Statement
//ejecucion del statement

echo $query;
function obtener_columnas($datos){
    $columnas =[];
    foreach ($datos as $indice => $valor) {
        array_push($columnas,$indice);
    }
    return $columnas;
}
function obtener_valores($datos){
    $valores =[];
    foreach ($datos as $indice => $valor) {
        array_push($valores,$valor);
    }
    return $valores;
}
function generar_interrogaciones($cant){
    $res ="";
    for ($i=0; $i < $cant ; $i++) {
        $res.="?,";
    }
    return substr($res,0,-1);
}



?>
