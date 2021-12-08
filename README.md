# Generador de Formularios
Proyecto donde se podrá generar un formulario y el código necesario para poder guardar los datos enviados por este

## Formato de envio de datos  JSON

{
    "id":"1",
    "titulo":"Prueba Formulario",
    "tabla_guardar":"prueba_tabla",
    "direccion_guardar":"guardar_form_generado.php",
    "campos":[
        {
            "id":"1",
            "id_formulario":"1",
            "tipo_campo":"texto",
            "nombre_campo":"campo1",
            "nombre_campo_tabla":"campo_tabla1",
            "placeholder":"Ingrese campo1",
            "titulo":"Titulo 1",
            "clase":"",
            "validacion":"1",
            "menor_rango":"",
            "mayor_rango":"",
            "tipo_lista_valores" :"",
            "lista_valores":""
        },
        {
            "id":"2",
            "id_formulario":"1",
            "tipo_campo":"numerico",
            "nombre_campo":"campo2",
            "nombre_campo_tabla":"campo_tabla2",
            "placeholder":"Ingrese campo2",
            "titulo":"prueba campo2",
            "clase":"",
            "validacion":"0",
            "menor_rango":"",
            "mayor_rango":"25",
            "tipo_lista_valores" :"",//FIJO O DINAMICO
            "lista_valores":"",

        },
        {
            "id":"3",
            "id_formulario":"1",
            "tipo_campo":"lista",
            "nombre_campo":"campo3",
            "nombre_campo_tabla":"campo_tabla3",
            "placeholder":"Ingrese campo3",
            "titulo":"prueba campo2",
            "clase":"",
            "validacion":"1",
            "menor_rango":"",
            "mayor_rango":"",
            "tipo_lista_valores" :"",//FIJO O DINAMICO
            "lista_valores":[{"1" :"Promer valor","2":"Segundo Valor","3":"Tercer Valor"}],

        }
    ]
}

## Clases utilizables
* Formulario
    En este se define donde se instanciaran los campos y parametros generales para el funcionamiento del formulario.

* Campo
    Clase diferida, plantilla basica para la creacion de los demas campos.

* CampoTexto
    Clase encargada de crear un input de tipo Text y un label que corresponde a el titulo para el campo. Con la posibilidad de validar si puede estar o no vacio a la hora de enviar el formulario.

* CampoNumerico
    Clase encargada de crear un input de tipo number y un label que corresponde a el titulo para el campo. Con la posibilidad de validar si puede estar vacio , o el rango de valores permitido en ese campo.
* CampoListaDesplegable
    Clase encargada de crear un campo tipo select con sus respectivas opciones pasadas por parametro asi como el titulo correspondiente al campo.
    
