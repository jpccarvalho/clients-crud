import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './pages/clients-list/clients-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientDeleteConfirmationModal } from './components/client-delete-confirmation-modal/client-delete-confirmation-modal.component';

@NgModule({
  declarations: [
    ClientsListComponent,
    CreateClientComponent,
    ClientDeleteConfirmationModal,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
  ],
})
export class ClientsModule {}
