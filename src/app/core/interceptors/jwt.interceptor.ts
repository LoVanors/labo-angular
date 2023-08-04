import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private _authServ: AuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if (this._authServ.getToken()) {
            let headers = new HttpHeaders();
            headers = headers.append('Authorization', `bearer ${this._authServ.getToken()}`)
            const newRequest = request.clone({
                headers: headers
            })

            return next.handle(newRequest);
        }
        return next.handle(request);
    }
}
