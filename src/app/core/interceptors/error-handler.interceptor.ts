import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (err.error?.msg) {
        errorMessage = err.error.msg;
      } else if (err.error?.message) {
        errorMessage = err.error.message;
      } else {
        switch (err.status) {
          case 0:
            errorMessage = 'Network error: Please check your connection.';
            break;

          case 400:
            errorMessage = 'Bad Request: Please verify your inputs.';
            break;

          case 404:
            errorMessage = 'Not Found: The requested resource does not exist.';
            break;

          case 500:
            errorMessage =
              'Server Error: Something went wrong on the server. Please try again later.';
            break;

          case 503:
            errorMessage =
              'Service Unavailable: The server is temporarily unavailable.';
            break;

          default:
            errorMessage = `Unexpected server error (${err.status}).`;
            break;
        }
      }

      console.error('HTTP Error', {
        status: err.status,
        message: err.message,
        backendMessage: err.error?.message || err.error?.msg,
        url: req.url,
      });

      toastr.error(errorMessage);

      return throwError(() => new Error(errorMessage));
    }),
  );
};
