import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultViewComponent } from './layout/default-view/default-view.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'main-page',
        pathMatch: 'full',
      },
      {
        path: 'main-page',
        loadChildren: () =>
          import('./modules/main-page/main-page.module').then(
            (m) => m.MainPageModule
          ),
        data: {
          breadcrumb: 'main-page',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      // @ts-ignore
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
