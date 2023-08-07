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

      const token= this._authServ.getToken();

        if (token) {
            let headers = new HttpHeaders();
            headers = headers.append('Authorization', `bearer ${this._authServ.getToken()?.token}`)
            const newRequest = request.clone({
                headers: headers
            })
            return next.handle(newRequest);
        }
        return next.handle(request);
    }
}
