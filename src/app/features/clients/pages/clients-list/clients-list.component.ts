import { Component, OnInit, signal } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models';

@Component({
  selector: 'app-clients-list',
  standalone: false,
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = [ 'name', 'email', 'cpf', 'phone', 'actions'];
  clients = signal<Client[]>([]);
  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientsService.getClients().subscribe((res) => {
      this.clients.set(res);
    });
  }
  deleteClients(id: number) {
    this.clientsService.deleteClient(id).subscribe((res) => {
      this.clients.update((clients) =>
        clients.filter((client) => client.id !== id)
      );
    });
  }
}
