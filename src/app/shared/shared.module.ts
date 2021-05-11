import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FilterPipe } from './pipes/filter.pipe';
@NgModule({
  declarations: [FilterPipe],
  imports: [
    CommonModule,
    SharedRoutingModule,
    TabsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    TabsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    FilterPipe
  ]
})
export class SharedModule { }
