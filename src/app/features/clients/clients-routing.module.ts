import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { CreateClientComponent } from './pages/create-client/create-client.component';

const routes: Routes = [
  { path: '', component: ClientsListComponent }, 
  { path: 'create', component: CreateClientComponent }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
