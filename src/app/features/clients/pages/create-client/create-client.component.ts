import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client, ClientDto } from '../../models';
import { Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { PersistenceMock } from '../../utils/persistence.mock';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-form',
  standalone: false,
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent implements OnInit, OnDestroy {
  clientForm: FormGroup = new FormGroup({});
  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.clientForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      const now = new Date().toISOString();
      const client: ClientDto = {
        ...this.clientForm.value,
        dataCriacao: now,
        dataAtualizacao: now,
      };

      this.subscriptions.add(
        this.clientsService.createClient(client).subscribe({
          next: (res) => {
            console.log('Cliente criado:', res);
            PersistenceMock.createClient(res as Client);
            this.router.navigate(['/clients']);
          },
          error: (err) => {
            console.error('Erro ao criar cliente:', err);
          },
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
