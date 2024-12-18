import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const token: string | null = localStorage.getItem('token');

  if(!token){
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: token
    }
  })
  return next(authReq);
};
