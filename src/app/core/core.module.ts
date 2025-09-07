import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, MatToolbarModule, RouterModule, MatIconModule],
  exports: [MainLayoutComponent],
})
export class CoreModule {}
