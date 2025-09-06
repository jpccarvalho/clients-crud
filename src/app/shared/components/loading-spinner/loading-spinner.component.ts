import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  standalone: false,
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
})
export class LoadingSpinnerComponent {
  @Input() isLoading: boolean = false;
  constructor() {}
}
