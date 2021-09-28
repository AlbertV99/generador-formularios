
class Formulario{
    constructor(zonaFormulario){
        this.zonaFormulario=zonaFormulario;
        this.titulo;
        this.direccionGuardar;
        this.tablaGuardar;
        this.campos;

    }
    obtenerFormulario(){
        fetch("lector_formulario.php")
        .then(crudo=> crudo.json() )
        .then(data=> this.generarFormulario(data))
        .catch(error=>this.mensaje(error))

    }
    generarFormulario(datos){
        console.log(datos)
        this.titulo = datos.titulo;
        this.direccionGuardar = datos.direccion_guardar;
        this.tablaGuardar = datos.tabla_guardar;
        this.campos = this.crearCampos(datos.campos);
        var temp =  document.createElement("H2")
        temp.innerHTML = this.titulo;
        this.zonaFormulario.appendChild(temp);
        this.campos.forEach((item, i) => {
            var temp =document.createElement("label");
            temp.innerHTML = item.titulo ;
            this.zonaFormulario.appendChild(temp)
            this.zonaFormulario.appendChild(item.puntero);
            this.zonaFormulario.appendChild(document.createElement("br"))
        });



    }
    crearCampos(campos){
        var camposRespuesta = [];
        campos.forEach((item, i) => {
            switch (item.tipo_campo) {
                case "texto":
                    camposRespuesta.push(new CampoTexto(item.nombre_campo,item.titulo,item.clase,item.placeholder,item.validacion))
                    break;
                case "numerico":
                    camposRespuesta.push(new CampoNumerico(item.nombre_campo,item.titulo,item.clase,item.placeholder,item.validacion,item.memenor_rango,item.mayor_rango))
                    break;
                case "moneda":
                    camposRespuesta.push(new CampoMoneda())
                    break;
                default:
                    console.log("error de campo"+ item.tipo_campo)

            }
        });
        return camposRespuesta
    }
    obtenerDatosEnviar(){
        return ["test"];
    }
    enviarForm(){
        fetch(this.direccionGuardar,{"tabla":this.tablaGuardar,"campos":this.obtenerDatosEnviar()})
        .then(crudo=> crudo.json() )
        .then(data=> this.generarFormulario(data))
        .catch(error=>this.mensaje("Ocurrio un error al cargar el formulario"));
    }
    // validarCampos(){
    //
    // }
    mensaje(msg){
        console.error(msg)
    }

}

class Campo{
    constructor(id,titulo,clase,placeHolder,validacion){
        this.id=id;
        this.clase=clase;
        this.titulo=titulo;
        this.placeHolder=placeHolder;
        this.nombreCampo=id;
        this.validacionVacio=(validacion==1);
        this.puntero=null;

    }
    generar(){
        return 0;
    }

}

class CampoTexto extends Campo{
    constructor(id,titulo,clase="",placeHolder="",validacion="0"){
        super(id,titulo,clase,placeHolder,validacion);
        this.generar();

    }
    validar(){
        return (this.validacionVacio || this.puntero.value.trim().length!=0);
    }
    generar(){
        console.log("generando campo Texto");
        this.puntero=document.createElement("input");
        this.puntero.type="text";
        this.puntero.placeholder=this.placeHolder;
        this.puntero.className = this.clase;
        this.puntero.id = this.id;
        this.puntero.name = this.id;

    }
}

class CampoNumerico extends Campo{
    constructor(id,titulo,clase="",placeHolder="",validacion="0",validacionMenor,validacionMayor){
        super(id,titulo,clase,placeHolder,validacion);
        this.generar();
        this.validacionMenor=(validacionMenor)?validacionMenor:null;
        this.validacionMayor=(validacionMayor)?validacionMayor:null;
    }
    validar(){
        return ((this.validacionVacio || this.puntero.value.trim().length!=0) && (validarMaximo() && validarMinimo()));
    }
    validarMaximo(){
        return (this.validacionMayor == null ||  this.puntero.value<=this.validacionMayor );
    }
    validarMinimo(){
        return (this.validacionMayor == null ||  this.puntero.value>=this.validacionMenor );
    }
    generar(){
        console.log("generando campo Texto");
        this.puntero=document.createElement("input");
        this.puntero.type="number";
        this.puntero.placeholder=this.placeHolder;
        this.puntero.className = this.clase;
        this.puntero.id = this.id;
        this.puntero.name = this.id;
    }
}

class CampoMoneda extends Campo{

    constructor(id,titulo,clase="",placeHolder="",validacion="0"){
        super(id,titulo,clase,placeHolder,validacion);
        this.generar();
    }
    validar(){
        return ((this.validacionVacio || this.puntero.value.trim().length!=0) && (validarMaximo() && validarMinimo()));
    }
    validarMaximo(){
        return (this.validacionMayor == null ||  this.puntero.value<=this.validacionMayor );
    }
    validarMinimo(){
        return (this.validacionMayor == null ||  this.puntero.value>=this.validacionMenor );
    }
    generar(){
        console.log("generando campo Texto");
        this.puntero=document.createElement("input");
        this.puntero.type="text";
        this.puntero.placeholder=this.placeHolder;
        this.puntero.className = this.clase;
        this.puntero.id = this.id;
        this.puntero.name = this.id;
        // this.puntero.onKeyUp = this.
    }

}



//
// class CampoFecha(){
//
//
// }
