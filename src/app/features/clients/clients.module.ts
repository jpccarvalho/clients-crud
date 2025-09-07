import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { ClientDeleteConfirmationModal } from './components/client-delete-confirmation-modal/client-delete-confirmation-modal.component';
import { UpdateClientComponent } from './pages/update-client/update-client.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ClientsListComponent,
    CreateClientComponent,
    ClientDeleteConfirmationModal,
    UpdateClientComponent,
  ],
  imports: [CommonModule, ClientsRoutingModule, SharedModule],
})
export class ClientsModule {}
