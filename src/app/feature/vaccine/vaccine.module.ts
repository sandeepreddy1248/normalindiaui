import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VaccineRoutingModule } from './vaccine-routing.module';
import { VaccineComponent } from './vaccine.component';
import { SharedModule } from './../../shared/shared.module';
import { VaccineInfoComponent } from './vaccine-info/vaccine-info.component';


@NgModule({
  declarations: [VaccineComponent, VaccineInfoComponent],
  imports: [
    CommonModule,
    VaccineRoutingModule,
    SharedModule
  ]
})
export class VaccineModule { }
