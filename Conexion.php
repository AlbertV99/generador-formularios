<?php
/*conexion V2
    VERSION DEL MODULO DE CONEXION IMPLEMENTANDO LOS MISMOS METODOS PERO DE UNA MANERA MAS ORDENADA, APLICANDO:
        DICCIONARIOS PARA RECIBIR LOS CAMPOS Y DATOS
        PDO
*/
class Conexion {
    const HOST = "mysql:host=localhost;dbname=matalon";
    const USER = "root";
    const PASS = "";
    //const TBL_LOG = "log";
    public $conexion;

    public function __construct($BD){
        $this->BD = $BD;
        $this->conectar();
    }
    /**
     * Funcion para establecer conexion a la base de datos
     * @return [type] [description]
     */
    public function conectar(){
        try {
            $this->conexion= new PDO(self::HOST.";dbname=".$this->BD,self::USER,self::PASS);
            $this->conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            print "ERROR EN CONEXION ->".$e->getMessage()."</br>";
            die();
        }finally{
            //echo "conectado";
        }
    }
    /**
     * Funcion para realizar cualquier tipo de consulta a la base de datos utilizando el prepare()->execute();
     * @param  string $query [description]
     * @param  array  $datos array de datos a ser reemplazados en el statement(OBS: pasar en el orden que deben ser utilizados en el query)
     * @return mixed        valor a retornar
     */
    public function consultar($query,$datos){
        $temp=$this->conexion->prepare($query);
        // var_dump( $datos);
        try {

            $res = $temp->execute($datos);
            // echo $res->errorCode() . "test";
            if($res==TRUE){
                //echo $temp->fetchAll();
                return $temp;
            }else{
                return $res;

            }
        } catch (PDOException $e) {
            // print("error ");
            // $temp->debugDumpParams();
            throw $e;

        }finally{
            //echo $res ." - ";

        }
    }
}
















?>
