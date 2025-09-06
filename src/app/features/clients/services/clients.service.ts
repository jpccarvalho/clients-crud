import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client, ClientDto } from '../models';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/clients';

  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.apiUrl);
  }

  getClientById(id: number): Observable<Client> {
    return this.httpClient.get<Client>(this.apiUrl + `/${id}`);
  }

  deleteClient(id: number): Observable<{}> {
    return this.httpClient.delete<{}>(this.apiUrl + `/${id}`);
  }

  createClient(body: ClientDto) {
    return this.httpClient.post(this.apiUrl, body);
  }

  updateClient(id: number, body: ClientDto) {
    return this.httpClient.put(this.apiUrl + `/${id}`, body);
  }
}
