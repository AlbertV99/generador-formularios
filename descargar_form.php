<?php
header('Content-disposition: attachment; filename=formulario_generado.html');
header('Content-type: text/html');

echo $_POST['datos'];

?>
