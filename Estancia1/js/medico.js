var tablemedico;
function listar_medico(){
    tablemedico = $("#tabla_medico").DataTable({
       "ordering":false,
       "bLengthChange":false,
       "searching": { "regex": true },
       "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
       "pageLength": 10,
       "destroy":true,
       "async": false ,
       "processing": true,
       "ajax":{
           "url":"../controlador/medico/controlador_medico_listar.php",
           type:'POST'
       },
       "order":[[1,'asc']],
       "columns":[
           {"defaultContent":""},
           {"data":"medico_nrodocumento"},
           {"data":"medico_nombre"},
           {"data":"medico_colegiatura"},
           {"data":"especialidad_nombre"},
           {"data":"medico_sexo",
           render: function (data, type, row) {
                if(data=='M'){
                   return "MASCULINO";
                }else{
                   return "FEMENINO";
                }
           }     
        },
        {"data":"medico_movil"},
           {"defaultContent":"<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i>"}
       ],

       "language":idioma_espanol,
       select: true
   });
   document.getElementById("tabla_medico_filter").style.display="none";
   $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );
    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

    tablemedico.on('draw.td', function (){
        var PageInfo = $('#tabla_medico').DataTable().page.info();
        tablemedico.column(0, {page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

}

$('#tabla_medico').on('click','.editar',function(){
    var data = tablemedico.row($(this).parents('tr')).data();/*Detecta a que fila hago click y me
    captura los datos en la variable data*/
    if(tablemedico.row(this).child.isShown()){//Cuando esta en tamano corresponsivo
        var data = tablemedico.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static', keyboard:false})
    $("#modal_editar").modal('show');
    $("#id_medico").val(data.medico_id);
    $("#txt_nombres_editar").val(data.medico_nombre);
    $("#txt_direccion_editar").val(data.medico_direccion);
    $("#txt_movil_editar").val(data.medico_movil);
    $("#cmb_sexo_editar").val(data.medico_sexo).trigger("change");
    $("#txt_fenac_editar").val(data.medico_fenac);
    $("#txt_ndoc_editar_actual").val(data.medico_nrodocumento);
    $("#txt_ndoc_editar_nuevo").val(data.medico_nrodocumento);
    $("#txt_ncol_editar_actual").val(data.medico_colegiatura);
    $("#txt_ncol_editar_nuevo").val(data.medico_colegiatura);
    $("#cmb_especialidad_editar").val(data.medico_especialidad).trigger("change");
    $("#txt_nombres_editar").val(data.medico_nombre);
    //Datos usuario
    $("#id_usuario").val(data.usu_id);
    $("#txt_usu_editar").val(data.usu_nombre);
    $("#cmb_rol_editar").val(data.rol_id).trigger("change");
    $("#txt_email_editar").val(data.usu_email);
})

function filterGlobal(){
    $('#tabla_medico').DataTable().search(
        $('#globla_filter').val(),
    ).draww();
}

function AbrirModalRegistro(){
    $("#modal_registro").modal({backdrop: 'static', keyboard:false})
    $("#modal_registro").modal('show');
    listar_combo_rol();
    listar_combo_especialidad();
}

function listar_combo_rol(){
    $.ajax({
        "url":"../controlador/usuario/controlador_combo_rol_listar.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                if([i][0]=='2'){
                    cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
                }
            }
            $("#cbm_rol").html(cadena);
            $("#cbm_rol_editar").html(cadena);
        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_rol").html(cadena);
            $("#cbm_rol_editar").html(cadena);
        }
    })
}

function listar_combo_especialidad(){
    $.ajax({
        "url":"../controlador/medico/controlador_combo_especialidad_listar.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                cadena+="<option value='"+data[i][0]+"'>"+data[i][1]+"</option>";
            }
            $("#cbm_especialidad").html(cadena);
            $("#cbm_especialidad_editar").html(cadena);
        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_especialidad").html(cadena);
            $("#cbm_especialidad_editar").html(cadena);
        }
    })
}

function Registrar_Medico(){
    var nombre = $("#txt_nombres").val();
    var direccion = $("#txt_direccion").val();
    var movil = $("#txt_movil").val();
    var sexo = $("#cbm_sexo").val();
    var fenac = $("#txt_fenac").val();
    var nrodocumento = $("#txt_ndoc").val();
    var colegiatura = $("#txt_ncol").val();
    var especialidad = $("#cbm_especialidad").val();
    var usu = $("#txt_usu").val();
    var contra = $("#txt_contra").val();
    var rol = $("#cbm_rol").val();
    var email = $("#txt_email").val();
    var validaremail=$("#validar_email").val();

    if(validaremail=="incorrecto"){
        return Swal.fire('Mensaje de advertencia', 'El email ingresado no tiene el formato correcto', 
        'warning');
    }

    if(nombre.length==0 || direccion.length==0 || movil.length==0 || sexo.length==0 || 
        fenac.length==0 || nrodocumento.length==0 || colegiatura.length==0 ||
        especialidad.length==0 || usu.length==0 || contra.length==0 || rol.length==0 || 
        email.length==0){
        return Swal.fire("Mensaje de advertencia", "Llene todos los campos", "warning"); 
    }
    $.ajax({
        "url":"../controlador/medico/controlador_medico_registro.php",
        type:'POST',
        data:{
            nombre:nombre,
            direccion:direccion,
            movil:movil,
            sexo:sexo,
            fenac:fenac,
            nrodocumento:nrodocumento,
            colegiatura:colegiatura,
            especialidad:especialidad,
            usu:usu,
            contra:contra,
            rol:rol,
            email:email
        }
    }).done(function(resp){
        //alert(resp);
        if(resp>0){
            if(resp==1){
                $("#modal_registro").modal('hide');
                return Swal.fire("Mensaje De Confirmacion","Nuevo Medico Registrado","success")            
                .then ( ( value ) =>  {
                    //LimpiarCampos();
                    tablemedico.ajax.reload();
                }); 
            }else{
                return Swal.fire("Mensaje De Advertencia","Lo sentimos, el nombre de usuario ya se encuentra en nuestra base de datos","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar el registro","error");
        }
    })
}

function Editar_Medico(){
    var idmedico = $("#id_medico").val();
    var nombre = $("#txt_nombres_editar").val();
    var direccion = $("#txt_direccion_editar").val();
    var movil = $("#txt_movil_editar").val();
    var sexo = $("#cbm_sexo_editar").val();
    var fenac = $("#txt_fenac_editar").val();
    var nrodocumentoactual = $("#txt_ndoc_editar_actual").val();
    var nrodocumentonuevo = $("#txt_ndoc_editar_nuevo").val();
    var colegiaturaactual = $("#txt_ncol_editar_actual").val();
    var colegiaturanuevo = $("#txt_ncol_editar_nuevo").val();
    var especialidad = $("#cbm_especialidad_editar").val();
    var idusuario = $("#id_usuario").val();
    var email = $("#txt_email_editar").val();
    var validaremail=$("#validar_email_editar").val();

    if(validaremail=="incorrecto"){
        return Swal.fire('Mensaje de advertencia', 'El email ingresado no tiene el formato correcto', 
        'warning');
    }

    if(nombre.length==0 || direccion.length==0 || movil.length==0 || sexo.length==0 || fenac.length==0 || 
        nrodocumentonuevo.length==0 || colegiaturanuevo.length==0 || especialidad.length==0 || email.length==0){
        return Swal.fire("Mensaje de advertencia","Llene los campos vacios","warning");
    }

    $.ajax({
        "url":"../controlador/medico/controlador_medico_modificar.php",
        type:'POST',
        data:{
            idmedico:idmedico,
            nombre:nombre,
            direccion:direccion,
            movil:movil,
            sexo:sexo,
            fenac:fenac,
            nrodocumentoactual:nrodocumentoactual,
            nrodocumentonuevo:nrodocumentonuevo,
            colegiaturaactual:colegiaturaactual,
            colegiaturanuevo:colegiaturanuevo,
            especialidad:especialidad,
            idusuario:idusuario,
            email:email
        }
    }).done(function(resp){
        //alert(resp);
        if(resp>0){
            if(resp==1){
                $("#modal_editar").modal('hide');
                listar_medico();
                //LimpiarCampos();
                return Swal.fire("Mensaje De Confirmacion","Datos actualizados correctamente","success")
                .then ( ( value ) =>  {
                    tablemedico.ajax.reload();
                }); 
                
                
            }else{
                //LimpiarCampos();
                return Swal.fire("Mensaje De Advertencia","Lo sentimos, el numero de documento ya se encuentra en nuestra base de datos","warning");
            }
        }else{
            return Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar la actualizacion","error");
        }
    })
}

