<script type="text/javascript" src="../js/paciente.js?rev=<?php echo time();?>"></script>
<div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title">PACIENTES</h3>

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
            <table id="tabla_paciente" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Folio</th>
                        <th>Curp</th>
                        <th>Paciente</th>
                        <th>Domicilio</th>
                        <th>Sexo</th>
                        <th>Celular</th>
                        <th>Estatus</th>
                        <th>Acci&oacute;n</th>
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
                        <th>Estatus</th>
                        <th>Acci&oacute;n</th>
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
            <h4 class="modal-title"><b>Registro De Paciente</b></h4>
            </div>
            <div class="modal-body">
                <div class="row">
                <div class="col-lg-4">
                        <label for="">Folio</label>
                        <input type="text" class="form-control" id="txt_folio" placeholder="Ingresar numero de documento...">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Nombre</label>
                        <input type="text" class="form-control" id="txt_nombre" placeholder="Ingresar nombre..." maxlength="50" onkeypress="return soloLetras(event)">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Fecha de nacimiento</label>
                        <input type="text" class="form-control" name="txt_fenac" id="txt_fenac" value="" ><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Edad</label>
                        <input type="text" class="form-control" name="txt_edad" id="txt_edad" value="" readonly="">
                    </div>
                    <div class="col-lg-4">
                    <label for="">Sexo</label>
                        <select class="js-example-basic-single" name="state" id="cbm_sexo" style="width:100%;">
                            <option value="M">MASCULINO</option>
                            <option value="F">FEMENINO</option>
                        </select><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Religion</label>
                        <input type="text" class="form-control" id="txt_relig" placeholder="Ingresar religion..." maxlength="20" onkeypress="return soloLetras(event)"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Domicilio</label>
                        <input type="text" class="form-control" id="txt_domi" placeholder="Ingresar domicilio...">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Telefono</label>
                        <input type="text" class="form-control" id="txt_tel" placeholder="Ingresar telefono..." onkeypress="return soloNumeros(event)">
                    </div>
                    <div class="col-lg-4">
                    <label for="">Estado civil</label>
                        <select class="js-example-basic-single" name="state" id="cbm_estciv" style="width:100%;"><br>
                            <option value="CASADO">CASADO</option>
                            <option value="SOLTERO">SOLTERO</option>
                        </select><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Escolaridad</label>
                        <input type="text" class="form-control" id="txt_esco" placeholder="Ingresar escolaridad...">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Ocupacion</label>
                        <input type="text" class="form-control" id="txt_ocup" placeholder="Ingresar ocupacion..." onkeypress="return soloLetras(event)">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Lugar de nacimiento</label>
                        <input type="text" class="form-control" id="txt_lunac" placeholder="Ingresar lugar de nacimiento..." onkeypress="return soloLetras(event)"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Residencia actual</label>
                        <input type="text" class="form-control" id="txt_resiact" placeholder="Ingresar residencia actual..." onkeypress="return soloLetras(event)">
                    </div>
                    <div class="col-lg-4">
                    <label for="">Derecho habiente</label>
                        <select class="js-example-basic-single" name="state" id="cbm_da" style="width:100%;">
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Curp</label>
                        <input type="text" class="form-control" id="txt_curp" placeholder="Ingresar Curp..."><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Nivel economico</label>
                        <input type="text" class="form-control" id="txt_niveco" placeholder="Ingresar nivel economico..." onkeypress="return soloLetras(event)">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Grupo etnico</label>
                        <input type="text" class="form-control" id="txt_grupet" placeholder="Ingresar grupo etnico..." onkeypress="return soloLetras(event)">
                    </div>
                    <div class="col-lg-4">
                    </div>
                    
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Registrar_Paciente()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
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
            <h4 class="modal-title"><b>Editar Paciente</b></h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <input type="text" id="txt_idpaciente" hidden>
                <div class="col-lg-4">
                        <label for="">Folio</label>
                        <input type="text" id="txt_folio_actual_editar" placeholder="Ingresar numero de documento..." hidden>
                        <input type="text" class="form-control" id="txt_folio_nuevo_editar" placeholder="Ingresar numero de documento...">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Nombre</label>
                        <input type="text" class="form-control" id="txt_nombre_editar" placeholder="Ingresar nombre..." maxlength="50" onkeypress="return soloLetras(event)">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Fecha de nacimiento</label>
                        <input type="date" class="form-control" name="txt_fenac_editar" id="txt_fenac_editar" value="" min="1901-01-01" max="3001-01-01"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Edad</label>
                        <input type="text" class="form-control" name="txt_edad_editar" id="txt_edad_editar" value="" readonly="">
                    </div>
                    <div class="col-lg-4">
                    <label for="">Sexo</label>
                        <select class="js-example-basic-single" name="state" id="cbm_sexo_editar" style="width:100%;">
                            <option value="M">MASCULINO</option>
                            <option value="F">FEMENINO</option>
                        </select><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Religion</label>
                        <input type="text" class="form-control" id="txt_relig_editar" placeholder="Ingresar religion..." maxlength="20" onkeypress="return soloLetras(event)"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Domicilio</label>
                        <input type="text" class="form-control" id="txt_domi_editar" placeholder="Ingresar domicilio...">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Telefono</label>
                        <input type="text" class="form-control" id="txt_tel_editar" placeholder="Ingresar telefono..." onkeypress="return soloNumeros(event)">
                    </div>
                    <div class="col-lg-4">
                    <label for="">Estado civil</label>
                        <select class="js-example-basic-single" name="state_editar" id="cbm_estciv_editar" style="width:100%;"><br>
                            <option value="CASADO">CASADO</option>
                            <option value="SOLTERO">SOLTERO</option>
                        </select><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Escolaridad</label>
                        <input type="text" class="form-control" id="txt_esco_editar" placeholder="Ingresar escolaridad...">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Ocupacion</label>
                        <input type="text" class="form-control" id="txt_ocup_editar" placeholder="Ingresar ocupacion..." onkeypress="return soloLetras(event)">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Lugar de nacimiento</label>
                        <input type="text" class="form-control" id="txt_lunac_editar" placeholder="Ingresar lugar de nacimiento..." onkeypress="return soloLetras(event)"><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Residencia actual</label>
                        <input type="text" class="form-control" id="txt_resiact_editar" placeholder="Ingresar residencia actual..." onkeypress="return soloLetras(event)">
                    </div>
                    <div class="col-lg-4">
                    <label for="">Derecho habiente</label>
                        <select class="js-example-basic-single" name="state" id="cbm_da_editar" style="width:100%;">
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select><br><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Curp</label>
                        <input type="text" class="form-control" id="txt_curp_editar" placeholder="Ingresar Curp..."><br>
                    </div>
                    <div class="col-lg-4">
                        <label for="">Nivel economico</label>
                        <input type="text" class="form-control" id="txt_niveco_editar" placeholder="Ingresar nivel economico..." onkeypress="return soloLetras(event)">
                    </div>
                    <div class="col-lg-4">
                        <label for="">Grupo etnico</label>
                        <input type="text" class="form-control" id="txt_grupet_editar" placeholder="Ingresar grupo etnico..." onkeypress="return soloLetras(event)">
                    </div>
                    <div class="col-lg-4">
                    <label for="">Estatus</label>
                        <select class="js-example-basic-single" name="state" id="cbm_estatus_editar" style="width:100%;">
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                        </select><br><br>
                    </div>
                    <div class="col-lg-4">
                    </div>
                    
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Modificar_Paciente()"><i class="fa fa-check"><b>&nbsp;Editar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
        </div>
</div>    

<script>

$(document).ready(function() {
    listar_paciente();
    $('.js-example-basic-single').select2();
    $("#modal_registro").on('shown.bs.modal',function(){
        $("#txt_folio").focus();  
    })
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
