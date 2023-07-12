var tablehistorial;
function listar_historial(){
    tablehistorial = $("#tabla_historial").DataTable({
      "ordering":false,
      "bLengthChange":false,
      "searching": { "regex": true },
      "lengthMenu": [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ],
      "pageLength": 10,
      "destroy":true,
      "async": false ,
      "processing": true,
      "ajax":{
          "url":"../controlador/historial/controlador_historial_listar.php",
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
            {"defaultContent":"<button style='font-size:13px;' type='button' class='editar btn btn-primary'><i class='fa fa-edit'></i>"},
            {"data":"id_hiscli",
            render: function (data, type, row ) {
             return "<button style='font-size:13px;' type='button' class='pdf btn btn-danger' title='Ver PDF'><i class='fa fa-print'></i>" 
           }
         },
       ],

       "language":idioma_espanol,
       select: true
   });
   document.getElementById("tabla_historial_filter").style.display="none";
   $('input.global_filter').on( 'keyup click', function () {
        filterGlobal();
    } );
    
    $('input.column_filter').on( 'keyup click', function () {
        filterColumn( $(this).parents('tr').attr('data-column') );
    });

    tablehistorial.on('draw.td', function (){
        var PageInfo = $('#tabla_historial').DataTable().page.info();
        tablehistorial.column(0, {page: 'current' }).nodes().each( function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
}

function filterGlobal() {
    $('#tabla_historial').DataTable().search(
        $('#global_filter').val(),
    ).draw();
}

$('#tabla_historial').on('click','.editar',function(){
    var data =  tablehistorial.row($(this).parents('tr')).data();/*Detecta a que fila hago click y me
    captura los datos en la variable data*/
    if( tablehistorial.row(this).child.isShown()){//Cuando esta en tamano corresponsivo
        var data =  tablehistorial.row(this).data();
    }
    $("#modal_editar").modal({backdrop:'static', keyboard:false})
    $("#modal_editar").modal('show')
    $("#txt_idhistorial").val(data.id_hiscli);
    $("#cbm_nombre_editar").val(data.paciente_id).trigger("change");
    $("#txt_ant_heredofami_editar").val(data.ant_heredofami);
    $("#txt_ant_personopatolo_editar").val(data.ant_personopatolo);
    $("#txt_ant_gineobs_editar").val(data.ant_gineobs);
    $("#txt_ant_persopatolo_editar").val(data.ant_persopatolo);
    $("#txt_pade_actual_editar").val(data.pade_actual);
    $("#txt_sintomas_generales_editar").val(data.sintomas_generales);
    $("#txt_organos_sentidos_editar").val(data.organos_sentidos);
    $("#txt_aparato_cardiovascular_editar").val(data.aparato_cardiovascular);
    $("#txt_aparato_respiratorio_editar").val(data.aparato_respiratorio);
    $("#txt_aparato_genitour_editar").val(data.aparato_genitour);
    $("#txt_aparato_digestivo_editar").val(data.aparato_digestivo);
    $("#txt_sistema_endocrino_editar").val(data.sistema_endocrino);
    $("#txt_sistema_nervioso_editar").val(data.sistema_nervioso);
    $("#txt_hemolinfatico_editar").val(data.hemolinfatico);
    $("#txt_sistema_ostemus_editar").val(data.sistema_ostemus);
    $("#txt_interro_esp_editar").val(data.interro_esp);
    $("#txt_habitus_exterior_editar").val(data.habitus_exterior);
    $("#txt_frecu_cardi_editar").val(data.frecu_cardi);
    $("#txt_tension_arterial_editar").val(data.tension_arterial);
    $("#txt_frecu_respiratoria_editar").val(data.frecu_respiratoria);
    $("#txt_temperatura_editar").val(data.temperatura);
    $("#txt_peso_editar").val(data.peso);
    $("#txt_talla_editar").val(data.talla);
    $("#txt_icm_editar").val(data.icm);
    $("#txt_cabeza_editar").val(data.cabeza);
    $("#txt_cuello_editar").val(data.cuello);
    $("#txt_torax_editar").val(data.torax);
    $("#txt_abdomen_editar").val(data.abdomen);
    $("#txt_extremidades_editar").val(data.extremidades);
    $("#txt_genitales_editar").val(data.genitales);
    $("#txt_explo_esp_editar").val(data.explo_esp);
    $("#txt_resultados_labgab_editar").val(data.resultados_labgab);
    $("#txt_diagnosticos_editar").val(data.diagnosticos);
    $("#txt_pronostico_editar").val(data.pronostico);
    $("#txt_indicacion_terap_editar").val(data.indicacion_terap);
})

$('#tabla_historial').on('click','.pdf',function(){
    var data =  tablehistorial.row($(this).parents('tr')).data();/*Detecta a que fila hago click y me
    captura los datos en la variable data*/
    if( tablehistorial.row(this).child.isShown()){//Cuando esta en tamano corresponsivo
        var data =  tablehistorial.row(this).data();
    }
    window.open("../vista/librereporte/reportes/generar_fua.php?id="+parseInt
    (data.id_hiscli)+"#zoom=100%","Ticket","scrollbars=NO");
    })

function listar_paciente_combo_historial(){
    $.ajax({
        "url":"../controlador/historial/controlador_combo_paciente_listar.php",
        type:'POST'
    }).done(function(resp){
        var data = JSON.parse(resp);
        var cadena="";
        if(data.length>0){
            for(var i=0; i < data.length; i++){
                cadena+="<option value='"+data[i][0]+"'>PACIENTE: &#160;"+data[i][1]+"&#160;&#160;&#160;&#160;&#160; - &#160;&#160;&#160;&#160;CURP: &#160;"+data[i][14]+"</option>";
            }     
            $("#cbm_nombre").html(cadena);
        }else{
            cadena+="<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#cbm_nombre").html(cadena);
        }
    })
}

function Registrar_Historial(){
    //Datos del paciente
    var nombres = $("#cbm_nombre").val();
    var dato1 = $("#txt_ant_heredofami").val();
    var dato2 = $("#txt_ant_personopatolo").val();
    var dato3 = $("#txt_ant_gineobs").val();
    var dato4 = $("#txt_ant_persopatolo").val();
    var dato5 = $("#txt_pade_actual").val();
    var dato6 = $("#txt_sintomas_generales").val();
    var dato7 = $("#txt_organos_sentidos").val();
    var dato8 = $("#txt_aparato_cardiovascular").val();
    var dato9 = $("#txt_aparato_respiratorio").val();
    var dato10 = $("#txt_aparato_genitour").val();
    var dato11 = $("#txt_aparato_digestivo").val();
    var dato12 = $("#txt_sistema_endocrino").val();
    var dato13 = $("#txt_sistema_nervioso").val();
    var dato14 = $("#txt_hemolinfatico").val();
    var dato15 = $("#txt_sistema_ostemus").val();
    var dato16 = $("#txt_interro_esp").val();
    var dato17 = $("#txt_habitus_exterior").val();
    var dato18 = $("#txt_frecu_cardi").val();
    var dato19 = $("#txt_tension_arterial").val();
    var dato20 = $("#txt_frecu_respiratoria").val();
    var dato21 = $("#txt_temperatura").val();
    var dato22 = $("#txt_peso").val();
    var dato23 = $("#txt_talla").val();
    var dato24 = $("#txt_icm").val();
    var dato25 = $("#txt_cabeza").val();
    var dato26 = $("#txt_cuello").val();
    var dato27 = $("#txt_torax").val();
    var dato28 = $("#txt_abdomen").val();
    var dato29 = $("#txt_extremidades").val();
    var dato30 = $("#txt_genitales").val();
    var dato31 = $("#txt_explo_esp").val();
    var dato32 = $("#txt_resultados_labgab").val();
    var dato33 = $("#txt_diagnosticos").val();
    var dato34 = $("#txt_pronostico").val();
    var dato35 = $("#txt_indicacion_terap").val();
    
    if(nombres.length==0 || dato1.length==0 || dato2.length==0 || dato3.length==0 || dato4.length==0 || 
        dato5.length==0 || dato6.length==0 || dato7.length==0 || dato8.length==0 || dato9.length==0 || dato10.length==0 || dato11.length==0 || 
        dato12.length==0 || dato13.length==0 || dato14.length==0 || dato15.length==0 || dato16.length==0 || dato17.length==0 || dato18.length==0 || 
        dato19.length==0 || dato20.length==0 || dato21.length==0 || dato22.length==0 || dato23.length==0 || dato24.length==0 || dato25.length==0 || 
        dato26.length==0 || dato27.length==0 || dato28.length==0 || dato29.length==0 || dato30.length==0 || dato31.length==0 || dato32.length==0 ||
        dato33.length==0 || dato34.length==0 || dato35.length==0){
        return Swal.fire("Mensaje de advertencia","Llene los campos vacios","warning");
    }

    $.ajax({
        "url":"../controlador/historial/controlador_historial_registro.php",
        type:'POST',
        data:{
            nombres:nombres,
            dato1:dato1,
            dato2:dato2,
            dato3:dato3,
            dato4:dato4,
            dato5:dato5,
            dato6:dato6,
            dato7:dato7,
            dato8:dato8,
            dato9:dato9,
            dato10:dato10,
            dato11:dato11,
            dato12:dato12,
            dato13:dato13,
            dato14:dato14,
            dato15:dato15,
            dato16:dato16,
            dato17:dato17,
            dato18:dato18,
            dato19:dato19,
            dato20:dato20,
            dato21:dato21,
            dato22:dato22,
            dato23:dato23,
            dato24:dato24,
            dato25:dato25,
            dato26:dato26,
            dato27:dato27,
            dato28:dato28,
            dato29:dato29,
            dato30:dato30,
            dato31:dato31,
            dato32:dato32,
            dato33:dato33,
            dato34:dato34,
            dato35:dato35
        }
    }).done(function(resp){
        //alert(resp);
        if(resp>0){
                $("#modal_registro").modal('hide');
                Swal.fire("Mensaje De Confirmacion","Datos guardados exitosamente, historial registrado","success")
                .then ( ( value ) =>  {
                    LimpiarCampos();
                    tablehistorial.ajax.reload();
                }); 
        }else{
            Swal.fire("Mensaje De Error","Lo sentimos, no se pudo completar el registro","error");
        }
    })
}

function Modificar_Historial(){
    //Datos del paciente
    var id = $("#txt_idhistorial").val();
    //var nombres = $("#cbm_nombre_editar").val();
    var dato1 = $("#txt_ant_heredofami_editar").val();
    var dato2 = $("#txt_ant_personopatolo_editar").val();
    var dato3 = $("#txt_ant_gineobs_editar").val();
    var dato4 = $("#txt_ant_persopatolo_editar").val();
    var dato5 = $("#txt_pade_actual_editar").val();
    var dato6 = $("#txt_sintomas_generales_editar").val();
    var dato7 = $("#txt_organos_sentidos_editar").val();
    var dato8 = $("#txt_aparato_cardiovascular_editar").val();
    var dato9 = $("#txt_aparato_respiratorio_editar").val();
    var dato10 = $("#txt_aparato_genitour_editar").val();
    var dato11 = $("#txt_aparato_digestivo_editar").val();
    var dato12 = $("#txt_sistema_endocrino_editar").val();
    var dato13 = $("#txt_sistema_nervioso_editar").val();
    var dato14 = $("#txt_hemolinfatico_editar").val();
    var dato15 = $("#txt_sistema_ostemus_editar").val();
    var dato16 = $("#txt_interro_esp_editar").val();
    var dato17 = $("#txt_habitus_exterior_editar").val();
    var dato18 = $("#txt_frecu_cardi_editar").val();
    var dato19 = $("#txt_tension_arterial_editar").val();
    var dato20 = $("#txt_frecu_respiratoria_editar").val();
    var dato21 = $("#txt_temperatura_editar").val();
    var dato22 = $("#txt_peso_editar").val();
    var dato23 = $("#txt_talla_editar").val();
    var dato24 = $("#txt_icm_editar").val();
    var dato25 = $("#txt_cabeza_editar").val();
    var dato26 = $("#txt_cuello_editar").val();
    var dato27 = $("#txt_torax_editar").val();
    var dato28 = $("#txt_abdomen_editar").val();
    var dato29 = $("#txt_extremidades_editar").val();
    var dato30 = $("#txt_genitales_editar").val();
    var dato31 = $("#txt_explo_esp_editar").val();
    var dato32 = $("#txt_resultados_labgab_editar").val();
    var dato33 = $("#txt_diagnosticos_editar").val();
    var dato34 = $("#txt_pronostico_editar").val();
    var dato35 = $("#txt_indicacion_terap_editar").val();
    
    if( dato1.length==0 || dato2.length==0 || dato3.length==0 || dato4.length==0 || 
        dato5.length==0 || dato6.length==0 || dato7.length==0 || dato8.length==0 || dato9.length==0 || dato10.length==0 || dato11.length==0 || 
        dato12.length==0 || dato13.length==0 || dato14.length==0 || dato15.length==0 || dato16.length==0 || dato17.length==0 || dato18.length==0 || 
        dato19.length==0 || dato20.length==0 || dato21.length==0 || dato22.length==0 || dato23.length==0 || dato24.length==0 || dato25.length==0 || 
        dato26.length==0 || dato27.length==0 || dato28.length==0 || dato29.length==0 || dato30.length==0 || dato31.length==0 || dato32.length==0 ||
        dato33.length==0 || dato34.length==0 || dato35.length==0){
        return Swal.fire("Mensaje de advertencia","Llene los campos vacios","warning");
    }

    $.ajax({
        "url":"../controlador/historial/controlador_historial_modificar.php",
        type:'POST',
        data:{
            id:id,
            dato1:dato1,
            dato2:dato2,
            dato3:dato3,
            dato4:dato4,
            dato5:dato5,
            dato6:dato6,
            dato7:dato7,
            dato8:dato8,
            dato9:dato9,
            dato10:dato10,
            dato11:dato11,
            dato12:dato12,
            dato13:dato13,
            dato14:dato14,
            dato15:dato15,
            dato16:dato16,
            dato17:dato17,
            dato18:dato18,
            dato19:dato19,
            dato20:dato20,
            dato21:dato21,
            dato22:dato22,
            dato23:dato23,
            dato24:dato24,
            dato25:dato25,
            dato26:dato26,
            dato27:dato27,
            dato28:dato28,
            dato29:dato29,
            dato30:dato30,
            dato31:dato31,
            dato32:dato32,
            dato33:dato33,
            dato34:dato34,
            dato35:dato35
        }
    }).done(function(resp){
        //alert(resp);
        if(resp>0){
                $("#modal_editar").modal('hide');
                listar_historial();
                Swal.fire("Mensaje De Confirmacion","Datos modificados exitosamente","success")
                .then ( ( value ) =>  {
                    //LimpiarCampos();
                    tablehistorial.ajax.reload();
                }); 
        }else{
            Swal.fire("Mensaje De Error","Lo sentimos, no se pudo modificar los datos","error");
        }
    })
}

function LimpiarCampos(){
    $("#txt_ant_heredofami").val("");
    $("#txt_ant_personopatolo").val("");
    $("#txt_ant_gineobs").val("");
    $("#txt_ant_persopatolo").val("");
    $("#txt_pade_actual").val("");
    $("#txt_sintomas_generales").val("");
    $("#txt_organos_sentidos").val("");
    $("#txt_aparato_cardiovascular").val("");
    $("#txt_aparato_respiratorio").val("");
    $("#txt_aparato_genitour").val("");
    $("#txt_aparato_digestivo").val("");
    $("#txt_sistema_endocrino").val("");
    $("#txt_sistema_nervioso").val("");
    $("#txt_hemolinfatico").val("");
    $("#txt_sistema_ostemus").val("");
    $("#txt_interro_esp").val("");
    $("#txt_habitus_exterior").val("");
    $("#txt_frecu_cardi").val("");
    $("#txt_tension_arterial").val("");
    $("#txt_frecu_respiratoria").val("");
    $("#txt_temperatura").val("");
    $("#txt_peso").val("");
    $("#txt_talla").val("");
    $("#txt_icm").val("");
    $("#txt_cabeza").val("");
    $("#txt_cuello").val("");
    $("#txt_torax").val("");
    $("#txt_abdomen").val("");
    $("#txt_extremidades").val("");
    $("#txt_genitales").val("");
    $("#txt_explo_esp").val("");
    $("#txt_resultados_labgab").val("");
    $("#txt_diagnosticos").val("");
    $("#txt_pronostico").val("");
    $("#txt_indicacion_terap").val("");
}

$(function(){
    $('#txt_imc').on('change', calculoImc);
    $('#txt_imc_editar').on('change', calculoImc);
});

function calculoImc(){
    var peso = document.getElementById("txt_peso").value;
    var talla = document.getElementById("txt_talla").value;
    var pesoEditar = document.getElementById("txt_peso_editar").value;
    var tallaEditar = document.getElementById("txt_talla_editar").value;
  
    document.getElementById("txt_icm").value = (peso / Math.pow(talla,2)).toFixed(2);
    document.getElementById("txt_icm_editar").value = (pesoEditar / Math.pow(tallaEditar,2)).toFixed(2);
  }