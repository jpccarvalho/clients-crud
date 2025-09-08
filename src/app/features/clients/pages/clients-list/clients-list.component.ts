import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models';
import { PersistenceMock } from '../../utils/persistence.mock';
import { MatDialog } from '@angular/material/dialog';
import { ClientDeleteConfirmationModal } from '../../components/client-delete-confirmation-modal/client-delete-confirmation-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients-list',
  standalone: false,
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
})
export class ClientsListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'email', 'cpf', 'phone', 'actions'];
  clients = signal<Client[]>([]);
  isLoading = signal<boolean>(true);
  private subscriptions = new Subscription();

  constructor(
    private clientsService: ClientsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientsService.getClients().subscribe((res) => {
      const persistedClients = PersistenceMock.getClients(res);
      this.clients.set(persistedClients);
      this.isLoading.set(false);
    });
  }

  openClientDeleteDialog(client: Client): void {
    const dialogRef = this.dialog.open(ClientDeleteConfirmationModal, {
      width: '600px',
      data: client,
    });
    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((result) => {
        if (!!result) {
          this.deleteClients(client.id);
        }
      })
    );
  }

  deleteClients(clientId: number) {
    this.isLoading.set(true);
    PersistenceMock.deleteClient(clientId);
    this.subscriptions.add(
      this.clientsService.deleteClient(clientId).subscribe({
        next: (res) => {
          this.clients.update((clients) =>
            clients.filter((client) => client.id !== clientId)
          );
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
