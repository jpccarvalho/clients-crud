import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { authGuard, guestGuard } from './core/guards';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    component: MainLayoutComponent,
    canActivate: [authGuard],
    path: 'clients',
    loadChildren: () =>
      import('./features/clients/clients.module').then((m) => m.ClientsModule),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'clients',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
