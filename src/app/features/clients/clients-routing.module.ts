import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { UpdateClientComponent } from './pages/update-client/update-client.component';

const routes: Routes = [
  { path: '', component: ClientsListComponent }, 
  { path: 'create', component: CreateClientComponent }, 
  { path: 'update/:id', component: UpdateClientComponent }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
