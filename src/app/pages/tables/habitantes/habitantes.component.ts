import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';
import { HabitantesService } from '../../../shared/services/habitantes.service';
import { Habitante } from '../../../shared/models/habitante-model';
import { CiudadService } from '../../../shared/services/ciudad.service';
import { Ciudad } from '../../../shared/models/ciudad-model';

@Component({
  selector: 'ngx-habitantes',
  templateUrl: './habitantes.component.html',
  styleUrls: ['./habitantes.component.scss']
})
export class HabitantesComponent implements OnInit {

  private citys: Ciudad[];
  
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        addable: false,
        editable: false
      },
      cedula: {
        title: 'Cedula',
        type: 'number'
      },
      nombres: {
        title: 'Nombres',
        type: 'string'
      },
      apellidos: {
        title: 'Apellidos',
        type: 'string'
      },
      direccion: {
        title: 'Direccion',
        type: 'string'
      },
      telefono: {
        title: 'Telefono',
        type: 'number'
      },
      ciudad: {
        title: 'Ciudad',
        type: 'string',
        valuePrepareFunction: (value, row) => { 
          return this.citys.filter(ciudad =>ciudad.id == value).map(ciudad => ciudad.ciudad);
        },
        editor: {
					type: 'list',
					config: {
						selectText: 'Select',
						list: [],
					}
				},
				filter: {
					type: 'list',
					config: {
						selectText: 'Select',
						list: [],
					}
				}
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private readonly habitanteService: HabitantesService, private readonly ciudadService: CiudadService) {
    this.getCitys();
    this.getHabitantes();
  }


  ngOnInit(): void {
    
  }

  addRecord(event) {
    var habitante: Habitante;
    habitante = event.newData;
    this.habitanteService.SaveHabitant(habitante).subscribe(
      {
        next: (habitanteAdd: Habitante) => {
          this.getHabitantes();
          Swal.fire('Creado', 'Se ha creado con exito', 'success');
          event.confirm.resolve();
        },
        error: (err: HttpErrorResponse)=> {
          const { error } = err;
          Swal.fire('Error', 'Campos no validos', 'error')
        }
      }  
    ) 
  }

  updateRecord(event){
    var habitante: Habitante;
    habitante = event.newData;
    this.habitanteService.updateHabitante(habitante).subscribe(
      {
        next: (habitant: Habitante) => {
          this.getHabitantes();
          Swal.fire('Actualizado', 'Se ha actualizado con exito', 'success');
          event.confirm.resolve();
        },
        error: (err: HttpErrorResponse)=> {
          const { error } = err;
          Swal.fire('Error', 'Campos no validos', 'error')
        }
      } 
    )
  }

  getCitys(): void{
    this.ciudadService.getAllCitys().subscribe(
      {
        next: (citys: Ciudad[]) =>{
          this.citys = citys;
          for(const city of citys){
            this.settings.columns.ciudad.editor.config.list.push({ value: city.id, title: city.ciudad });
					  this.settings.columns.ciudad.filter.config.list.push({ value: city.id, title: city.ciudad });
					  this.settings = Object.assign({}, this.settings);            
          }
        },
        error: (err: HttpErrorResponse)=> {
          if(err.status == 404){
            Swal.fire('Error', 'No hay registros en esta tabla', 'error')
          }
        }
      }
    );
  }

  getHabitantes(): void{
    this.habitanteService.getAllHabitants().subscribe(
      {
        next: (habitant: Habitante[]) =>{
          console.log(habitant);
          this.source.load(habitant);
        },
        error: (err: HttpErrorResponse)=> {
          if(err.status == 404){
            Swal.fire('Registrar', 'No hay registros en esta tabla', 'error')
          }
        }
      }
    );
  }

  onDeleteConfirm(event): void {
    var habitante:Habitante;
    habitante = event.data;
    console.log(habitante);
    Swal.fire({
      title: 'Esta seguro?',
      text: "No se puede reversar esta respuesta!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.habitanteService.delete(habitante).subscribe(
          {
            next:() =>{
              Swal.fire(
                'Borrado!',
                'El resgitro se ha borrado.',
                'success'
              );
              this.getHabitantes();
            },
            error :(err: HttpErrorResponse) => {
              Swal.fire('Error', 'No se pudo borrar el registro', 'error')
            }
          }
        );
        
      }
    })
  }



}
