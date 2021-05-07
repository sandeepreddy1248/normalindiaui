import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureComponent } from '../feature/feature.component'

const routes: Routes = [
    {
        path: '',
        component: FeatureComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./home/home.module').then(
                        (m) => m.HomeModule
                    ),
            },
            {
                path: 'cases',
                loadChildren: () =>
                    import('./cases/cases.module').then(
                        (m) => m.CasesModule
                    ),
            },
            {
                path: 'vaccine',
                loadChildren: () =>
                    import('./vaccine/vaccine.module').then(
                        (m) => m.VaccineModule
                    ),
            },
            {
                path: 'plasma',
                loadChildren: () =>
                    import('./plasma/plasma.module').then(
                        (m) => m.PlasmaModule
                    ),
            },
            {
                path: 'oxygen',
                loadChildren: () =>
                    import('./oxygen/oxygen.module').then(
                        (m) => m.OxygenModule
                    ),
            },
            {
                path: 'contactus',
                loadChildren: () =>
                    import('./contact-us/contact-us.module').then(
                        (m) => m.ContactUsModule
                    ),
            },
        ],

    },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }