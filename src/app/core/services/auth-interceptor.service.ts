import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const excludedUrls = ['/login'];
  const authService = inject(AuthService);

  const authToken = authService.getToken();

  const isExcluded = excludedUrls.some((url) => req.url.includes(url));

  if (authToken && !isExcluded) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(clonedReq);
  }

  return next(req);
};
