var tableespecialidad;
function listar_especialidad(){
    tableespecialidad = $("#tabla_especialidad").DataTable({
            "ordering":false,
            "bLengthChange":false,
            "searching": { "regex": true },
            "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
            "pageLength": 10,
            "destroy":true,
            "async": false ,
            "processing": true,
            "ajax":{
                "url":"../controlador/especialidad/controlador_especialidad_listar.php",
                type:'POST'
            },
            "order":[[1,'asc']],
            "columns":[
            {"defaultContent":""},
            {"data":"especialidad_nombre"},
            {"data":"especialidad_fregistro"},
            {"data":"especialidad_estatus",
           render: function (data, type, row) {
                if(data=='ACTIVO'){
                   return "<span class='label label-success'>"+data+"</span>";
                }
                if(data=='INACTIVO'){
                    return "<span class='label label-danger'>"+data+"</span>";
                 }
           }     
        },
        {"data":"especialidad_estatus",
        render: function (data, type, row ) {
          if(data=='ACTIVO'){
              return "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='desactivar btn btn-danger'><i class='fa fa-remove'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success' disabled><i class='fa fa-check'></i></button>";                   
          }else{
             return "<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='desactivar btn btn-danger' disabled><i class='fa fa-remove'></i></button>&nbsp;<button style='font-size:13px;' type='button' class='activar btn btn-success'><i class='fa fa-check'></i></button>";                 
          }
        }
      }
       ],

       "language":idioma_espanol,
       select: true
   });
   document.getElementById("tabla_especialidad_filter").style.display="none";
   $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );
    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

    tableespecialidad.on('draw.td', function (){
        var PageInfo = $('#tabla_especialidad').DataTable().page.info();
        tableespecialidad.column(0, {page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });

}
 
function filterGlobal() {
    $('#tabla_especialidad').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

function Modificar_Estatus(id,estatus){
    var mensaje ="";
    if(estatus=='INACTIVO'){
        mensaje="desactivo";
    }else{
        mensaje="activo";
    }
    $.ajax({
        "url":"../controlador/especialidad/controlador_modificar_estatus_especialidad.php",
        type:'POST',
        data:{
            id:id,
            estatus:estatus
        }
    }).done(function(resp){
        if(resp>0){
            Swal.fire("Mensaje De Confirmacion","La especialidad se "+mensaje+" con exito","success")            
            .then ( ( value ) =>  {
                tableespecialidad.ajax.reload();
            }); 
        }
    })


}

$('#tabla_especialidad').on('click','.activar',function(){
    var data = tableespecialidad.row($(this).parents('tr')).data();
    if(tableespecialidad.row(this).child.isShown()){
        var data = tableespecialidad.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de cambiar el estatus de la especialidad?',
        text: "Una vez hecho esto la especialidad pasara a estatus: activo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.especialidad_id,'ACTIVO');
        }
      })
})

$('#tabla_especialidad').on('click','.desactivar',function(){
    var data = tableespecialidad.row($(this).parents('tr')).data();
    if(tableespecialidad.row(this).child.isShown()){
        var data = tableespecialidad.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de cambiar el estatus de la especialidad?',
        text: "Una vez hecho esto la especialidad pasara a estatus: inactivo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.especialidad_id,'INACTIVO');
        }
      })
})

$('#tabla_especialidad').on('click','.editar',function(){
    var data = tableespecialidad.row($(this).parents('tr')).data();/*Detecta a que fila hago click y me
    captura los datos en la variable data*/
    if(tableespecialidad.row(this).child.isShown()){//Cuando esta en tamano corresponsivo
        var data = tableespecialidad.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static', keyboard:false})
    $("#modal_editar").modal('show');
    $("#id_especialidad").val(data.especialidad_id);
    $("#txt_especialidad_actual_editar").val(data.especialidad_nombre);
    $("#txt_especialidad_nueva_editar").val(data.especialidad_nombre);
    $("#txt_estatus_editar").val(data.especialidad_estatus).trigger("change");
})

function Registrar_Especialidad(){
    var especialidad = $("#txt_especialidad").val();
    var estatus = $("#cbm_estatus").val();

    if(especialidad.length==0 || estatus.length==0){
        return Swal.fire("Mensaje de advertencia","Llene los campos vacios","warning");
    }

    $.ajax({
        "url":"../controlador/especialidad/controlador_especialidad_registro.php",
        type:'POST',
        data:{
            especialidad:especialidad,
            estatus:estatus
        }
    }).done(function(resp){
        //alert(resp);
        if(resp>0){
            if(resp==1){
                $("#modal_registro").modal('hide');
                listar_especialidad();
                return Swal.fire("Mensaje De Confirmacion","Nueva Especialidad Registrada","success")            
                .then ( ( value ) =>  {
                    LimpiarCampos();
                    tableespecialidad.ajax.reload();
                }); 
            }else{
                return Swal.fire("Mensaje De Advertencia","Lo sentimos, el nombre de la especialidad ya se encuentra en nuestra base de datos","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar el registro","error");
        }
    })
}

function Modificar_Especialidad(){
    var id = $("#id_especialidad").val();
    var especialidadactual = $("#txt_especialidad_actual_editar").val();
    var especialidadnueva = $("#txt_especialidad_nueva_editar").val();
    var estatus = $("#cbm_estatus_editar").val();

    if(especialidadactual.length==0 ||especialidadnueva.length==0 || estatus.length==0){
        return Swal.fire("Mensaje de advertencia","Llene los campos vacios","warning");
    }

    $.ajax({
        "url":"../controlador/especialidad/controlador_especialidad_modificar.php",
        type:'POST',
        data:{
            id:id,
            espeac:especialidadactual,
            espenu:especialidadnueva,
            estatus:estatus
        }
    }).done(function(resp){
        //alert(resp);
        if(resp>0){
            if(resp==1){
                $("#modal_editar").modal('hide');
                listar_especialidad();
                return Swal.fire("Mensaje De Confirmacion","Datos actualizados correctamente","success")
                .then ( ( value ) =>  {
                    tableespecialidad.ajax.reload();
                }); 
                
                
            }else{
                return Swal.fire("Mensaje De Advertencia","Lo sentimos, la especialiad ya se encuentra en nuestra base de datos","warning");
            }
        }else{
            return Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar la actualizacion","error");
        }
    })
}

function LimpiarCampos(){
    $("#txt_especialidad").val("");
}

