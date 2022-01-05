//TIPOS DE FORMULARIOS

//FORMULARIOS PRODUCCION
class Formulario{
    constructor(zonaFormulario,direccionFetch,idForm=""){
        this.idForm=idForm;
        this.direccionFetch = direccionFetch;
        this.zonaFormulario=zonaFormulario;
        this.titulo;
        this.direccionGuardar;
        this.tablaGuardar;
        this.campos;
        this.botonGuardar;
        this.botonRestablecer;
        this.botonVolver;
        this.datos={};

    }
    async obtenerFormulario(){
        // fetch("lector_formulario.php")
        // .then(crudo=> crudo.json() )
        // .then(data=> this.datos=data)
        // .catch(error=>this.mensaje(error))
        let temp = await fetch(this.direccionFetch)
        this.datos = await temp.json()


    }
    configuracionesBasicas(){
        this.titulo = this.datos.titulo;
        this.direccionGuardar = this.datos.direccion_guardar;
        this.tablaGuardar = this.datos.tabla_guardar;
        this.campos = this.crearCampos(this.datos.campos);

    }
    crearTitulo(){
        var temp =  document.createElement("H2")
        temp.innerHTML = this.titulo;
        this.zonaFormulario.appendChild(temp);
    }
    generarFormulario(){
        console.log(this.datos)
        this.campos = this.crearCampos(this.datos.campos);
        this.configuracionesBasicas()
        this.crearTitulo()
        this.botonGuardar=new Boton("guardar","Guardar","",()=>this.enviarForm(this));
        this.botonRestablecer=new Boton("restablecer","Restablecer","",this.restablecerForm);
        this.campos.forEach((item, i) => {
            this.crearContenedorCampo(item)
        });
        this.botonGuardar.generar();
        this.botonRestablecer.generar();
        this.zonaFormulario.appendChild(this.botonGuardar.puntero);
        this.zonaFormulario.appendChild(this.botonRestablecer.puntero);
    }
    crearContenedorCampo(datos){
        this.zonaFormulario.appendChild(this.crearTituloCampo(datos))
        this.zonaFormulario.appendChild(datos.puntero);
        if(datos.constructor.name=='CampoBuscador')
            this.zonaFormulario.appendChild(datos.datalist)
        this.zonaFormulario.appendChild(document.createElement("br"))


    }
    crearTituloCampo(datos){
        var temp =document.createElement("label");
        temp.innerHTML = datos.titulo ;
        return temp
    }
    crearCampos(campos){
        if(typeof campos =="undefined")
            throw "No existen campos a crear"
        var camposRespuesta = [];
        campos.forEach((item, i) => {
            switch (item.tipo_campo) {
                case "texto":
                    camposRespuesta.push(new CampoTexto(item.nombre_campo,item.titulo,item.nombre_campo_tabla,item.clase,item.placeholder,item.validacion))
                    break;
                case "numerico":
                    camposRespuesta.push(new CampoNumerico(item.nombre_campo,item.titulo,item.nombre_campo_tabla,item.clase,item.placeholder,item.validacion,item.menor_rango,item.mayor_rango))
                    break;
                case "fecha":
                    camposRespuesta.push(new CampoFecha(item.nombre_campo,item.titulo,item.nombre_campo_tabla,item.clase,item.placeholder,item.validacion,item.menor_rango,item.mayor_rango))
                    break;
                // case "moneda":
                //     camposRespuesta.push(new CampoMoneda())
                //     break;
                case "lista":
                    camposRespuesta.push(new CampoListaDesplegable(item.nombre_campo,item.titulo,item.nombre_campo_tabla,item.clase,item.placeholder,item.validacion,item.lista_valores))
                    break;
                case "buscador":
                    camposRespuesta.push(new CampoBuscador(item.nombre_campo,item.titulo,item.nombre_campo_tabla,item.clase,item.placeholder,item.validacion,item.lista_valores))
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
    destruirFormulario(){
        this.zonaFormulario.innerHTML=""
    }

}

class FormularioBootstrap extends Formulario{
    constructor(zonaFormulario,direccionFetch,idForm=""){
        super(zonaFormulario,direccionFetch,idForm);
    }

    generarFormulario(){
        console.log(this.datos)
        this.campos = this.crearCampos(this.datos.campos);
        this.configuracionesBasicas()
        this.crearTitulo()
        this.botonGuardar=new Boton("guardar","Guardar","",()=>this.enviarForm(this));
        this.botonRestablecer=new Boton("restablecer","Restablecer","",this.restablecerForm);
        this.campos.forEach((item, i) => {
            this.crearContenedorCampo(item)
        });
        this.botonGuardar.generar();
        this.botonRestablecer.generar();
        this.zonaFormulario.appendChild(this.botonGuardar.puntero);
        this.zonaFormulario.appendChild(this.botonRestablecer.puntero);
    }
    crearContenedorCampo(datos){
        let contenedor = document.createElement("div");
        contenedor.class = "form-group"
        contenedor.appendChild(this.crearTituloCampo(datos))
        contenedor.appendChild(datos.puntero);
        if(datos.constructor.name=='CampoBuscador')
            contenedor.appendChild(datos.datalist)
        this.zonaFormulario.appendChild(contenedor)


    }
    crearTituloCampo(datos){
        var temp =document.createElement("label");
        temp.innerHTML = datos.titulo ;
        return temp
    }

}

//CREACION DE FORMULARIOS
class FormularioDesarrollo extends Formulario{
    constructor(zonaFormulario,direccionFetch){
        super(zonaFormulario,direccionFetch);
        this.direccionGuardarForm = "guardar_form.php"
    }
    generarFormulario(){
        console.log(this.datos)
        this.campos = this.crearCampos(this.datos.campos);
        this.configuracionesBasicas()
        this.crearTitulo()
        this.botonGuardar=new Boton("guardar","Guardar","",()=>this.enviarForm(this));
        this.botonRestablecer=new Boton("restablecer","Restablecer","",this.restablecerForm);
        this.campos.forEach((item, i) => {
            this.crearContenedorCampo(item,i)
        });
        this.botonGuardar.generar();
        this.botonRestablecer.generar();
        this.zonaFormulario.appendChild(this.botonGuardar.puntero);
        this.zonaFormulario.appendChild(this.botonRestablecer.puntero);
    }
    crearContenedorCampo(datos){
        this.zonaFormulario.appendChild(this.crearTituloCampo(datos))
        this.zonaFormulario.appendChild(datos.puntero);
        if(datos.constructor.name=='CampoBuscador')
            this.zonaFormulario.appendChild(datos.datalist)
        this.zonaFormulario.appendChild(document.createElement("br"))


    }
    enviarForm(t){
        alert("Prueba de guardado de datos");
    }

    eliminarCampo(posicion){
        this.datos.campos.splice(posicion,1)
        this.destruirFormulario()
        this.generarFormulario()
    }

    guardar(bd){
        fetch(this.direccionGuardarForm, {
               method: 'POST',
               redirect: 'follow', // manual, *follow, error
               referrerPolicy: 'no-referrer',
               body: JSON.stringify({"datos":form.datos,"bd":bd}) // body data type must match "Content-Type" header
           }
       ).then(crudo=> crudo.json() )
        .then(data=> {
            if(data.msg.includes("Error")){
                throw data
            }else{
                console.log(data)
            }
        })
        .catch(error=> console.error(error));
    }

}

class FormularioBootstrap1Desarrollo extends FormularioBootstrap{
    constructor(zonaFormulario,direccionFetch){
        super(zonaFormulario,direccionFetch);
        this.direccionGuardarForm = "guardar_form.php"
    }
    generarFormulario(){
        console.log(this.datos)
        this.campos = this.crearCampos(this.datos.campos);
        this.configuracionesBasicas()
        this.crearTitulo()
        this.botonGuardar=new Boton("guardar","Guardar","",()=>this.enviarForm(this));
        this.botonRestablecer=new Boton("restablecer","Restablecer","",this.restablecerForm);
        this.campos.forEach((item, i) => {
            this.crearContenedorCampo(item,i)
        });
        this.botonGuardar.generar();
        this.botonRestablecer.generar();
        this.zonaFormulario.appendChild(this.botonGuardar.puntero);
        this.zonaFormulario.appendChild(this.botonRestablecer.puntero);
    }

    crearContenedorCampo(datos,pos){
        /*clase css especifica para este modelo*/
        datos.puntero.className =" form-control "+ datos.puntero.className
        let temEtiqueta = this.crearTituloCampo(datos)
        temEtiqueta.className =+" form-label"

        let contenedor = document.createElement("div");
        contenedor.class = "form-group"
        contenedor.appendChild(this.crearTituloCampo(datos))
        contenedor.appendChild(datos.puntero);
        if(datos.constructor.name=='CampoBuscador')
            contenedor.appendChild(datos.datalist)

        let tempEliminar = new Boton("eliminar","X","",()=>this.eliminarCampo(pos));
        tempEliminar.generar()
        contenedor.appendChild(tempEliminar.puntero)
        this.zonaFormulario.appendChild(contenedor)


    }
    guardar(bd){
        try {
            fetch(this.direccionGuardarForm, {
                method: 'POST',
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({"datos":form.datos,"bd":bd}) // body data type must match "Content-Type" header
            }
            ).then(crudo=> crudo.json() )
            .then(data=> {
                if(data.msg.includes("Error")){
                    throw data
                }else{
                    console.log(data)
                }
            }).catch ((e)=>{
                throw e
            })
        } catch (e) {
            throw e
        } finally {

        }
       // .catch(error=> {
       //     throw error
       // });
    }

    enviarForm(t){
        alert("Prueba de guardado de datos");
    }

    eliminarCampo(posicion){
        this.datos.campos.splice(posicion,1)
        this.destruirFormulario()
        this.generarFormulario()
    }
}

class FormularioBootstrap2Desarrollo extends FormularioBootstrap{
    constructor(zonaFormulario,direccionFetch){
        super(zonaFormulario,direccionFetch);
        this.direccionGuardarForm = "guardar_form.php"
    }
    generarFormulario(){
        /*clase css especifica para este modelo*/
        console.log(this.datos)
        this.campos = this.crearCampos(this.datos.campos);
        this.configuracionesBasicas()
        this.crearTitulo()
        this.botonGuardar=new Boton("guardar","Guardar","",()=>this.enviarForm(this));
        this.botonRestablecer=new Boton("restablecer","Restablecer","",this.restablecerForm);
        this.campos.forEach((item, i) => {
            this.crearContenedorCampo(item,i)
        });
        this.botonGuardar.generar();
        this.botonRestablecer.generar();
        this.zonaFormulario.appendChild(this.botonGuardar.puntero);
        this.zonaFormulario.appendChild(this.botonRestablecer.puntero);
    }

    crearContenedorCampo(datos,pos){
        /*clase css especifica para este modelo*/
        datos.puntero.className =" form-control "+ datos.puntero.className
        let temEtiqueta = this.crearTituloCampo(datos)
        temEtiqueta.className =+" form-label"

        let tempEliminar = new Boton("eliminar","X","",()=>this.eliminarCampo(pos));
        tempEliminar.generar()
        let contenedor = document.createElement("div");
        contenedor.className = "row"
        let contenedorTitulo = document.createElement("div");
        contenedorTitulo.className = "col-sm-2"
        let contenedorCampo = document.createElement("div");
        contenedorCampo.className = "col-sm-4"
        contenedorTitulo.appendChild(this.crearTituloCampo(datos))
        contenedorCampo.appendChild(datos.puntero);
        contenedorCampo.appendChild(tempEliminar.puntero)
        if(datos.constructor.name=='CampoBuscador')
            contenedorCampo.appendChild(datos.datalist)
        contenedor.appendChild(contenedorTitulo)
        contenedor.appendChild(contenedorCampo)

        this.zonaFormulario.appendChild(contenedor)


    }
    guardar(bd){
        try {
            fetch(this.direccionGuardarForm, {
                method: 'POST',
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({"datos":form.datos,"bd":bd}) // body data type must match "Content-Type" header
            }
            ).then(crudo=> crudo.json() )
            .then(data=> {
                if(data.msg.includes("Error")){
                    throw data
                }else{
                    console.log(data)
                }
            }).catch ((e)=>{
                throw e
            })
        } catch (e) {
            throw e
        } finally {

        }
       // .catch(error=> {
       //     throw error
       // });
    }

    enviarForm(t){
        alert("Prueba de guardado de datos");
    }

    eliminarCampo(posicion){
        this.datos.campos.splice(posicion,1)
        this.destruirFormulario()
        this.generarFormulario()
    }
}


class FormularioBootstrap3Desarrollo extends FormularioBootstrap{
    constructor(zonaFormulario,direccionFetch){
        super(zonaFormulario,direccionFetch);
        this.direccionGuardarForm = "guardar_form.php"
    }
    generarFormulario(){
        console.log(this.datos)
        this.campos = this.crearCampos(this.datos.campos);
        this.configuracionesBasicas()
        this.crearTitulo()
        this.botonGuardar=new Boton("guardar","Guardar","",()=>this.enviarForm(this));
        this.botonRestablecer=new Boton("restablecer","Restablecer","",this.restablecerForm);
        this.campos.forEach((item, i) => {
            this.crearContenedorCampo(item,i)
        });
        this.botonGuardar.generar();
        this.botonRestablecer.generar();
        this.zonaFormulario.appendChild(this.botonGuardar.puntero);
        this.zonaFormulario.appendChild(this.botonRestablecer.puntero);
    }

    crearContenedorCampo(datos,pos){
        /*clase css especifica para este modelo*/
        datos.puntero.className =" form-control "+ datos.puntero.className
        let temEtiqueta = this.crearTituloCampo(datos)
        temEtiqueta.className =+" form-label"
        let tempEliminar = new Boton("eliminar","X","",()=>this.eliminarCampo(pos));
        tempEliminar.generar()
        let contenedor = document.createElement("div");
        contenedor.className = "row"
        let contenedorTitulo = document.createElement("div");
        contenedorTitulo.className = "col-sm-4"
        contenedorTitulo.appendChild(this.crearTituloCampo(datos))
        contenedorTitulo.appendChild(datos.puntero);
        contenedorTitulo.appendChild(tempEliminar.puntero)
        if(datos.constructor.name=='CampoBuscador')
            contenedorTitulo.appendChild(datos.datalist)
        contenedor.appendChild(contenedorTitulo)

        this.zonaFormulario.appendChild(contenedor)


    }
    guardar(bd){
        try {
            fetch(this.direccionGuardarForm, {
                method: 'POST',
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({"datos":form.datos,"bd":bd}) // body data type must match "Content-Type" header
            }
            ).then(crudo=> crudo.json() )
            .then(data=> {
                if(data.msg.includes("Error")){
                    throw data
                }else{
                    console.log(data)
                }
            }).catch ((e)=>{
                throw e
            })
        } catch (e) {
            throw e
        } finally {

        }
       // .catch(error=> {
       //     throw error
       // });
    }

    enviarForm(t){
        alert("Prueba de guardado de datos");
    }

    eliminarCampo(posicion){
        this.datos.campos.splice(posicion,1)
        this.destruirFormulario()
        this.generarFormulario()
    }
}


class FormularioBootstrap4Desarrollo extends FormularioBootstrap{
    constructor(zonaFormulario,direccionFetch){
        super(zonaFormulario,direccionFetch);
        this.direccionGuardarForm = "guardar_form.php"
    }
    generarFormulario(){
        console.log(this.datos)
        this.campos = this.crearCampos(this.datos.campos);
        this.configuracionesBasicas()
        this.crearTitulo()
        this.botonGuardar=new Boton("guardar","Guardar","",()=>this.enviarForm(this));
        this.botonRestablecer=new Boton("restablecer","Restablecer","",this.restablecerForm);
        this.campos.forEach((item, i) => {
            this.crearContenedorCampo(item,i)
        });
        this.botonGuardar.generar();
        this.botonRestablecer.generar();
        this.zonaFormulario.appendChild(this.botonGuardar.puntero);
        this.zonaFormulario.appendChild(this.botonRestablecer.puntero);
    }

    crearContenedorCampo(datos,pos){
        /*clase css especifica para este modelo*/
        datos.puntero.className =" form-control "+ datos.puntero.className
        let temEtiqueta = this.crearTituloCampo(datos)
        temEtiqueta.className =+" form-label"
        let tempEliminar = new Boton("eliminar","X","",()=>this.eliminarCampo(pos));
        tempEliminar.generar()
        let contenedor = document.createElement("div");
        contenedor.className = "row"
        let contenedorInterno1 = document.createElement("div");
        contenedorInterno1.className = "col-sm-4"
        let contenedorFlotante = document.createElement("div");
        contenedorFlotante.className = "form-floating"
        contenedorFlotante.appendChild(datos.puntero);
        contenedorFlotante.appendChild(this.crearTituloCampo(datos))
        contenedorFlotante.appendChild(tempEliminar.puntero)
        if(datos.constructor.name=='CampoBuscador')
            contenedorFlotante.appendChild(datos.datalist)
        contenedorInterno1.appendChild(contenedorFlotante)
        contenedor.appendChild(contenedorFlotante)

        this.zonaFormulario.appendChild(contenedor)


    }
    guardar(bd){
        try {
            fetch(this.direccionGuardarForm, {
                method: 'POST',
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({"datos":form.datos,"bd":bd}) // body data type must match "Content-Type" header
            }
            ).then(crudo=> crudo.json() )
            .then(data=> {
                if(data.msg.includes("Error")){
                    throw data
                }else{
                    console.log(data)
                }
            }).catch ((e)=>{
                throw e
            })
        } catch (e) {
            throw e
        } finally {

        }
       // .catch(error=> {
       //     throw error
       // });
    }

    enviarForm(t){
        alert("Prueba de guardado de datos");
    }

    eliminarCampo(posicion){
        this.datos.campos.splice(posicion,1)
        this.destruirFormulario()
        this.generarFormulario()
    }
}
//TIPOS DE CAMPOS

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
        this.validacionMenor=(validacionMenor)?validacionMenor:null;
        this.validacionMayor=(validacionMayor)?validacionMayor:null;
        this.generar();

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
        console.log("generando campo Numerico");
        this.puntero=document.createElement("input");
        this.puntero.type="number";
        this.puntero.placeholder=this.placeHolder;
        this.puntero.className = this.clase;
        if(this.validacionMayor!= null) {this.puntero.max = this.validacionMayor}
        if(this.validacionMenor!= null) {this.puntero.min = this.validacionMenor}
        this.puntero.id = this.id;
        this.puntero.name = this.id;
    }
}

class CampoFecha extends Campo{
    constructor(id,titulo,campoTabla,clase="",placeHolder="",validacion="0",validacionMenor,validacionMayor){
        super(id,titulo,campoTabla,clase,placeHolder,validacion);
        this.validacionMenor=(validacionMenor)?validacionMenor:null;
        this.validacionMayor=(validacionMayor)?validacionMayor:null;
        this.generar();
    }
    validar(){
        return (this.validacionVacio || this.puntero.value.trim().length!=0);
    }
    generar(){
        console.log("generando campo Fecha");
        this.puntero=document.createElement("input");
        this.puntero.type="date";
        if(this.validacionMayor!= null) {this.puntero.max = this.validacionMayor}
        if(this.validacionMenor!= null) {this.puntero.min = this.validacionMenor}
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
    constructor(id,titulo,campoTabla,clase="",placeHolder="",validacion="0",listaValores=[]){
        super(id,titulo,campoTabla,clase,placeHolder,validacion);
        this.listaValores = listaValores
        this.generar();
        this.datalist;
    }
    validar(){
        return (this.validacionVacio || this.puntero.value.trim().length!=0);
    }
    generar(){
        console.log("generando campo Buscador");
        let temp = "";
        this.datalist= document.createElement('datalist');
        this.datalist.id = 'lista-'+this.id;
        this.puntero=document.createElement("input");
        this.puntero.type="text";
        this.puntero.placeholder=this.placeHolder;
        this.puntero.setAttribute('list', 'lista-'+this.id);
        this.puntero.className = this.clase;
        this.puntero.id = this.id;
        this.puntero.name = this.id;
        this.listaValores.forEach((item, i) => {
            for (var indice in item) {
                temp+="<option value='"+indice+"'>"+item[indice]+"</option>";
            }
        });
        this.datalist.innerHTML = temp;
        console.log("test")
    }
}

class Boton {
    constructor(id,titulo,clase,accionClick){
        this.id = id;
        this.titulo = titulo;
        this.clase = clase
        this.accionClick = accionClick;
        this.puntero = null;

    }
    generar(){
        console.log("Construyendo boton");
        this.puntero = document.createElement("button");
        this.puntero.className = this.clase;
        this.puntero.innerHTML = this.titulo;
        this.puntero.addEventListener("click",this.accionClick);

    }
}
