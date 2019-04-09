import { Injectable, ɵConsole } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { GoogleDriveService } from '../services/google-drive.service';
import { AppService } from '../services/app.service';
import { EndpointService } from '../services/endpoint.service';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
private user: firebase.User;

    constructor(private googleDriveService: GoogleDriveService,
      private appservice: AppService, private endpoint: EndpointService,  private http: HttpClient, private auth: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.googleDriveService.getOauthToken()}`
            })
        });
        request = request.clone(request);
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
              this.auth.refresh();
              console.log('Last request failed retry');
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
    }
}
