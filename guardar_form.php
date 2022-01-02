<?php
//DIRECCION DONDE SE GUARDARAN LOS FORMULARIOS CREADOS CON EL creadorFormulario.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once("Conexion.php");
 $datos = json_decode(file_get_contents("php://input"));
//$datos = json_decode(jsonPrueba());

$conexion = new Conexion($datos->bd);

insertarDetalle($datos->datos->campos , insertarCabecera($datos->datos));


function insertarCabecera($datosCabecera){
    global $conexion;
    $query = "INSERT INTO formulario (titulo,tabla_guardar,direccion_guardar) VALUES (?,?,?)";

    $conexion->consultar($query,[$datosCabecera->titulo,$datosCabecera->tabla_guardar,$datosCabecera->direccion_guardar]);

    $temp =$conexion->consultar("SELECT id FROM formulario ORDER BY id DESC limit 1",[]);
    $temp = $temp->fetchAll(PDO::FETCH_ASSOC);
    return $temp[0]['id'];

}

function insertarDetalle($campos,$idFormulario){
    global $conexion;
    $temp="";
    $vec_enviar = [];
    $verificador="";
    $query = "INSERT INTO campos_formulario (
        id_formulario,
        id_tipo_campo,
        nombre_campo,
        nombre_campo_tabla,
        placeholder,
        titulo,
        clase_css,
        tipo_lista_valores,
        lista_valores,
        validacion_vacio,
        menor_valor,
        mayor_valor) VALUES ";

    foreach ($campos as $key => $value) {
        $temp.="(?,?,?,?,?,?,?,?,?,?,?,?),";
        array_push($vec_enviar,$idFormulario);
        array_push($vec_enviar,tipo_campo($value->tipo_campo));
        array_push($vec_enviar,valorDefectoVacio($value,"nombre_campo"));
        array_push($vec_enviar,valorDefectoVacio($value,"nombre_campo_tabla"));
        array_push($vec_enviar,valorDefectoVacio($value,"placeholder"));
        array_push($vec_enviar,valorDefectoVacio($value,"titulo"));
        array_push($vec_enviar,valorDefectoVacio($value,"clase_css"));
        array_push($vec_enviar,valorDefectoNull($value,"tipo_lista_valores"));
        array_push($vec_enviar,"'".valorDefectoVector($value,"lista_valores")."'");
        array_push($vec_enviar,valorDefectoVacio($value,"validacion"));
        array_push($vec_enviar,valorDefectoVacio($value,"menor_valor"));
        array_push($vec_enviar,valorDefectoVacio($value,"mayor_valor"));

    }
    // echo $query." ".$verificador;
    $temp = substr($temp,0,strlen($temp)-1);
    try {
        $conexion->consultar($query." ".$temp,$vec_enviar);
        echo '{"msg":"Correcto"}';

    } catch (\Exception $e) {
        echo '{"msg":"Error:'.$e->getMessage().'"}';
    }



}

function tipo_campo($tipo_campo){
    global $conexion;
    $query= "SELECT id FROM tipo_campo WHERE UPPER(tipo) =? ";
    $temp = $conexion->consultar($query,[strtoupper($tipo_campo)] );
    $temp = $temp->fetchAll(PDO::FETCH_ASSOC);
    return $temp[0]['id'];
}

function valorDefectoNull($obj,$prop){
    return (property_exists($obj,$prop))?$obj->$prop : null;
}
function valorDefectoVacio($obj,$prop){
    return (property_exists($obj,$prop))?$obj->$prop : "";
}
function valorDefectoVector($obj,$prop){
    return (property_exists($obj,$prop) )?json_encode($obj->$prop):"";
}


function jsonPrueba(){
    $formulario =[
        "id"=>"1",
        "titulo"=>"Prueba Formulario",
        "tabla_guardar"=>"prueba_tabla",
        "direccion_guardar"=>"guardar_form_generado.php",
        "campos"=>[
            [
                "id"=>"1",
                "id_formulario"=>"1",
                "tipo_campo"=>"texto",
                "nombre_campo"=>"campo1",
                "nombre_campo_tabla"=>"campo_tabla1",
                "placeholder"=>"Ingrese campo1",
                "titulo"=>"Titulo 1",
                "clase"=>"",
                "validacion"=>"s",
                "menor_rango"=>"",
                "mayor_rango"=>"",
                "tipo_lista_valores" =>"",
                "lista_valores"=>""
            ],
            [
                "id"=>"2",
                "id_formulario"=>"1",
                "tipo_campo"=>"numerico",
                "nombre_campo"=>"campo2",
                "nombre_campo_tabla"=>"campo_tabla2",
                "placeholder"=>"Ingrese campo2",
                "titulo"=>"prueba campo2",
                "clase"=>"",
                "validacion"=>"N",
                "menor_rango"=>"",
                "mayor_rango"=>"25",
                "tipo_lista_valores" =>"",//FIJO O DINAMICO
                "lista_valores"=>"",

            ],
            [
                "id"=>"3",
                "id_formulario"=>"1",
                "tipo_campo"=>"lista",
                "nombre_campo"=>"campo3",
                "nombre_campo_tabla"=>"campo_tabla3",
                "placeholder"=>"Ingrese campo3",
                "titulo"=>"prueba campo2",
                "clase"=>"",
                "validacion"=>"S",
                "menor_rango"=>"",
                "mayor_rango"=>"",
                "tipo_lista_valores" =>"",//FIJO O DINAMICO
                "lista_valores"=>[["1" =>"Promer valor","2"=>"Segundo Valor","3"=>"Tercer Valor"]],

            ],
            [
                "id"=>"4",
                "id_formulario"=>"1",
                "tipo_campo"=>"buscador",
                "nombre_campo"=>"campo4",
                "nombre_campo_tabla"=>"campo_tabla4",
                "placeholder"=>"Ingrese campo4",
                "titulo"=>"prueba campo4",
                "clase"=>"",
                "validacion"=>"S",
                "menor_rango"=>"",
                "mayor_rango"=>"",
                "tipo_lista_valores" =>"",//FIJO O DINAMICO
                "lista_valores"=>[["1" =>"Primer valor","2"=>"Segundo Valor","3"=>"Tercer Valor"]],

            ],
            [
                "id"=>"5",
                "id_formulario"=>"1",
                "tipo_campo"=>"fecha",
                "nombre_campo"=>"campo5",
                "nombre_campo_tabla"=>"campo_tabla5",
                "placeholder"=>"Ingrese campo5",
                "titulo"=>"prueba campo5",
                "clase"=>"",
                "validacion"=>"N",
                "menor_rango"=>"2020-11-09",
                "mayor_rango"=>"2022-01-02",
                "tipo_lista_valores" =>"",//FIJO O DINAMICO
                "lista_valores"=>"",

            ]
        ]
    ];
    return json_encode(["datos"=>$formulario,"bd"=>"testFormularios"] );
}



?>
