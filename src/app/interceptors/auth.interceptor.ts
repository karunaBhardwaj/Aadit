import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoogleDriveService } from '../services/google-drive.service';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private googleDriveService: GoogleDriveService) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.googleDriveService.getOauthToken());

        // request = request.clone({
        //     headers: new HttpHeaders({
        //         Authorization: `Bearer ${this.googleDriveService.getOauthToken()}`
        //     })
        // });
        request = request.clone(request);
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                console.log('401 error');
              // return next.handle(request);
            } else if (err.status === 500) {
              err.statusText = 'Oops';
              err.error.error.message = 'Something went wrong!';
            }
            const error = {
              title: err.statusText || 'Oops!',
              message: err.error.error.message || 'Something went wrong!'
            };
            return throwError(error);
          }));
        // return next.handle(request);
    }
}
