import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    TabsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TabsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
