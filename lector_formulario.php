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
                "nombre_campo_tabla"=>"campo_tabla1",
                "placeholder"=>"Ingrese campo1",
                "titulo"=>"Titulo 1",
                "clase"=>"",
                "validacion"=>"1",
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
                "validacion"=>"0",
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
                "validacion"=>"1",
                "menor_rango"=>"",
                "mayor_rango"=>"",
                "tipo_lista_valores" =>"",//FIJO O DINAMICO
                "lista_valores"=>[["1" =>"Promer valor","2"=>"Segundo Valor","3"=>"Tercer Valor"]],

            ]
        ]
    ];
    return $formulario;
}







?>
