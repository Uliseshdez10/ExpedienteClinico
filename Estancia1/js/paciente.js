var tablepaciente;
function listar_paciente(){
    tablepaciente = $("#tabla_paciente").DataTable({
      "ordering":false,
      "bLengthChange":false,
      "searching": { "regex": true },
      "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
      "pageLength": 10,
      "destroy":true,
      "async": false ,
      "processing": true,
      "ajax":{
          "url":"../controlador/paciente/controlador_paciente_listar.php",
          type:'POST'
       },
       "order":[[1,'asc']],
       "columns":[
            {"defaultContent":""},
            {"data":"paciente_folio"},
            {"data":"paciente_curp"},
            {"data":"paciente_nombre"},
            {"data":"paciente_domi"},
            {"data":"paciente_sexo",
           render: function (data, type, row) {
                if(data=='M'){
                   return "MASCULINO";
                    }else{
                     return "FEMENINO";
                    }
                }     
            },
            {"data":"paciente_tel"},
            {"data":"paciente_estatus",
           render: function (data, type, row) {
                if(data=='ACTIVO'){
                   return "<span class='label label-success'>"+data+"</span>";
                }
                if(data=='INACTIVO'){
                    return "<span class='label label-danger'>"+data+"</span>";
                 }
           }     
        },
        {"data":"paciente_estatus",
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
   document.getElementById("tabla_paciente_filter").style.display="none";
   $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );
    
    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

    tablepaciente.on('draw.td', function (){
        var PageInfo = $('#tabla_paciente').DataTable().page.info();
        tablepaciente.column(0, {page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
}

function filterGlobal() {
    $('#tabla_paciente').DataTable().search(
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
        "url":"../controlador/paciente/controlador_modificar_estatus_paciente.php",
        type:'POST',
        data:{
            id:id,
            estatus:estatus
        }
    }).done(function(resp){
        if(resp>0){
            Swal.fire("Mensaje De Confirmacion","El paciente se "+mensaje+" con exito","success")            
            .then ( ( value ) =>  {
                tablepaciente.ajax.reload();
            }); 
        }
    })


}

$('#tabla_paciente').on('click','.activar',function(){
    var data = tablepaciente.row($(this).parents('tr')).data();
    if(tablepaciente.row(this).child.isShown()){
        var data = tablepaciente.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de cambiar el estatus del paciente?',
        text: "Una vez hecho esto el paciente pasara a estatus: activo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.paciente_id,'ACTIVO');
        }
      })
})

$('#tabla_paciente').on('click','.desactivar',function(){
    var data = tablepaciente.row($(this).parents('tr')).data();
    if(tablepaciente.row(this).child.isShown()){
        var data = tablepaciente.row(this).data();
    }
    Swal.fire({
        title: 'Esta seguro de cambiar el estatus del paciente?',
        text: "Una vez hecho esto el paciente pasara a estatus: inactivo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result) => {
        if (result.value) {
            Modificar_Estatus(data.paciente_id,'INACTIVO');
        }
      })
})

$('#tabla_paciente').on('click','.editar',function(){
    var data = tablepaciente.row($(this).parents('tr')).data();/*Detecta a que fila hago click y me
    captura los datos en la variable data*/
    if(tablepaciente.row(this).child.isShown()){//Cuando esta en tamano corresponsivo
        var data = tablepaciente.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static', keyboard:false})
    $("#modal_editar").modal('show');
    $("#txt_idpaciente").val(data.paciente_id);
    $("#txt_folio_actual_editar").val(data.paciente_folio);
    $("#txt_folio_nuevo_editar").val(data.paciente_folio);
    $("#txt_nombre_editar").val(data.paciente_nombre);
    $("#txt_fenac_editar").val(data.paciente_fenac);
    $("#txt_edad_editar").val(data.paciente_edad);
    $("#cmb_sexo_editar").val(data.paciente_sexo).trigger("change");
    $("#txt_relig_editar").val(data.paciente_relig);
    $("#txt_domi_editar").val(data.paciente_domi);
    $("#txt_tel_editar").val(data.paciente_tel);
    $("#cbm_estciv_editar").val(data.paciente_estciv).trigger("change");
    $("#txt_esco_editar").val(data.paciente_esco);
    $("#txt_ocup_editar").val(data.paciente_ocup);
    $("#txt_lunac_editar").val(data.paciente_lunac);
    $("#txt_resiact_editar").val(data.paciente_resiact);
    $("#cbm_da_editar").val(data.paciente_da).trigger("change");
    $("#txt_curp_editar").val(data.paciente_curp);
    $("#txt_niveco_editar").val(data.paciente_niveco);
    $("#txt_grupet_editar").val(data.paciente_grupet);
    $("#txt_estatus_editar").val(data.paciente_estatus).trigger("change");
})

function Registrar_Paciente(){
    var nombres = $("#txt_nombre").val();
    var fenac = $("#txt_fenac").val();
    var edad = $("#txt_edad").val();
    var sexo = $("#cbm_sexo").val();
    var relig = $("#txt_relig").val();
    var domi = $("#txt_domi").val();
    var tel = $("#txt_tel").val();
    var estciv = $("#cbm_estciv").val();
    var esco = $("#txt_esco").val();
    var ocup = $("#txt_ocup").val();
    var lunac = $("#txt_lunac").val();
    var resiact = $("#txt_resiact").val();
    var da = $("#cbm_da").val();
    var curp = $("#txt_curp").val();
    var niveco = $("#txt_niveco").val();
    var grupet = $("#txt_grupet").val();
    var folio = $("#txt_folio").val();

    if(nombres.length==0 || fenac.length==0 || edad.length==0 || sexo.length==0 || relig.length==0 || domi.length==0 || tel.length==0 || 
        estciv.length==0 || esco.length==0 || ocup.length==0 || lunac.length==0 || resiact.length==0 || da.length==0 || curp.length==0 ||
        niveco.length==0 || grupet.length==0 || folio.length==0){
        return Swal.fire("Mensaje de advertencia","Llene los campos vacios","warning");
    }

    $.ajax({
        "url":"../controlador/paciente/controlador_paciente_registro.php",
        type:'POST',
        data:{
            nombres:nombres,
            fenac:fenac,
            edad:edad,
            sexo:sexo,
            relig:relig,
            domi:domi,
            tel:tel,
            estciv:estciv,
            esco:esco,
            ocup:ocup,
            lunac:lunac,
            resiact:resiact,
            da:da,
            curp:curp,
            niveco:niveco,
            grupet:grupet,
            folio:folio
        }
    }).done(function(resp){
        //alert(resp);
        if(resp>0){
            if(resp==1){
                $("#modal_registro").modal('hide');
                return Swal.fire("Mensaje De Confirmacion","Nuevo Paciente Registrado","success")            
                .then ( ( value ) =>  {
                    LimpiarCampos();
                    tablepaciente.ajax.reload();
                }); 
            }else{
                return Swal.fire("Mensaje De Advertencia","Lo sentimos, el nombre del paciente ya se encuentra en nuestra base de datos","warning");
            }
        }else{
            Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar el registro","error");
        }
    })
}

function LimpiarCampos(){
    $("#txt_nombre").val("");
    $("#txt_fenac").val("");
    $("#txt_edad").val("");
    $("#cbm_sexo").val("");
    $("#txt_relig").val("");
    $("#txt_domi").val("");
    $("#txt_tel").val("");
    $("#cbm_estciv").val("");
    $("#txt_esco").val("");
    $("#txt_ocup").val("");
    $("#txt_lunac").val("");
    $("#txt_resiact").val("");
    $("#cbm_da").val("");
    $("#txt_curp").val("");
    $("#txt_niveco").val("");
    $("#txt_grupet").val("");
    $("#txt_folio").val("");
}

function Modificar_Paciente(){
    var id = $("#txt_idpaciente").val();
    var nombres = $("#txt_nombre_editar").val();
    var fenac = $("#txt_fenac_editar").val();
    var edad = $("#txt_edad_editar").val();
    var sexo = $("#cbm_sexo_editar").val();
    var relig = $("#txt_relig_editar").val();
    var domi = $("#txt_domi_editar").val();
    var tel = $("#txt_tel_editar").val();
    var estciv = $("#cbm_estciv_editar").val();
    var esco = $("#txt_esco_editar").val();
    var ocup = $("#txt_ocup_editar").val();
    var lunac = $("#txt_lunac_editar").val();
    var resiact = $("#txt_resiact_editar").val();
    var da = $("#cbm_da_editar").val();
    var curp = $("#txt_curp_editar").val();
    var niveco = $("#txt_niveco_editar").val();
    var grupet = $("#txt_grupet_editar").val();
    var folioactual = $("#txt_folio_actual_editar").val();
    var folionuevo = $("#txt_folio_nuevo_editar").val();
    var estatus = $("#cbm_estatus_editar").val();

    if(id.length==0 ||nombres.length==0 || fenac.length==0 || edad.length==0 || sexo.length==0 || relig.length==0 || domi.length==0 || tel.length==0 || 
        estciv.length==0 || esco.length==0 || ocup.length==0 || lunac.length==0 || resiact.length==0 || da.length==0 || curp.length==0 ||
        niveco.length==0 || grupet.length==0 || folionuevo.length==0){
        return Swal.fire("Mensaje de advertencia","Llene los campos vacios","warning");
    }

    $.ajax({
        "url":"../controlador/paciente/controlador_paciente_modificar.php",
        type:'POST',
        data:{
            id:id,
            nombres:nombres,
            fenac:fenac,
            edad:edad,
            sexo:sexo,
            relig:relig,
            domi:domi,
            tel:tel,
            estciv:estciv,
            esco:esco,
            ocup:ocup,
            lunac:lunac,
            resiact:resiact,
            da:da,
            curp:curp,
            niveco:niveco,
            grupet:grupet,
            folioactual:folioactual,
            folionuevo:folionuevo,
            estatus:estatus
        }
    }).done(function(resp){
        //alert(resp);
        if(resp>0){
            if(resp==1){
                $("#modal_editar").modal('hide');
                listar_paciente();
                //LimpiarCampos();
                return Swal.fire("Mensaje De Confirmacion","Datos actualizados correctamente","success")
                .then ( ( value ) =>  {
                    tablepaciente.ajax.reload();
                }); 
                
                
            }else{
                //LimpiarCampos();
                return Swal.fire("Mensaje De Advertencia","Lo sentimos, el numero de folio ya se encuentra en nuestra base de datos","warning");
            }
        }else{
            return Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar la actualizacion","error");
        }
    })
}

$(function(){
    $('#txt_fenac').on('change', calcularEdad);
    $('#txt_fenac_editar').on('change', calcularEdad);
});

function calcularEdad() {
    
    fecha = $(this).val();
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var a = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    var d = hoy.getDate() - cumpleanos.getDate();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        a--;
    }

    if(a>0){
        $('#txt_edad').val(`${a} año(s)`)
        $('#txt_edad_editar').val(`${a} año(s)`)
        
    }else{
        if (d < 0 || (d === 0 && hoy.getDate() < cumpleanos.getDate())) {
            m--;
        }

        if(m>0){
            $('#txt_edad').val(`${m} meses(s)`)
            $('#txt_edad_editar').val(`${m} meses(s)`)
        }else{
            $('#txt_edad').val(`${d} dias(s)`)
            $('#txt_edad_editar').val(`${d} dias(s)`) 
        }   
    }
    //LimpiarCampos();
    //tablepaciente.ajax.reload();
}
