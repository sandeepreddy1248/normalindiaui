import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VaccineInfoComponent } from './vaccine-info/vaccine-info.component';
import { VaccineComponent } from './vaccine.component';

const routes: Routes = [
  {
    path: "",
    component: VaccineComponent
  },
  {
    path: "vaccineinfo",
    component: VaccineInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccineRoutingModule { }
