import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaseComponent } from './case.component';
import { StateCasesComponent } from './state-cases/state-cases.component';

const routes: Routes = [{
  path: '',
  component: CaseComponent
},
{
  path: "state/:",
  component: StateCasesComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule { }
