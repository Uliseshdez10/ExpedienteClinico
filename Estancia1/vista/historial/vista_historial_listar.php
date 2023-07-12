<script type="text/javascript" src="../js/historial.js?rev=<?php echo time();?>"></script>
<div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title">HISTORIAL</h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
            <div class="form-group">
                <div class="col-lg-10">
                    <div class="input-group">
                        <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <button class="btn btn-danger" style="width:100%" onclick="AbrirModalRegistro()"><i class="glyphicon glyphicon-plus"></i>Nuevo Registro</button>
                </div>
            </div>
            <table id="tabla_historial" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Folio</th>
                        <th>Curp</th>
                        <th>Paciente</th>
                        <th>Domicilio</th>
                        <th>Sexo</th>
                        <th>Celular</th>
                        <th>Acci&oacute;n</th>
                        <th>Imprimir</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Folio</th>
                        <th>Curp</th>
                        <th>Paciente</th>
                        <th>Domicilio</th>
                        <th>Sexo</th>
                        <th>Celular</th>
                        <th>Acci&oacute;n</th>
                        <th>Imprimir</th>
                    </tr>
                </tfoot>
            </table>
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>

<div class="modal fade" id="modal_registro" role="dialog">
        <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title"><b>Registro De Historial Clinico</b></h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-12" style="text-aling:center">
                        <b>DATOS DEL PACIENTE</b><br><br>
                    </div>
                    <div class="col-lg-12">
                        <label for="">Nombre - Curp</label>
                        <select class="js-example-basic-single" name="state" id="cbm_nombre" style="width:100%;"></select><br><br>
                    </div>
                    <div class="col-lg-12" style="text-aling:center">
                        <b>INTERROGATORIO POR APARATOS Y SISTEMAS</b><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Antecedentes heredofamiliares</label>
                        <input type="text" class="form-control" id="txt_ant_heredofami" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Antecedentes personales no patologicos</label>
                        <input type="text" class="form-control" id="txt_ant_personopatolo" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Antecedentes gineco-obstetricos</label>
                        <input type="text" class="form-control" id="txt_ant_gineobs" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Antecedentes personales no patologicos</label>
                        <input type="text" class="form-control" id="txt_ant_persopatolo" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Padecimiento actual</label>
                        <input type="text" class="form-control" id="txt_pade_actual" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Sintomas generales</label>
                        <input type="text" class="form-control" id="txt_sintomas_generales" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Organos de los sentidos</label>
                        <input type="text" class="form-control" id="txt_organos_sentidos" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Aparato cardiovascular</label>
                        <input type="text" class="form-control" id="txt_aparato_cardiovascular" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Aparato respiratorio</label>
                        <input type="text" class="form-control" id="txt_aparato_respiratorio" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Aparato genitourinario</label>
                        <input type="text" class="form-control" id="txt_aparato_genitour" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Aparato digestivo</label>
                        <input type="text" class="form-control" id="txt_aparato_digestivo" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Sistema endocrino</label>
                        <input type="text" class="form-control" id="txt_sistema_endocrino" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Sistema nervioso</label>
                        <input type="text" class="form-control" id="txt_sistema_nervioso" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Hemolinfatico</label>
                        <input type="text" class="form-control" id="txt_hemolinfatico" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Sistema osteomuscular</label>
                        <input type="text" class="form-control" id="txt_sistema_ostemus" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Interrogatorios especiales</label>
                        <input type="text" class="form-control" id="txt_interro_esp" placeholder="Ingresar datos..." maxlength="50"><br><br>
                    </div>
                    <div class="col-lg-12" style="text-aling:center">
                        <b>EXPLORACION FISICA</b><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Habitus exterior</label>
                        <input type="text" class="form-control" id="txt_habitus_exterior" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-12" style="text-aling:center">
                        <b>Signos vitales:</b><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Frecuencia cardiaca</label>
                        <input type="text" class="form-control" id="txt_frecu_cardi" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Tensión arterial</label>
                        <input type="text" class="form-control" id="txt_tension_arterial" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Frecuencia respiratoria</label>
                        <input type="text" class="form-control" id="txt_frecu_respiratoria" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Temperatura</label>
                        <input type="text" class="form-control" id="txt_temperatura" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Peso(kg)</label>
                        <input type="text" class="form-control" id="txt_peso" placeholder="Ingresar datos..." maxlength="50" onkeypress="calculoImc()">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Talla(m)</label>
                        <input type="text" class="form-control" id="txt_talla" placeholder="Ingresar datos..." maxlength="50" onkeypress="calculoImc()">
                    </div>
                    <div class="col-lg-4">
                        <label for="">IMC</label>
                        <input type="text" class="form-control" id="txt_icm" placeholder="Ingresar datos..." maxlength="50" readonly="">
                    </div>
                    <div class="col-lg-12" style="text-aling:center">
                        <b>EXPLORACION REGIONAL</b><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Cabeza</label>
                        <input type="text" class="form-control" id="txt_cabeza" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Cuello</label>
                        <input type="text" class="form-control" id="txt_cuello" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Tórax</label>
                        <input type="text" class="form-control" id="txt_torax" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Abdomen</label>
                        <input type="text" class="form-control" id="txt_abdomen" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Extremidades</label>
                        <input type="text" class="form-control" id="txt_extremidades" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Genitales</label>
                        <input type="text" class="form-control" id="txt_genitales" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Exploraciones especiales</label>
                        <input type="text" class="form-control" id="txt_explo_esp" placeholder="Ingresar datos..." maxlength="50"><br><br>   
                    </div><br><br>
                    <div class="col-lg-12" style="text-aling:center">
                        <b>DIAGNOSTICOS, PRONOSTICOS Y TERAPEUTICA</b><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Resultados de laboratorio y gabinete</label>
                        <input type="text" class="form-control" id="txt_resultados_labgab" placeholder="Ingresar datos..." maxlength="50">        
                    </div> 
                    <div class="col-lg-4">
                        <label for="">Diagnósticos ó problemas clínicos</label>
                        <input type="text" class="form-control" id="txt_diagnosticos" placeholder="Ingresar datos..." maxlength="50">        
                    </div> 
                    <div class="col-lg-4">
                        <label for="">Pronósticos</label>
                        <input type="text" class="form-control" id="txt_pronostico" placeholder="Ingresar datos..." maxlength="50"><br>        
                    </div> 
                    <div class="col-lg-4">
                        <label for="">Indicación terapeutica</label>
                        <input type="text" class="form-control" id="txt_indicacion_terap" placeholder="Ingresar datos..." maxlength="50">        
                    </div> 
                    <div class="col-lg-4">
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Registrar_Historial()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
        </div>
</div>   

<div class="modal fade" id="modal_editar" role="dialog">
        <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title"><b>Registro De Historial Clinico</b></h4>
            </div>
            <div class="modal-body">
                <div class="row">
                <input type="text" id="txt_idhistorial" hidden>
                    <div class="col-lg-12" style="text-aling:center">
                        <!--<b>DATOS DEL PACIENTE</b><br><br>
                    </div>
                    <div class="col-lg-12">
                        <label for="">Nombre - Curp</label>
                        <select class="js-example-basic-single" name="state" id="cbm_nombre_editar" style="width:100%;"></select><br><br>
                    </div>-->
                    <div class="col-lg-12" style="text-aling:center">
                        <b>INTERROGATORIO POR APARATOS Y SISTEMAS</b><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Antecedentes heredofamiliares</label>
                        <input type="text" class="form-control" id="txt_ant_heredofami_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Antecedentes personales no patologicos</label>
                        <input type="text" class="form-control" id="txt_ant_personopatolo_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Antecedentes gineco-obstetricos</label>
                        <input type="text" class="form-control" id="txt_ant_gineobs_editar" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Antecedentes personales no patologicos</label>
                        <input type="text" class="form-control" id="txt_ant_persopatolo_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Padecimiento actual</label>
                        <input type="text" class="form-control" id="txt_pade_actual_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Sintomas generales</label>
                        <input type="text" class="form-control" id="txt_sintomas_generales_editar" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Organos de los sentidos</label>
                        <input type="text" class="form-control" id="txt_organos_sentidos_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Aparato cardiovascular</label>
                        <input type="text" class="form-control" id="txt_aparato_cardiovascular_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Aparato respiratorio</label>
                        <input type="text" class="form-control" id="txt_aparato_respiratorio_editar" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Aparato genitourinario</label>
                        <input type="text" class="form-control" id="txt_aparato_genitour_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Aparato digestivo</label>
                        <input type="text" class="form-control" id="txt_aparato_digestivo_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Sistema endocrino</label>
                        <input type="text" class="form-control" id="txt_sistema_endocrino_editar" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Sistema nervioso</label>
                        <input type="text" class="form-control" id="txt_sistema_nervioso_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Hemolinfatico</label>
                        <input type="text" class="form-control" id="txt_hemolinfatico_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Sistema osteomuscular</label>
                        <input type="text" class="form-control" id="txt_sistema_ostemus_editar" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Interrogatorios especiales</label>
                        <input type="text" class="form-control" id="txt_interro_esp_editar" placeholder="Ingresar datos..." maxlength="50"><br><br>
                    </div>
                    <div class="col-lg-12" style="text-aling:center">
                        <b>EXPLORACION FISICA</b><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Habitus exterior</label>
                        <input type="text" class="form-control" id="txt_habitus_exterior_editar" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-12" style="text-aling:center">
                        <b>Signos vitales:</b><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Frecuencia cardiaca</label>
                        <input type="text" class="form-control" id="txt_frecu_cardi_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Tensión arterial</label>
                        <input type="text" class="form-control" id="txt_tension_arterial_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Frecuencia respiratoria</label>
                        <input type="text" class="form-control" id="txt_frecu_respiratoria_editar" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Temperatura</label>
                        <input type="text" class="form-control" id="txt_temperatura_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Peso</label>
                        <input type="text" class="form-control" id="txt_peso_editar" placeholder="Ingresar datos..." maxlength="50" onkeypress="calculoImc()">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Talla</label>
                        <input type="text" class="form-control" id="txt_talla_editar" placeholder="Ingresar datos..." maxlength="50" onkeypress="calculoImc()">
                    </div>
                    <div class="col-lg-4">
                        <label for="">IMC</label>
                        <input type="text" class="form-control" id="txt_icm_editar" placeholder="Ingresar datos..." maxlength="50" readonly=""><br><br>
                    </div>
                    <div class="col-lg-12" style="text-aling:center">
                        <b>EXPLORACION REGIONAL</b><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Cabeza</label>
                        <input type="text" class="form-control" id="txt_cabeza_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Cuello</label>
                        <input type="text" class="form-control" id="txt_cuello_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Tórax</label>
                        <input type="text" class="form-control" id="txt_torax_editar" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Abdomen</label>
                        <input type="text" class="form-control" id="txt_abdomen_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Extremidades</label>
                        <input type="text" class="form-control" id="txt_extremidades_editar" placeholder="Ingresar datos..." maxlength="50">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Genitales</label>
                        <input type="text" class="form-control" id="txt_genitales_editar" placeholder="Ingresar datos..." maxlength="50"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Exploraciones especiales</label>
                        <input type="text" class="form-control" id="txt_explo_esp_editar" placeholder="Ingresar datos..." maxlength="50"><br><br>   
                    </div><br><br>
                    <div class="col-lg-12" style="text-aling:center">
                        <b>DIAGNOSTICOS, PRONOSTICOS Y TERAPEUTICA</b><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Resultados de laboratorio y gabinete</label>
                        <input type="text" class="form-control" id="txt_resultados_labgab_editar" placeholder="Ingresar datos..." maxlength="50">        
                    </div> 
                    <div class="col-lg-4">
                        <label for="">Diagnósticos ó problemas clínicos</label>
                        <input type="text" class="form-control" id="txt_diagnosticos_editar" placeholder="Ingresar datos..." maxlength="50">        
                    </div> 
                    <div class="col-lg-4">
                        <label for="">Pronósticos</label>
                        <input type="text" class="form-control" id="txt_pronostico_editar" placeholder="Ingresar datos..." maxlength="50"><br>        
                    </div> 
                    <div class="col-lg-4">
                        <label for="">Indicación terapeutica</label>
                        <input type="text" class="form-control" id="txt_indicacion_terap_editar" placeholder="Ingresar datos..." maxlength="50">        
                    </div> 
                    <div class="col-lg-4">
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Modificar_Historial()"><i class="fa fa-check"><b>&nbsp;Editar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
        </div>
</div>  
 
<script>

$(document).ready(function() {
    $('.js-example-basic-single').select2();
    $("#modal_registro").on('shown.bs.modal',function(){
        $("#txt_nombre").focus();  
    })
    listar_historial();
    listar_paciente_combo_historial();
} );

$('.box').boxWinget({
    animationSpeed : 500,
    collapseTrigger: '[data-widget="collapse"]',
    removeTrigger  : '[data-widget="remove"]',
    collaspseIcon  : 'fa-minus',
    expandIcon     : 'fa-plus',
    removeIcon     : 'fa-times'
})
</script>