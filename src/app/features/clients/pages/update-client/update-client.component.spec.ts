import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientComponent } from './update-client.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ClientsService } from '../../services/clients.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../../../shared/shared.module';
import { of } from 'rxjs';
import { PersistenceMock } from '../../utils/persistence.mock';

class MockClientsService {
  getClientById(id: string) {
    return of({ id: '1', nome: 'Test Client', email: 'test@example.com' });
  }
}

class MockPersistenceMock {
  static getClientById(id: number) {
    return { id: '1', nome: 'Test Client', email: 'test@example.com' };
  }
}

describe('UpdateClientComponent', () => {
  let component: UpdateClientComponent;
  let fixture: ComponentFixture<UpdateClientComponent>;

  beforeEach(async () => {
    const mockActivatedRoute = {
      snapshot: {
        params: { id: '1' },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [UpdateClientComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        SharedModule,
      ],
      providers: [
        {
          provide: ClientsService,
          useClass: MockClientsService,
        },
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: PersistenceMock,
          useClass: MockPersistenceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
