import { TestBed } from '@angular/core/testing';

import { ClientsService } from './clients.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Client } from '../models';

describe('ClientsService', () => {
  let service: ClientsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClientsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ClientsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all clients from the API via GET', () => {
    const mockClients: Client[] = [
      {
        id: 1,
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        telefone: '11987654321',
        cpf: '12345678901',
        dataCriacao: '2025-09-01T10:00:00Z',
        dataAtualizacao: '2025-09-01T10:00:00Z',
      },
      {
        id: 2,
        nome: 'Maria Santos',
        email: 'maria.santos@email.com',
        telefone: '21998765432',
        cpf: '23456789012',
        dataCriacao: '2025-09-01T10:05:00Z',
        dataAtualizacao: '2025-09-02T11:20:00Z',
      },
    ];

    service.getClients().subscribe((clients) => {
      expect(clients.length).toBe(2);
      expect(clients).toEqual(mockClients);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toEqual('GET');
    req.flush(mockClients);
  });

  it('should get a single client by id', () => {
    const mockClient = {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      telefone: '21998765432',
      cpf: '23456789012',
      dataCriacao: '2025-09-01T10:05:00Z',
      dataAtualizacao: '2025-09-02T11:20:00Z',
    };
    const clientId = 2;

    service.getClientById(clientId).subscribe((client) => {
      expect(client).toEqual(mockClient);
    });
    const req = httpTestingController.expectOne(
      service['apiUrl'] + `/${clientId}`
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockClient);
  });

  it('should create a new client via POST', () => {
    const newClient = {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      telefone: '21998765432',
      cpf: '23456789012',
      dataCriacao: '2025-09-01T10:05:00Z',
      dataAtualizacao: '2025-09-02T11:20:00Z',
    };

    service.createClient(newClient).subscribe((response) => {
      expect(response).toEqual(newClient);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newClient);
    req.flush(newClient);
  });

  it('should update an existing client via PUT', () => {
    const updatedClient = {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      telefone: '21998765432',
      cpf: '23456789012',
      dataCriacao: '2025-09-01T10:05:00Z',
      dataAtualizacao: '2025-09-02T11:20:00Z',
    };
    const clientId = 2;

    service.updateClient(clientId, updatedClient).subscribe((response) => {
      expect(response).toEqual(updatedClient);
    });

    const req = httpTestingController.expectOne(
      service['apiUrl'] + `/${clientId}`
    );
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(updatedClient);
    req.flush(updatedClient);
  });

  it('should delete a client via DELETE', () => {
    const clientId = 1;

    service.deleteClient(clientId).subscribe();

    const req = httpTestingController.expectOne(
      service['apiUrl'] + `/${clientId}`
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
