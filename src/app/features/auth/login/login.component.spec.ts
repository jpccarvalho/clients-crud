import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
      ],
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required fields', () => {
    const form = component.loginForm;
    const emailControl = form.controls['email'];
    const passwordControl = form.controls['password'];

    expect(form).toBeDefined();
    expect(emailControl.valid).toBeFalse();
    expect(passwordControl.valid).toBeFalse();
  });

  it('should make the form valid with valid data', () => {
    const form = component.loginForm;
    const emailControl = form.controls['email'];
    const passwordControl = form.controls['password'];

    emailControl.setValue('test@example.com');
    passwordControl.setValue('password123');

    expect(form.valid).toBeTrue();
  });

  it('should login through auth service and navigate on after triggering onSubmit', () => {
    const authSpy = spyOn(authService, 'login').and.returnValue(
      of({ token: 'test-token' })
    );

    const form = component.loginForm;
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('password123');

    component.onSubmit();

    expect(authSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/clients']);
  });

  it('should not navigate on login error', () => {
    const authSpy = spyOn(authService, 'login').and.returnValue(
      throwError(() => new Error('Login failed'))
    );

    const form = component.loginForm;
    form.controls['email'].setValue('test@example.com');
    form.controls['password'].setValue('password123');

    component.onSubmit();

    expect(authSpy).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should toggle hide signal on clickEvent', () => {
    const initialHideValue = component.hide();
    const mockEvent = { stopPropagation: () => {} } as MouseEvent;

    component.clickEvent(mockEvent);

    expect(component.hide()).toBe(!initialHideValue);
  });
});
