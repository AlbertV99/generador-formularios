
class Formulario{
    constructor(zonaFormulario){
        this.zonaFormulario=zonaFormulario;
        this.titulo;
        this.direccionGuardar;
        this.tablaGuardar;
        this.campos;
        this.botonGuardar;
        this.botonRestablecer;
        this.botonVolver;

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
        this.botonGuardar=new Boton("guardar","Guardar",()=>this.enviarForm(this));
        this.botonRestablecer=new Boton("restablecer","Restablecer",this.restablecerForm);
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
        this.botonGuardar.generar();
        this.botonRestablecer.generar();
        this.zonaFormulario.appendChild(this.botonGuardar.puntero);
        this.zonaFormulario.appendChild(this.botonRestablecer.puntero);
    }
    crearCampos(campos){
        var camposRespuesta = [];
        campos.forEach((item, i) => {
            switch (item.tipo_campo) {
                case "texto":
                    camposRespuesta.push(new CampoTexto(item.nombre_campo,item.titulo,item.nombre_campo_tabla,item.clase,item.placeholder,item.validacion))
                    break;
                case "numerico":
                    camposRespuesta.push(new CampoNumerico(item.nombre_campo,item.titulo,item.nombre_campo_tabla,item.clase,item.placeholder,item.validacion,item.menor_rango,item.mayor_rango))
                    break;
                case "moneda":
                    camposRespuesta.push(new CampoMoneda())
                    break;
                case "lista":
                    camposRespuesta.push(new CampoListaDesplegable(item.nombre_campo,item.titulo,item.nombre_campo_tabla,item.clase,item.placeholder,item.validacion,item.lista_valores))
                    break;
                default:
                    console.log("error de campo"+ item.tipo_campo)

            }
        });
        return camposRespuesta
    }
    obtenerDatosEnviar(t=this){
        let temp = {};
        t.campos.forEach((campo, i) => {
            if(campo.validar()){
                console.log(campo.campoTabla);
                temp[campo.campoTabla]=campo.obtenerValor();
            }else{
                throw "Debe completar todos los campos obligatorios correctamente [campo"+campo.titulo+"]";
            }
        });
        return temp;

    }
    enviarForm(t){
        let datos;
        try {
            datos = t.obtenerDatosEnviar(t);

        } catch (e) {
            t.mensaje(e)
            return
        }
        fetch(t.direccionGuardar, {
               method: 'POST',
               redirect: 'follow', // manual, *follow, error
               referrerPolicy: 'no-referrer',
               body: JSON.stringify({"tabla":t.tablaGuardar,"campos":datos}) // body data type must match "Content-Type" header
           }
       ).then(crudo=> crudo.text() )
        .then(data=> console.log(data))
        .catch(error=>this.mensaje("Ocurrio un error al cargar el formulario"));
    }
    mensaje(msg){
        console.error(msg)
    }
    restablecerForm(){
        console.log("restablecerFormulario");

    }

}

class Campo{
    constructor(id,titulo,campoTabla,clase,placeHolder,validacion){
        this.id=id;
        this.clase=clase;
        this.titulo=titulo;
        this.placeHolder=placeHolder;
        this.campoTabla=campoTabla;
        this.nombreCampo=id;
        this.validacionVacio=(validacion==1);
        this.puntero=null;

    }
    generar(){
        return 0;
    }
    obtenerValor(){
        return this.puntero.value;
    }
}

class CampoTexto extends Campo{
    constructor(id,titulo,campoTabla,clase="",placeHolder="",validacion="0"){
        super(id,titulo,campoTabla,clase,placeHolder,validacion);
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
    constructor(id,titulo,campoTabla,clase="",placeHolder="",validacion="0",validacionMenor,validacionMayor){
        super(id,titulo,campoTabla,clase,placeHolder,validacion);
        this.generar();
        this.validacionMenor=(validacionMenor)?validacionMenor:null;
        this.validacionMayor=(validacionMayor)?validacionMayor:null;
    }
    validar(){
        return ((this.validacionVacio || this.puntero.value.trim().length!=0) && (this.validarMaximo() && this.validarMinimo()));
    }
    validarMaximo(){
        console.log(this.puntero.value +"<="+this.validacionMayor);
        return (this.validacionMayor == null ||  parseInt(this.puntero.value)<=parseInt(this.validacionMayor) );
    }
    validarMinimo(){
        console.log(this.puntero.value +">="+this.validacionMenor);
        return (this.validacionMenor == null ||  parseInt(this.puntero.value)>=parseInt(this.validacionMenor) );
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
//https://codepen.io/559wade/pen/LRzEjj
    constructor(id,titulo,campoTabla,clase="",placeHolder="",validacion="0"){
        super(id,titulo,campoTabla,clase,placeHolder,validacion);
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
        console.log("generando campo moneda");
        this.puntero=document.createElement("input");
        this.puntero.type="text";
        this.puntero.placeholder=this.placeHolder;
        this.puntero.className = this.clase;
        this.puntero.id = this.id;
        this.puntero.name = this.id;
        // this.puntero.onKeyUp = this.
    }
    obtenerValor(){
        return (this.puntero.value.replace(/\./gi,""));
    }

}

class CampoListaDesplegable extends Campo{
    constructor(id,titulo,campoTabla,clase="",placeHolder="",validacion="0",listaValores=[]){
        super(id,titulo,campoTabla,clase,placeHolder,validacion);
        this.listaValores = listaValores
        this.generar();
    }
    validar(){
        return (this.validacionVacio || this.puntero.value.trim().length!=0);
    }
    generar(){
        let temp = "";
        console.log("generando campo lista desplegable");
        this.puntero=document.createElement("select");
        this.puntero.className = this.clase;
        this.puntero.id = this.id;
        this.puntero.name = this.id;
        this.listaValores.forEach((item, i) => {
            for (var indice in item) {
                temp+="<option value='"+indice+"'>"+item[indice]+"</option>";
            }
        });
        this.puntero.innerHTML = temp;
    }
    
}

class CampoBuscador extends Campo{

}

class Boton {
    constructor(id,titulo,accionClick){
        this.id = id;
        this.titulo = titulo;
        this.accionClick = accionClick;
        this.puntero = null;

    }
    generar(){
        console.log("Construyendo boton");
        this.puntero = document.createElement("input");
        this.puntero.type="button";
        this.puntero.value = this.titulo;
        this.puntero.addEventListener("click",this.accionClick);

    }
}


//
// class CampoFecha(){
//
//
// }
