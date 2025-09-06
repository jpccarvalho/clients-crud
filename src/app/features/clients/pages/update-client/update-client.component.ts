import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { Client, ClientDto } from '../../models';
import { PersistenceMock } from '../../utils/persistence.mock';

@Component({
  selector: 'app-update-client',
  standalone: false,
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss'],
})
export class UpdateClientComponent implements OnInit {
  client!: Client;
  clientForm: FormGroup = new FormGroup({});
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private clientsService: ClientsService
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (!id) {
      this.router.navigate(['/clients']);
      return;
    }

    this.getClient(Number(id));
  }

  initForms() {
    this.clientForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
    });
  }

  getClient(id: number) {
    this.clientsService.getClientById(Number(id)).subscribe({
      next: (response) => {
        console.log('Cliente encontrado na API. Cliente: \n', response);
        this.client = response;
        this.fillForms(response);
        this.isLoading = false;
      },
      error: (err) => {
        console.log('Cliente nao cadastrado na API. Erro: \n', err);
        const auxClient = PersistenceMock.getClientById(id);

        if (!auxClient) {
          this.router.navigate(['/clients']);
          this.isLoading = false;
          return;
        }

        console.log('Cliente encontrado na storage. Cliente: \n', auxClient);
        this.client = auxClient as Client;
        this.fillForms(auxClient);
        this.isLoading = false;
      },
    });
  }

  fillForms(client: Client) {
    this.clientForm.patchValue(client);
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const now = new Date().toISOString();
      const client: Client = {
        ...this.clientForm.value,
        dataAtualizacao: now,
        id: this.client.id,
      };

      this.clientsService.updateClient(this.client.id, client).subscribe({
        next: (res) => {
          console.log('Cliente editado:', res);
          PersistenceMock.createClient(res as Client, false);
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error('Erro ao editar cliente na API:', err);

          PersistenceMock.updateClient(client);
          this.router.navigate(['/clients']);
        },
      });
    }
  }
}
