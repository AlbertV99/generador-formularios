<!DOCTYPE html>
<html lang="es" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>

    </body>
    <script src="clases.js" charset="utf-8"></script>
    <script type="text/javascript">
        window.onload = ()=> main();
        let form;

        async function main(){
            var form = new Formulario(document.body,"lector_formulario.php");
            await form.obtenerFormulario();
            form.generarFormulario()


        }





    </script>



</html>
