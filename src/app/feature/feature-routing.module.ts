import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeatureComponent} from '../feature/feature.component'

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
        ],

    },
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule { }