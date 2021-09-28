<?php

$formulario_id = '1';

$formulario = obtener_formulario($formulario_id);


echo json_encode($formulario);

function obtener_formulario($id){

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
                    "placeholder"=>"Ingrese campo1",
                    "titulo"=>"prueba campo",
                    "clase"=>"",
                    "validacion"=>"1",
                    "menor_rango"=>"",
                    "mayor_rango"=>""
                ],
                [
                    "id"=>"2",
                    "id_formulario"=>"1",
                    "tipo_campo"=>"numerico",
                    "nombre_campo"=>"campo2",
                    "placeholder"=>"Ingrese campo2",
                    "titulo"=>"prueba campo2",
                    "clase"=>"",
                    "validacion"=>"0",
                    "menor_rango"=>"",
                    "mayor_rango"=>""
                ]
        ]
    ];
    return $formulario;


}







?>
