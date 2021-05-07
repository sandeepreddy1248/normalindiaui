import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './block/layout/layout/layout.component';


const routes: Routes = [
  // {
  //   path: "",
  //   pathMatch: "full",
  //   component: LayoutComponent,
  // },
  {
    path: '',
    component: LayoutComponent,
    children: [
      // {
      //   path: RedirectRoutes.DASHBOARD,
      //   component: DashboardComponent,
      //   canActivate: [AuthGuard],
      // },

      {
        path: '',
        loadChildren: () =>
          import('./feature/feature.module').then((m) => m.FeatureModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
