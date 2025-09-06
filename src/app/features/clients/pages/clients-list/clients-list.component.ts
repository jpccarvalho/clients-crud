import { Component, OnInit, signal } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models';
import { PersistenceMock } from '../../utils/persistence.mock';

@Component({
  selector: 'app-clients-list',
  standalone: false,
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'cpf', 'phone', 'actions'];
  clients = signal<Client[]>([]);
  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientsService.getClients().subscribe((res) => {
      const persistedClients = PersistenceMock.getClients(res);
      this.clients.set(persistedClients);
    });
  }
  
  deleteClients(clientId: number) {
    PersistenceMock.deleteClient(clientId);
    this.clientsService.deleteClient(clientId).subscribe((res) => {
      this.clients.update((clients) =>
        clients.filter((client) => client.id !== clientId)
      );
    });
  }
}
