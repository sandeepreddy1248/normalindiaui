import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    TabsModule
  ],
  exports: [
    TabsModule
  ]
})
export class SharedModule { }
