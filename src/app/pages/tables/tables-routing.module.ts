import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
import { CiudadesComponent } from './ciudades/ciudades.component';
import { HabitantesComponent } from './habitantes/habitantes.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'ciudades',
      component: CiudadesComponent,
    },
    {
      path: 'habitantes',
      component: HabitantesComponent,
    },
    
  { path: '', redirectTo: 'ciudades', pathMatch: 'full' }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  TreeGridComponent,
];
