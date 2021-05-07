import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OxygenRoutingModule } from './oxygen-routing.module';
import { OxygenComponent } from './oxygen.component';


@NgModule({
  declarations: [OxygenComponent],
  imports: [
    CommonModule,
    OxygenRoutingModule
  ]
})
export class OxygenModule { }
