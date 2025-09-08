import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  let store: any = {};
  const mockLocalStorage = {
    getItem: (key: string): string | null => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
  });

  afterEach(() => {
    httpTestingController.verify(); 
    store = {}; 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save the token to localStorage on successful login', () => {
    const mockToken = '1234567890';
    service
      .login({ email: 'test@example.com', password: 'password' })
      .subscribe();

    const req = httpTestingController.expectOne((req) =>
      req.url.includes('/login')
    );
    expect(req.request.method).toEqual('GET');
    req.flush({ token: mockToken });

    expect(localStorage.setItem).toHaveBeenCalledWith('authToken', mockToken);
  });

  it('should return true if there is a token in localStorage', () => {
    localStorage.setItem('authToken', '12345');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if there is no token in localStorage', () => {
    localStorage.removeItem('authToken');
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should remove the token and navigate to login on logout', () => {
    localStorage.setItem('authToken', 'test-token');
    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('authToken');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should return the token if it is stored', () => {
    localStorage.setItem('authToken', '12345');
    expect(service.getToken()).toEqual('12345');
  });
});
