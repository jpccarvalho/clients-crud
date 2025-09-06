import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../../models';

@Component({
  selector: 'app-client-delete-confirmation-modal',
  standalone: false,
  templateUrl: './client-delete-confirmation-modal.component.html',
  styleUrls: ['./client-delete-confirmation-modal.component.scss'],
})
export class ClientDeleteConfirmationModal {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Client) {}
}
