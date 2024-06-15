import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-service.guard';
import { MainPageGuard } from './services/main-page-guard';

const routes: Routes = [
  {
    path: '',
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
        canActivate: [MainPageGuard],
      },
      {
        path: 'vacancies',
        loadChildren: () =>
          import('./modules/vacancies/vacancies.module').then(
            (m) => m.VacanciesModule
          ),
        data: {
          breadcrumb: 'vacancies',
        },
        canActivate: [AuthGuard],
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
