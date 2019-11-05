import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import {
         HttpInterceptor,
         HttpRequest,
         HttpHandler,
         HttpEvent,
         HttpResponse,
         HttpErrorResponse
} from '@angular/common/http';
import { LoaderService } from '../shared/loader.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        const token: string = localStorage.getItem('token');
        this.loaderService.show();
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                return throwError(error);
            }),
            finalize(() => this.loaderService.hide())
            );
    }
}
