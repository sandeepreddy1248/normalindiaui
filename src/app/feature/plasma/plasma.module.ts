import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlasmaRoutingModule } from './plasma-routing.module';
import { PlasmaComponent } from './plasma.component';


@NgModule({
  declarations: [PlasmaComponent],
  imports: [
    CommonModule,
    PlasmaRoutingModule
  ]
})
export class PlasmaModule { }
