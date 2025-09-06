import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Client, CreateClientDto } from '../../models';
import { Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-client-form',
  standalone: false,
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent implements OnInit {
  clientForm: any;

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
      const client: CreateClientDto = {
        ...this.clientForm.value,
        dataCriacao: now,
        dataAtualizacao: now,
      };

      this.clientsService.createClient(client).subscribe({
        next: (res) => {
          console.log('Cliente criado:', res);
          
          this.router.navigate(['/clients']);
        },
        error: (err) => {
          console.error('Erro ao criar cliente:', err);
        },
      });
    }
  }
}
