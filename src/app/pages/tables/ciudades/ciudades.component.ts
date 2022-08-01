import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';
import { Ciudad } from '../../../shared/models/ciudad-model';
import { CiudadService } from '../../../shared/services/ciudad.service';

@Component({
  selector: 'ngx-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.scss']
})
export class CiudadesComponent implements OnInit {

  
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
      ciudad: {
        title: 'Ciudad',
        type: 'string'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private readonly ciudadService: CiudadService) {
    this.getCitys();
  }


  ngOnInit(): void {
    
  }

  addRecord(event) {
    var ciudad: Ciudad;
    ciudad = event.newData;
    this.ciudadService.saveCity(ciudad).subscribe(
      {
        next: (city: Ciudad) => {
          this.getCitys();
          Swal.fire('Creado', 'Se ha creado con exito', 'success');
          event.confirm.resolve();
        },
        error: (err: HttpErrorResponse)=> {
          const { error } = err;
          Swal.fire('Error', 'Llena todos los campos', 'error')
        }
      }  
    ) 
  }

  updateRecord(event){
    var ciudad: Ciudad;
    ciudad = event.newData;
    this.ciudadService.updateCity(ciudad).subscribe(
      {
        next: (city: Ciudad) => {
          this.getCitys();
          Swal.fire('Actualizado', 'Se ha actualizado con exito', 'success');
          event.confirm.resolve();
        },
        error: (err: HttpErrorResponse)=> {
          const { error } = err;
          Swal.fire('Error', 'Llena todos los campos', 'error')
        }
      } 
    )
  }

  getCitys(): void{
    this.ciudadService.getAllCitys().subscribe(
      {
        next: (citys: Ciudad[]) =>{
          console.log(citys);
          this.source.load(citys);
        },
        error: (err: HttpErrorResponse)=> {
          if(err.status == 404){
            Swal.fire('Error', 'No hay registros en esta tabla', 'error')
          }
        }
      }
    );
  }

  onDeleteConfirm(event): void {
    var ciudad: Ciudad;
    ciudad = event.data;
    console.log(ciudad);
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
        this.ciudadService.delete(ciudad).subscribe(
          {
            next:() =>{
              Swal.fire(
                'Borrado!',
                'El resgitro se ha borrado.',
                'success'
              );
              this.getCitys();
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
