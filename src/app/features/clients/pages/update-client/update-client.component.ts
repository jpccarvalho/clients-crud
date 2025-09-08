import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models';
import { PersistenceMock } from '../../utils/persistence.mock';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-client',
  standalone: false,
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss'],
})
export class UpdateClientComponent implements OnInit, OnDestroy {
  client!: Client;
  clientForm: FormGroup = new FormGroup({});
  isLoading = true;
  private subscriptions = new Subscription();

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

  getClientFromAPI(id: number) {
    this.subscriptions.add(
      this.clientsService.getClientById(Number(id)).subscribe({
        next: (response) => {
          this.client = response;
          this.fillForms(response);
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.router.navigate(['/clients']);
        },
      })
    );
  }

  getClient(id: number) {
    const auxClient = PersistenceMock.getClientById(id);

    if (!auxClient) {
      this.getClientFromAPI(id);
      return;
    }

    this.client = auxClient as Client;
    this.fillForms(auxClient);
    this.isLoading = false;
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
      this.subscriptions.add(
        this.clientsService.updateClient(this.client.id, client).subscribe({
          next: (res) => {
            PersistenceMock.createClient(res as Client, false);
            this.router.navigate(['/clients']);
          },
          error: (err) => {
            console.error('Erro ao editar cliente na API:', err);

            PersistenceMock.updateClient(client);
            this.router.navigate(['/clients']);
          },
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
