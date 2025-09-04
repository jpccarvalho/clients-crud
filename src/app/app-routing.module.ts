import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', redirectTo: 'clients', pathMatch: 'full' },
  {
    path: 'clients',
    loadChildren: () =>
      import('./features/clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: '**',
    redirectTo: 'clients'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
