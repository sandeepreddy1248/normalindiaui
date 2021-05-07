import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasesRoutingModule } from './cases-routing.module';
import { CaseComponent } from './case.component';
import { StateCasesComponent } from './state-cases/state-cases.component';


@NgModule({
  declarations: [CaseComponent, StateCasesComponent],
  imports: [
    CommonModule,
    CasesRoutingModule
  ]
})
export class CasesModule { }
